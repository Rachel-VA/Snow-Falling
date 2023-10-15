//alert('test');
// setup the canvas to cover the entire screen
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//declare particles
let particlesArray = [];
const numberOfParticles = 500;

//create a class for particles
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 15 + 1;
        this.weight = Math.random() * 0.1 + 10;
        //this.directionX = 0;  // setting horizontal movement to 0, allong particles to fall from top
        this.directionX = Math.random() * 2 - 1; // Random horizontal velocity between -1 and 1
    }
//updating the particle's position
    update() {
        if (this.y > canvas.height + this.size) {
            this.y = 0 - this.size;
            this.weight = Math.random() * 1 + 1;
            this.x = Math.random() * canvas.width; //* 1.3
        }
        this.weight += 0.01;
        this.y += this.weight;
        this.x += this.directionX;
        
    }
    //rendering the particle as a small white circle on the canvas
    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 0.3);
        ctx.closePath();
        ctx.fill();
    }
}
//initializes the particlesArray by creating new Particle objects and adding them to the array
function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
       // const y = Math.random() * canvas.height;
       const y = (Math.random() * canvas.height) - canvas.height; // Initialize y position above the canvas
        particlesArray.push(new Particle(x, y));
    }
}
init(); //call the init()

//animation loop using requestAnimationFrame
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 001.01)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}
animate();
//When the window is resized, the canvas size is updated to match the new window dimensions
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    init(); //reset the particles with new positions
});