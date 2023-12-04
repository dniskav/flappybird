import { grid } from "./grid.js";
import { GameLoop } from "./gameLoop.js";
import { full_pipe, bird_shape, Piece } from "./pieces.js";

// bind the DOM elements
const canvas =  document.querySelector('#canvas');
const context = canvas.getContext('2d');

// setup board
const BOARD_WIDTH = 75;
const BOARD_HEIGHT = 120;
const BLOCK_SIZE = 5;
const PIPE_SEPARATION = 40;
const GRAVITY = 0.320;
const BG = new Image();
const FLOOR = new Image();
const FLYING_GAP = 20;
const INCREASE_VELOCITY_FACTOR = 1.2;

let moveCounter = 0;
let lastTime = 0;
let score = 0;
let velocity = 20;
let level = 1;
let elementsToRender = [];

let bg = {
  x: 0,
  y: 0,
};

BG.src = '../assets/bg.png';
FLOOR.src = '../assets/floor.png';

canvas.width = BOARD_WIDTH * BLOCK_SIZE;
canvas.height = BOARD_HEIGHT * BLOCK_SIZE;

context.scale(BLOCK_SIZE, BLOCK_SIZE);
// setup assets

function put_pipe() {
  // add pipes;
  const bird = new Piece(
    {
      x: 0,
      y: 0,
    },
    bird_shape,
    'box',
    '../assets/bird.png'
  );
  
  bird.velocity = 0;
  bird.gravity = GRAVITY;
  bird.action = function() {
    this.position.y += this.velocity;
    this.velocity += this.gravity;
    if (this.position.x + this.shape[0].length < 0) {
      // element.reset_position();
    }
  }
  const floor = new Piece({ x: 0, y: 97 }, new Array(23).fill(new Array(75).fill(1)), 'box', '../assets/floor.png');
  const board = new Piece({x: 0, y: 0}, grid, 'board');
  const pipesCol1 = new full_pipe(BOARD_WIDTH, BOARD_HEIGHT, FLYING_GAP, PIPE_SEPARATION);
  const pipesCol2 = new full_pipe(BOARD_WIDTH, BOARD_HEIGHT, FLYING_GAP, PIPE_SEPARATION * 2);
  


  // set a randon position
  elementsToRender.push(board);
  elementsToRender.push(pipesCol1);
  elementsToRender.push(pipesCol2);
  elementsToRender.push(floor);
  elementsToRender.push(bird);
}

// generate pipes
put_pipe();

// // game loop
const gameLoop = new GameLoop(elementsToRender, velocity, context, GRAVITY, BLOCK_SIZE);
gameLoop.start();


// generate flappy

// collitions test

// gravity

// movement


// set score

// handle lifes

//call game loop
// update();