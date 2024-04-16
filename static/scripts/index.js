#!/usr/bin/node

// import * as webgazer from './webgazer.js'

let xprediction;
let yprediction

webgazer.setGazeListener(function(data, elapsedTime) {
	if (data == null) {
		return;
	}
	xprediction = data.x;
	// console.log(xprediction) //these x coordinates are relative to the viewport
	yprediction = data.y;
	// console.log(yprediction) //these y coordinates are relative to the viewport
	// console.log(elapsedTime); //elapsed time is based on time since begin was called
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
let step = 10;
let deg = +(Math.random() * 360).toFixed();

function getShift(deg, step) {
    return {
        x: +(Math.cos(deg * Math.PI / 180) * step).toFixed(),
        y: +(Math.sin(deg * Math.PI / 180) * step).toFixed(),
    };
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
            x: getRandomNum(1, 10),
            y: getRandomNum(1, 10),
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

    update() {
    //
        this.draw();
        // this.position.x += this.velocity.x;
        // this.position.y += this.velocity.y;
        console.log(count);
       

        // boundary handling ?? perhaps video will show something better
        const playerSides = {
            left: player.position.x - player.radius,
            right: player.position.x + player.radius,
            top: player.position.y - player.radius,
            bottom: player.position.y + player.radius,
        }

        // if (playerSides.right >= canvas.width || playerSides.left <= 0) {
        //     // this.velocity.x = -this.velocity.x;
        // }
        // if (playerSides.bottom >= canvas.height || playerSides.top <= 0) {
        //     this.velocity.y = -this.velocity.y;
        // }

        // defining boundary collision
        if (playerSides.right >= canvas.width) {
            player.position.x = player.radius;
        }
        if (playerSides.left <= 0) {
            player.position.x = canvas.width - player.radius;
        }
        if (playerSides.top <= 0) {
            player.position.y = canvas.height - player.radius;
        }
        if (playerSides.bottom >= canvas.height) {
            player.position.y = player.radius;
        }

        let xIsCenter = false;
        let yIsCenter = false;

        const colors = {
            // white
            3: "rgb(255, 255, 255)", 
            // light gray
            2: "rgb(128, 128, 128)",
            // dark gray
            1: "rgb(105,105,105)",
            // black
            0: "rgb(0, 0, 0)"
        }

        if (playerSides.right > xprediction && playerSides.left < xprediction) {
            console.log("xprediction is between the player")
            xIsCenter = true;
        }
        if (playerSides.bottom > yprediction && playerSides.top < yprediction) {
            console.log("yprediction is between the player")
            yIsCenter = true;
        }
        if (yIsCenter === false && xIsCenter === false) {
            // this.color = "rgb(192, 192,192)";
            console.log(count);
            if (count <= 100) count++;
            else {
                count = 0;
                console.log(this.health)
                if (this.health > 0) this.health -= 1;
                if (this.health === 0) {
                    // end game and show restart div
                    cancelAnimationFrame(animationId);
                    modalEl.style.display = 'flex';
                }
                this.color = colors[this.health];
                console.log(this.color);
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

let player = new Player(60, 'white', 1);

function init() {
    player = new Player(60, 'white', 1);
}


function animate() {
    animationId = requestAnimationFrame(animate);
    // every frame, fills canvas with black background
    c.fillStyle = 'rgba(0, 0, 0, 0.1';
    c.fillRect(0, 0, canvas.width, canvas.height)

    // every frame, update draws player using draw function and updates position based on velocity and speed
    player.update();
    console.log(xprediction);
    console.log(yprediction);
    // TODO: condition for ending game, likely a timer or the "death" of the world
    // ending the game
    let placeHolder = 1; // just a placeholder to make sure we don't end yet
    if (placeHolder == 0)    {
        cancelAnimationFrame(animationId);
        modalEl.style.display = 'flex';
    }
        
}


startGameBtn.addEventListener('click', () => {
    init();
    animate();
    modalEl.style.display = 'none';
})
