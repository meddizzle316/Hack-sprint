#!/usr/bin/node

// import * as webgazer from './webgazer.js'

let xprediction;
let yprediction
let particles = [];

webgazer.setGazeListener(function(data, elapsedTime) {
	if (data == null) {
		return;
	}
	xprediction = data.x;
	yprediction = data.y;
}).begin();


const canvas = document.querySelector('#game-background');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

webgazer
const startGameBtn = document.querySelector('#startGameBtn')
const modalEl = document.querySelector('#modalEl')

const middleX = canvas.width / 2;
const middleY = canvas.height / 2;

function getRandomNum(min, max){
    return Math.random() * (max - min) + min;
}
let count = 0;
let step = 5;
let deg = +(Math.random() * 360).toFixed();

function getShift(deg, step) {
    return {
        x: +(Math.cos(deg * Math.PI / 270) * step).toFixed(),
        y: +(Math.sin(deg * Math.PI / 270) * step).toFixed(),
    };
}
const colors = {
    // white
    3: "rgba(255, 255, 255, 1)", 
    // faded white
    2: "rgba(200, 200, 200, .9)",
    // more faded white
    1: "rgba(145, 145, 145, .8)",
    // black
    0: "rgba(0, 0, 0, 0)"
}



class Player {
    constructor (radius, color, speed) {
        
        // the 'coordinates' of the circle
        this.position = {
            x: middleX,
            y: middleY
        };

        // the color
        this.color = color;
        
        // if r*2, gives us both height and width of object from this.position location 
        this.radius = radius;

        // overall speed of object, a multiplier to velocity which moves the object
        this.speed = speed;

        // used to move the object, changing x moves horizontally, y vertically
        this.velocity = {
            x: getRandomNum(1, 5),
            y: getRandomNum(1, 5),
        }

        this.health = 3;
        this.distance = 10;
    }

    draw() {
        c.save()
        c.shadowColor = this.color;
        c.shadowBlur = 20;
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        
        c.fill();
        c.restore();
    }

    update(deltaTime) {
        this.draw();
        // this.position.x += this.velocity.x * (deltaTime / 100);
        // this.position.y += this.velocity.y * (deltaTime / 100);
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        const playerSides = {
            left: player.position.x - player.radius,
            right: player.position.x + player.radius,
            top: player.position.y - player.radius,
            bottom: player.position.y + player.radius,
        }

        if (playerSides.right >= canvas.width) {
            player.position.x = player.radius;
        }
        else if (playerSides.left <= 0) {
            player.position.x = canvas.width - player.radius;
        }
        else if (playerSides.top <= 0) {
            player.position.y = canvas.height - player.radius;
        }
        else if (playerSides.bottom >= canvas.height) {
            player.position.y = player.radius;
        }

        let xIsCenter = false;
        let yIsCenter = false;


        if (playerSides.right > xprediction && playerSides.left < xprediction) {
            xIsCenter = true;
            if (playerSides.bottom > yprediction && playerSides.top < yprediction) {
                yIsCenter = true;
                if (this.health < 3) this.health += 1;
                this.color = colors[this.health];
            }
        }
        if (yIsCenter === false && xIsCenter === false) {
            // this.color = "rgb(192, 192,192)";
            console.log(deltaTime)
            if (count <= 3000) count += deltaTime;
            else {
                count = 0;
                if (this.health > 0) this.health -= 1;
                if (this.health === 0) {
                    // end game and show restart div
                    cancelAnimationFrame(animationId);
                    modalEl.style.display = 'flex';
                }
                this.color = colors[this.health];
                // this.color = "rgb(112, 128, 144)";
            } 
        deg += +(Math.random() * 55 * 2 - 55).toFixed();
        let shift = getShift(deg, step);
        while (Math.abs(3 + shift.x) >= player.distance || Math.abs(3 + shift.y) >= player.distance) {
            deg += +(Math.random() * 55 * 2 - 55).toFixed();
            shift = getShift(deg, step);  
        }
        player.position.x += shift.x;
        player.position.y += shift.y;    
        }

    }

}

let player = new Player(100, 'white', 1);

function init() {
    player = new Player(100, 'white', 1);
}

let lastFrameTime = Date.now()
function animate() {
    const now = Date.now();
    const deltaTime = now - lastFrameTime;
    // every frame, fills canvas with black background
    c.fillStyle = 'rgba(0, 0, 0, 0.1)';
    c.fillRect(0, 0, canvas.width, canvas.height)

    animateParticles();
    drawParticles();
    // every frame, update draws player using draw function and updates position based on velocity and speed
    player.update(deltaTime);
    lastFrameTime = now;
    animationId = requestAnimationFrame(animate);     
}
function generateParticles(x, y, radius) {
    var particles = [];
    var numParticles = Math.random() + 0.5 * 25;
    for (var i = 0; i < numParticles; i++) {
        var angle = Math.random() * Math.PI * 2;
        var distance = 1 * radius;

        var particle = {
            x: x + Math.cos(angle) * distance, // Calculate x coordinate
            y: y + Math.sin(angle) * distance, // Calculate y coordinate
            size: Math.random() * 5 + 1,
            speedX: Math.random() * 6 - 1.5,
            speedY: Math.random() * 6 - 1.5,
            opacity: 1,
            life: 0
        };
        particles.push(particle);
    }
    return particles;
}

// Generate particles

setInterval(function() {
	if (player.health > 0) {
		var newParticles = generateParticles(player.position.x, player.position.y, player.radius - 10);
		particles = particles.concat(newParticles);
	}
}, 400); // 400ms = 2.5x/s

function animateParticles() {
    for (var i = 0; i < particles.length; i++) {
        var particle = particles[i];
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.opacity -= 0.01;
        particle.life++;

        if (particle.opacity < 0) {
            particles.splice(i, 1);
            i--;
        }
    }
}

function drawParticles() {
    for (var i = 0; i < particles.length; i++) {
        var particle = particles[i];
        c.beginPath();
        c.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2, false);
        c.fillStyle = 'rgba(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ', ' + particle.opacity + ')';
        c.fill();
    }
}


startGameBtn.addEventListener('click', () => {
    init();
    animate();
    modalEl.style.display = 'none';
})
