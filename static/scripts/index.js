const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const startGameBtn = document.querySelector('#startGameBtn')
const modalEl = document.querySelector('#modalEl')

class Player {
    constructor (position, radius, color, speed) {
        
        // the 'coordinates' of the circle
        this.position = position;

        // the color
        this.color = color;
        
        // if r*2, gives us both height and width of object from this.position location 
        this.radius = radius;

        // overall speed of object, a multiplier to velocity which moves the object
        this.speed = speed;

        // used to move the object, changing x moves horizontally, y vertically
        this.velocity = {
            x: 0,
            y: 0,
        }
    }

    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    update() {
        this.draw();
        this.postion.x += (this.velocity.x * this.speed);
        this.postion.y += (this.velocity.y * this.speed);


        // condition if object reaches bottom of screen, will this even happen? 
        // DOES not cover sides or top border collisions yet
        if (this.position.y + (this.radius * 2) + this.velocity.y > canvas.height) {
            this.velocity.y = 0;
        }

    }
}

const middleX = canvas.width / 2;
const middleY = canvas.height / 2;

let player = new Player({middleX, middleY}, 30, 'white', 1);
// player.draw()

function init() {
    player = new Player({middleX, middleY}, 30, 'white', 1);
}


function animate() {
    animationId = requestAnimationFrame(animate);
    // every frame, fills canvas with black background
    c.fillStyle = 'rgba(0, 0, 0, 0.1';
    c.fillRect(x, y, canvas.width, canvas.height)

    // every frame, update draws player using draw function and updates position based on velocity and speed
    player.update();

    // setting horizontal velocity based on key input
    player.velocity.x = 0;
    if (keys.d.pressed) player.velocity.x = 5;
    else if (keys.a.pressed) player.velocity.x = -5;

    // setting vertical velocity based on key input
    player.velocity.y = 0;
    if (keys.s.pressed) player.velocity.y = 5;
    else if (keys.w.pressed) player.velocity.y = -5; 
    

    // TODO: condition for ending game, likely a timer or the "death" of the world
    // ending the game
    let placeHolder = 1; // just a placeholder to make sure we don't end yet
    if (placeHolder == 0)    {
        cancelAnimationFrame(animationId);
        modalEl.style.display = 'flex';
    }
        
}

const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
    s: {
        pressed: false,
    }
}

window.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'd':
           keys.d.pressed = true;
        break
        case 'a':
            keys.a.pressed = true;;
        break

        case 's':
            keys.s.pressed = true;;
        break

        case 'w':
            keys.w.pressed = true;;
        break
    }
})
window.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'd':
           keys.d.pressed = false;
        break
        case 'a':
            keys.a.pressed = false;
        break

        case 's':
            keys.s.pressed = false;
        break

        case 'w':
            keys.w.pressed = false;
        break
    }
})

startGameBtn.addEventListener('click', () => {
    init();
    animate();
    modalEl.style.display = 'none';
})


