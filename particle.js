const canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
particles = [];
amount = 20;    // number of particles

// Particle class
class Particle{
    constructor(){
        this.x = getRandomInt(0, window.innerWidth / 2);
        this.y = getRandomInt(0, window.innerHeight);
        this.vx = Math.random()/2;
        this.vy = Math.random()/3;
        this.rad = getRandomInt(2, 9);
        this.gradSize = getRandomInt(2, this.rad/1.1);
    }  

    relocate(){
        this.x = 0;
        this.y = getRandomInt(0, window.innerHeight/1.5);
        this.vx = Math.random()/2;
        this.vy = Math.random()/3;
    }

    move(){
        this.x += this.vx;
        this.y += this.vy;

        // switches direction midway
        if (this.x > window.innerWidth/2 && this.vy > 0){
            this.vy = this.vy*(-1);
        }

        if (this.x > window.innerWidth || this.y > window.innerHeight){
            this.relocate();
        }

        if (this.y < 0) {
            this.relocate();
        }
    }
}

function init(){
    for(i = 0; i < amount; i++){
        particles.push(new Particle());
    }
}

var gradient;

function move(){
    if (canvas.getContext){
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for(i in particles){
            p = particles[i]
            p.move();
            gradient = ctx.createRadialGradient(p.x, p.y, p.gradSize, p.x, p.y, p.rad);
            gradient.addColorStop(0, '#FB7680');
            gradient.addColorStop(1, 'rgba(255,255,255,0.0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(p.x-p.rad, p.y-p.rad, p.rad*2, p.rad*2);
        }
        raf = window.requestAnimationFrame(move);
    }
}

function getRandomInt(min, max) {
    return Math.floor((Math.random() * (max-min))+min);
}

init();
move();