import { COLORS, FONT } from "../../constants.js"
import { Rectangle } from "../Rectangle.js"

export class TextElement extends Rectangle {
  constructor(rect, label, options = {}) {
    super(rect.x, rect.y, rect.width, rect.height)
    this.label = label
    this.textColor = options.color || COLORS.RGB_BLACK
    this.fontSize = options.fontSize || FONT.SMALL
  }

  draw(ctx) {
    ctx.fillStyle = this.textColor
    ctx.font = `${this.fontSize}px Arial`
    ctx.textAlign = "center"
    ctx.fillText(this.label, this.getRight() / 2, this.getBottom() / 2)
  }

  update(mousePos) {}
}
