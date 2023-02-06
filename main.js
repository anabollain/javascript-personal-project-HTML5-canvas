'use strict';

//Selectors
const canvas = document.querySelector('#draw');
const title = document.querySelector('.title');
//We don't draw directly on the canvas in HTML5, but in the context
const ctx = canvas.getContext('2d');
//By default, the size of the canvas will be 800x800px
//To adjust it to the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//Starting color
ctx.strokeStyle = '#BADA55';
//Lots of options to select from
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;
ctx.globalCompositeOperation = 'difference';

//Flag to check if the cursor is down when moving it
let isDrawing = false;
//Start and ending axes
let lastX = 0;
let lastY = 0;
//Variable to change color
let hue = 0;
//Variable to change line width
let direction = true;

//Functions
function draw(e){
    if (!isDrawing) return; //stop the function from running when they are not moused down
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    //start from
    ctx.moveTo(lastX, lastY);
    //go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    //Update values to last position
    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++;
    if(hue >= 360){
        hue = 0;
    }
    //Set max and min width and use a flag to increment or decrease the width
    if(ctx.lineWidth >= 200 || ctx.lineWidth <= 30){
        direction = !direction;
    }
    if(direction){
        //From 0 to 100 increment
        ctx.lineWidth++;
    }else{
        //Once we reach the top or bottom, change logic
        ctx.lineWidth--;
    }
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    title.classList.add('js-hidden');
    //To avoid lines always starting from the last position, each time we draw we reset them
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
//Mobile
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchstart', () => isDrawing = false);
canvas.addEventListener('touchend', () => isDrawing = false);
