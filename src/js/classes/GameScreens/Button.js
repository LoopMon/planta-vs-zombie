import { COLORS } from "../../constants.js"
import { detectMouseCollision } from "../../functions.js"
import { Rectangle } from "../Rectangle.js"

export class Button extends Rectangle {
  constructor(x, y, width, height, color, label, action) {
    super(x, y, width, height, color)
    this.label = label
    this.action = action
  }

  drawRect(ctx) {
    super.drawRect(ctx)
    ctx.fillStyle = COLORS.RGB_YELLOW
    ctx.font = "30px Arial"
    ctx.fillText(this.label, this.x + 5, this.y + 35)
  }

  update(mousePos) {
    if (detectMouseCollision(mousePos, this)) {
      this.color = COLORS.RGB_RED
      return
    }

    this.color = COLORS.BROWN
  }

  onClick(mousePos) {
    if (!detectMouseCollision(mousePos, this)) return

    this.action()
  }
}
