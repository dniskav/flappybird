import board from "./board.js";
import { full_pipe, bird } from "./pieces.js";

// bind the DOM elements
const canvas =  document.querySelector('#canvas');
const context = canvas.getContext('2d');

// setup board
const BOARD_WIDTH = 75;
const BOARD_HEIGHT = 120;
const BLOCK_SIZE = 5;
const PIPE_SEPARATION = 40;
const BG = new Image();
const FLYING_GAP = 20;
const INCREASE_VELOCITY_FACTOR = 1.2;

let moveCounter = 0;
let lastTime = 0;
let score = 0;
let velocity = 20;
let level = 1;
let elements_to_render = [];

let bg = {
  x: 0,
  y: 0,
};

BG.src = '../assets/bg.png';

canvas.width = BOARD_WIDTH * BLOCK_SIZE;
canvas.height = BOARD_HEIGHT * BLOCK_SIZE;

context.scale(BLOCK_SIZE, BLOCK_SIZE);
// setup assets

function put_pipe() {
  // add pipes;
  const pipesCol1 = new full_pipe(BOARD_WIDTH, BOARD_HEIGHT, FLYING_GAP, PIPE_SEPARATION);
  const pipesCol2 = new full_pipe(BOARD_WIDTH, BOARD_HEIGHT, FLYING_GAP, PIPE_SEPARATION * 2);
  
  // set a randon position
  elements_to_render.push(pipesCol1);
  elements_to_render.push(pipesCol2);
}

// game loop
function update(time = 0) {
  const deltatime = time - lastTime;
  lastTime = time;

  moveCounter += deltatime;

  if(moveCounter > velocity) {
    elements_to_render.forEach(element => {
      switch(element.kind) {
        case 'pipe':
          element.position.x--;
          if(element.position.x + element.shape[0].length < 0) {
            element.reset_position();
          }
      }
    });
  
    moveCounter = 0;
  }

  draw();
  window.requestAnimationFrame(update);
}

function draw() {
  context.fillStyle = 'blue';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.drawImage(BG, 0, 0, 75, 120);

  elements_to_render.forEach(element => {
    element.shape.forEach((row, y) => {
      row.forEach((col, x) => {
        if(col === 1) {
          context.fillStyle = 'green';
          context.fillRect(x + element.position.x, y + element.position.y, 1, 1);
        }
      })
    })
  });

  board.forEach((row, y) => {
    row.forEach((col, x) => {
      if(col === 1) {
        context.fillStyle = 'yellow';
        context.fillRect(x, y, 1, 1);
      }
    })
  })
}

// generate pipes


// generate flappy

// collitions test

// gravity

// movement


// set score

// handle lifes


//call game loop
put_pipe();
update();