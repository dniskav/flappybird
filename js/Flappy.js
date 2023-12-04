class FlappyGame {
  constructor(canvas, boardWidth, boardHeight, pipeSeparation, gravity, blockSize, increaseVelocityFactor) {
    super();
    
    this.canvas = canvas;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.pipeSeparation = pipeSeparation;
    this.gravity = gravity;
    this.blockSize = blockSize;
    this.increaseVelocityFactor = increaseVelocityFactor;
    this.bg.src = '../assets/bg.png';
    this.floor.src = '../assets/floor.png';
    this.canvas.width = boardWidth * blockSize;
    this.canvas.height = boardHeight * blockSize;
    this.context = this.canvas.getContext('2d');


    this.moveCounter = 0;
    this.lastTime = 0;
    this.score = 0;
    this.velocity = 20;
    this.level = 1;
    this.elements_to_render = [];
    this.bg = new Image();
    this.floor = new Image();
    this.context.scale(BLOCK_SIZE, BLOCK_SIZE);
  }



}