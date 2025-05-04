import { COLORS, FONT, GAME } from "../../../constants.js"
import { detectMouseCollision } from "../../../functions.js"
import { Rectangle } from "../../Rectangle.js"

export class Button extends Rectangle {
  constructor(rect, label, action, options = {}) {
    super(rect.x, rect.y, rect.width, rect.height, rect.color)
    this.label = label
    this.action = action
    this.textColor = options.color || COLORS.RGB_YELLOW
    this.fontSize = options.fontSize || FONT.BIG
    this.canDrawBG = options.canDrawBG ?? true
  }

  draw(ctx) {
    if (this.canDrawBG) super.drawRect(ctx)

    ctx.fillStyle = this.textColor
    ctx.font = `${this.fontSize}px Arial`
    ctx.textAlign = "center"
    ctx.fillText(
      this.label,
      this.getRight() / 2 + this.fontSize,
      this.getBottom() - this.fontSize
    )
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
