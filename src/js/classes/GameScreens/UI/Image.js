import { Rectangle } from "../Rectangle.js"

export class ImageElement extends Rectangle {
  constructor(rect, src) {
    super(rect.x, rect.y, rect.width, rect.height, rect.color)
    this.img = new Image()
    this.img.src = src
  }

  draw(ctx) {}

  update(mousePos) {}
}
