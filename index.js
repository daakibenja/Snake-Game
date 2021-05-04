/* A simple snake game in pure javascript
Developer: Benjamin Daaki a.k.a Code-Lord
Email: richarddaaki4@gmail.com
Tel: +256756291975
*/

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var height = 600;
var width = 600;
var paused = 0;
var onpauseSpeed = { 'x': 0, 'y': 0 };
var scl = 15;
var speed = 100;
var tail = [];
var arrowUp = document.getElementById('up');
var arrowRight = document.getElementById('right');
var arrowLeft = document.getElementById('left');
var arrowDown = document.getElementById('down');
var pauser = document.getElementById('pause');

pauser.addEventListener('click',()=>{
    if (!paused) {
        onpauseSpeed['x'] = s.xspeed;
        onpauseSpeed['y'] = s.yspeed;
        s.dir(0, 0);

        paused = 1;
    }
    else {
        s.dir(onpauseSpeed['x'], onpauseSpeed['y']);
        paused = 0;
    }
    buttonLighter(pauser);
});

arrowUp.addEventListener('click',()=>{
    if (paused) {

        s.dir(0, -1);
        paused = 0;
    }
    else {
        s.dir(0, -1);
    }
    buttonLighter(arrowUp);
});

arrowRight.addEventListener('click',()=>{
    if (paused) {
        s.dir(1, 0);
        paused = 0;
    }
    else {
        s.dir(1, 0);
    }
    buttonLighter(arrowRight);
});

arrowLeft.addEventListener('click',()=>{
    if (paused) {

        s.dir(-1, 0);
        paused = 0;
    }
    else {
        s.dir(-1, 0);
    }
    buttonLighter(arrowLeft);
});

arrowDown.addEventListener('click',()=>{
    if (paused) {
        s.dir(0, 1);
    }
    else {
        s.dir(0, 1);
    }
    buttonLighter(arrowDown);
});
function constrain(value, min, max) {
    if (value < min) {
        return min;
    }
    else if (value > max) {
        return max;
    }
    else {
        return value;
    }
}
class Tail {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}
class Snake {
    constructor() {
        this.x = scl;
        this.y = height/2;
        this.xspeed = 1;
        this.yspeed = 0;
        this.total = 0;

        tail[this.total] = new Tail();
        tail[this.total].x = this.x;
        tail[this.total].y = this.y;
    }
    show() {
        ctx.fillStyle = '#fff';
        ctx.clearRect(0, 0, width, height);
        for (var i in tail) {
            if(tail.length <2)
                break;
            // console.log('Hello');
            //ctx.fillRect(tail[i].x, tail[i].y, scl, scl);
            ctx.beginPath();
            ctx.arc(tail[i].x + scl / 2, tail[i].y + scl / 2, scl / 2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.fillRect(this.x, this.y, scl, scl);

    }
    update(dt) {
        if (dt >= speed && (s.xspeed != 0 || s.yspeed != 0) && (s.x != 0 || s.y != height)) {
            tail[0].x = this.x;
            tail[0].y = this.y;
            for (var i = this.total; i > 0; i--) {
                
                tail[i].x = tail[i - 1].x;
                tail[i].y = tail[i - 1].y;
            }


            this.x = this.x + this.xspeed * scl;
            this.y = this.y + this.yspeed * scl;

            this.x = constrain(this.x, 0, width - scl);
            this.y = constrain(this.y, 0, height - scl);


            lastTime = 0;
        }


    }

    grow(x, y) {

    }
    dir(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }


}
class Food {
    constructor() {
        this.x = scl * 10;
        this.y = scl * 6;
    }
    show() {
        ctx.beginPath();
        ctx.arc(this.x+scl/2,this.y+scl/2,scl/2,0,Math.PI*2);
        //ctx.fillRect(this.x, this.y, scl, scl);
        ctx.fillStyle = 'red';
        ctx.fill();
    }
    chew() {
        this.x = Math.floor(Math.random() * width / scl) * scl;
        this.y = Math.floor(Math.random() * height / scl) * scl;
        this.x = constrain(this.x,scl*2,width-scl*2);
        this.y = constrain(this.y, scl*2, height-scl*2);
        s.total++;
        tail[s.total] = new Tail();
        tail[s.total].x = tail[s.total - 1].x
        tail[s.total].y = tail[s.total - 1].y
    }


}
function border(){
    ctx.beginPath();
    ctx.moveTo(scl, scl);
    ctx.lineTo(width-scl, scl);
    ctx.lineTo(width-scl, height-scl);
    ctx.lineTo(scl, height-scl);
    
    ctx.lineTo(scl, scl);
    ctx.strokeStyle = 'black';
    ctx.stroke();

}
function buttonLighter(button){
    button.style = 'background-color:blue;'
    setTimeout(()=>{
        button.style = 'backgroud-color:white';
    },500);
}
function grid() {
    var diff = scl;
    var total;
    var yspoint;
    var xspoint;
    var xepoint;
    var yepoint;
    ctx.beginPath();
    for (total = 0; total <= height; total += diff) {
        xspoint = total;
        yspoint = 0;
        xepoint = total;
        yepoint = height;
        if (yspoint == scl || yspoint == height-scl || xspoint == scl || xspoint == width-scl)
            continue;
        ctx.moveTo(xspoint, yspoint);
        ctx.lineTo(xepoint, yepoint);
        ctx.strokeStyle = 'gray';
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width, 0);
    for (total = 0; total <= width; total += diff) {
        xspoint = total;
        yspoint = 0;
        xepoint = total;
        yepoint = width;
        if(yspoint==scl||yspoint==height-scl||xspoint==scl||xspoint==width-scl)
            continue;
        ctx.moveTo(yspoint, xspoint);
        ctx.lineTo(yepoint, xepoint);
        ctx.stroke();
    }
}
function keyPress() {
    document.addEventListener('keydown', (event) => {
        //alert(event.keyCode);
        switch (event.keyCode) {
            case 32:
                if (!paused) {
                    onpauseSpeed['x'] = s.xspeed;
                    onpauseSpeed['y'] = s.yspeed;
                    s.dir(0, 0);

                    paused = 1;
                }
                else {
                    s.dir(onpauseSpeed['x'], onpauseSpeed['y']);
                    paused = 0;
                }
                buttonLighter(pauser);
                // console.log('Space');

                break;
            case 37:
                //arrow left
                if (paused) {

                    s.dir(-1, 0);
                    paused = 0;
                }
                else {
                    s.dir(-1, 0);
                }
                buttonLighter(arrowLeft);
                break;
            case 38:
                if (paused) {

                    s.dir(0, -1);
                    paused = 0;
                }
                else {
                    s.dir(0, -1);
                }
                buttonLighter(arrowUp);
                //arrow up
                break;
            case 39:
                //arrow right
                if (paused) {
                    s.dir(1, 0);
                    paused = 0;
                }
                else {
                    s.dir(1, 0);
                }
                buttonLighter(arrowRight);
                break;
            case 40:
                //arrow down
                if (paused) {
                    s.dir(0, 1);
                }
                else {
                    s.dir(0, 1);
                }
                buttonLighter(arrowDown);
                break;
            //case     

        }
    })
}
keyPress();
var s = new Snake();

var food = new Food();
var lastTime = 0;
var prevTime = 0
var deltaTime;
var shower = document.getElementById('show');
function gameLoop(timestamp) {
    deltaTime = timestamp - prevTime;
    prevTime = timestamp;
    lastTime = lastTime + deltaTime;
   
    s.show();

    s.update(lastTime);
    
    food.show();
    
    if (s.x == food.x && s.y == food.y) {
        s.highestIndex++;
        s.grow();
        food.chew();

    }
    if (s.x == width-scl || s.y == height-scl || s.x == 0 || s.y == 0) {
        //alert('Failed');
        // console.log(s.x);
        //return 0;
    }
    border();
    shower.innerText = prevTime%1000; 
    //grid();
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);