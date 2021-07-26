const canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

function draw() {
    if (canvas.getContext) {
        //setup
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        //draw
        particle.draw();
        particle.x += 0.2;
        particle.y -= 0.2;
        if (particle.y < 0 - (particle.size * 2) || particle.x < 0 - (particle.size * 2)) {
            particle.x = particle.x - 250;
            particle.y = window.innerHeight
        }
        //loop
        raf = window.requestAnimationFrame(draw);

    }
}

let particle = {
    x: getRandomInt(window.innerWidth / 2),
    y: getRandomInt(window.innerHeight),
    size: getRandomInt(10),
    blur: 'blur(' + getRandomInt(this.size / 2) + 'px)',
    draw: function () {
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.size, this.size, Math.PI / 4, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = '#FB7680'
        ctx.filter = this.blur;
        ctx.fill()
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

draw()
