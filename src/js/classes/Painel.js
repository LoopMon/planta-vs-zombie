import { Rectangle } from "./Rectangle.js"
import { createPainelItems } from "../functions.js"
import { COLORS, FONT, GAME } from "../constants.js"

export class Painel extends Rectangle {
  /**
   * Cria o painel do jogo.
   *
   * @param {number} x - posição x do painel no canvas
   * @param {number} y - posição y do painel no canvas
   * @param {number} width - largura do painel
   * @param {number} height - altura do painel
   * @param {string} backgroundColor - cor do painel
   * @param {MenuItem[]} items - itens do painel
   * @returns {Painel}
   */
  constructor(x, y, width, height, backgroundColor, items) {
    super(x, y, width, height, backgroundColor)
    this.items = createPainelItems(this, items)
  }

  drawRect(ctx, playerSuns) {
    super.drawRect(ctx)

    this.drawPlayerSuns(ctx, playerSuns)
    this.drawItens(ctx)
  }

  drawPlayerSuns(ctx, playerSuns) {
    // PLAYER SUNS RECT
    ctx.fillStyle = COLORS.BROWN
    ctx.fillRect(this.x, this.getBottom(), 100, FONT.BIG + GAME.GAP)

    // PLAYER SUNS TEXT
    const fontConfig = `${FONT.BIG}px ${FONT.FAMILY}`
    const textX = GAME.GAP
    const textY = this.getBottom() + FONT.BIG
    ctx.fillStyle = COLORS.RGB_YELLOW
    ctx.font = fontConfig
    ctx.fillText(playerSuns, textX, textY)
  }

  drawItens(ctx) {
    this.items.forEach((item) => {
      item.draw(ctx)
    })
  }
}
