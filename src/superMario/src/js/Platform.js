import { Vector } from "./Vector.js";

export class Platform {
  constructor({ x, y, image }) {
    this.position = new Vector(x, y);

    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}
