#!/usr/bin/node
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const startGameBtn = document.querySelector('#startGameBtn')
const modalEl = document.querySelector('#modalEl')

const middleX = canvas.width / 2;
const middleY = canvas.height / 2;

function getRandomNum(min, max){
    return Math.random() * (max - min) + min;
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
        console.log(this.position.x);
        console.log(this.position.y);
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;


        // boundary handling ?? perhaps video will show something better
        const playerSides = {
            left: player.position.x - player.radius,
            right: player.position.x + player.radius,
            top: player.position.y - player.radius,
            bottom: player.position.y + player.radius,
        }

        if (playerSides.right >= canvas.width || playerSides.left <= 0) {
            this.velocity.x = -this.velocity.x;
        }
        if (playerSides.bottom >= canvas.height || playerSides.top <= 0) {
            this.velocity.y = -this.velocity.y;
        }
    }

}


let player = new Player(30, 'white', 1);
// player.draw()

function init() {
    player = new Player(30, 'white', 1);
}


function animate() {
    animationId = requestAnimationFrame(animate);
    // every frame, fills canvas with black background
    c.fillStyle = 'rgba(0, 0, 0, 0.1';
    c.fillRect(0, 0, canvas.width, canvas.height)

    // every frame, update draws player using draw function and updates position based on velocity and speed
    player.update();

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
