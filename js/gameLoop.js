// game loop
export class GameLoop {
  constructor(elementsToRender, velocity, context, gravity, blockSize) {
    this.gravity = gravity;
    this.blockSize = blockSize;
    this.velocity = velocity;
    this.context = context;
    this.lastTime = 0;
    this.moveCounter = 0;
    this.elementsToRender = elementsToRender;
  }
  
  update = (time = 0) => {
    const deltatime = time - this.lastTime;
    this.lastTime = time;

    this.moveCounter += deltatime;

    if (this.moveCounter > this.velocity) {
      this.elementsToRender.forEach((element) => {
        if(element.action) element.action();
      });

      this.moveCounter = 0;
    }

    this.draw();
    requestAnimationFrame(this.update);
  }

  draw() {
    this.context.clearRect(0, 0, canvas.width, canvas.height);

    this.elementsToRender.forEach((element) => {
      switch (element.kind) {
        case 'pipe':
          element.shape.forEach((row, y) => {
            row.forEach((col, x) => {
              if (col === 1) {
                this.context.fillStyle = 'green';
                this.context.fillRect(
                  x + element.position.x,
                  y + element.position.y,
                  1,
                  1,
                );
              }
            });
          });
          break;
        case 'box':
          element.shape.forEach((row, y) => {
            if(element.img) {
              this.context.drawImage(element.img, element.position.x, element.position.y, element.img.width / this.blockSize, element.img.height / this.blockSize);
            } else {
              row.forEach((col, x) => {
                if (col === 1) {
                  this.context.fillStyle = 'yellow';
                  this.context.strokeStyle = 'black';
                  this.context.fillRect(
                    x + element.position.x,
                    y + element.position.y,
                    1,
                    1,
                  );
                }
              });
            }
          });
          break;
        case 'img':
          this.context.drawImage(element.img, 0, 0, 75, 120);
        break;
      }
    });
  }

  start() {
    this.elementsToRender = this.elementsToRender.map( e => {
      const img = e.img ? new Image() : null;

      if(img) {
        img.src = e.img;
        e.img = img;
      }

      return e;
    });

    this.update();
  }
}
