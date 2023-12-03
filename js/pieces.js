export const shape_pipe_top = [
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
  ];

export const shape_pipe_bottom = [
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [0,1,1,1,1,1,1,1,1,1,1,0],
  ];

export const bird = {
  position: {
    x: 0,
    y: 0,
  },
  shape: [
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  ]
}

export class Piece {
  constructor(position = { x: 0, y: 0}, shape = [[]], kind = 'pipe') {
    this.position = position;
    this.start_position = {...position};
    this.shape = shape;
    this.kind = kind;
  }

  position = {
    x: 0,
    y: 0,
  };

  shape = [
  ];
}

export class full_pipe {
  constructor(board_width, board_heigth, flying_gap, startXPosition = 0, kind = 'pipe'){
    this.pipeBody = new Array(board_heigth).fill([0,1,1,1,1,1,1,1,1,1,1,0]);
    this.startXPosition = startXPosition;
    this.flying_gap = flying_gap;
    this.board_width = board_width;
    this.board_heigth = board_heigth;
    this.position = { x: board_width, y: 0};
    this.start_position = {...this.position };
    this.kind = kind;
    this.pipe_top = new Piece({ x: board_width, y: 0 }, this.pipeBody.concat(shape_pipe_top));
    this.pipe_bottom = new Piece({ x: board_width, y: 0 }, shape_pipe_bottom.concat(this.pipeBody));
    this.shape = this.pipe_top.shape.concat(this.generate_gap(), this.pipe_bottom.shape);
    this.position.x = board_width;
    this.reset_position(true);
  }

  position = {
    x: 0,
    y: 0,
  }

  reset_position(initial = false) {
    this.position.x = initial ? this.board_width + this.startXPosition : this.board_width;
    this.position.y = ((Math.floor(Math.random() * 10) * 10) % this.board_heigth - 5) - this.pipe_top.shape.length + 5;
  }

  generate_gap() {
    return new Array(this.flying_gap).fill(new Array(this.pipe_top.shape[0].length).fill(0));
  }
}
export const floor = new Piece({ x: 0, y: 97 }, new Array(23).fill(new Array(75).fill(1)), 'box');

