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
  }

  draw(ctx) {
    super.drawRect(ctx)
    ctx.fillStyle = this.textColor
    ctx.font = `${this.fontSize}px Arial`
    ctx.fillText(
      this.label,
      this.x + GAME.GAP,
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
