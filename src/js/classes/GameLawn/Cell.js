import { Rectangle } from "../Rectangle.js"

export class Cell extends Rectangle {
  content = null
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color)
  }
}
