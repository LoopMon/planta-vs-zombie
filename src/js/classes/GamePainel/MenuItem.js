import { Rectangle } from "../Rectangle.js"
import { COLORS, FONT, GAME } from "../../constants.js"

export class MenuItem extends Rectangle {
  constructor(x, y, width, height, name, cust) {
    super(x, y, width, height, "red")
    this.name = name
    this.cust = cust
  }

  draw(ctx, color = COLORS.RGB_BLACK) {
    super.drawStroke(ctx, color)

    let fontConfig = ""
    ctx.fillStyle = COLORS.RGB_BLACK
    ctx.lineWidth = 1

    // ITEM TEXT
    // =-=- name
    fontConfig = `${FONT.MEDIUM}px ${FONT.FAMILY}`
    ctx.font = fontConfig
    ctx.fillText(this.name, this.x + GAME.GAP, this.y + FONT.MEDIUM)
    // =-=- cust
    fontConfig = `${FONT.SMALL}px ${FONT.FAMILY}`
    ctx.font = fontConfig
    ctx.fillText(this.cust, this.x + GAME.GAP, (this.y + FONT.SMALL) * 2)
  }
}
