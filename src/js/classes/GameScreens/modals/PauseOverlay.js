import { COLORS, GAME } from "../../../constants.js"
import { Rectangle } from "../../Rectangle.js"
import { Button } from "../UI/Button.js"
import { BaseOverlay } from "./BaseOverlay.js"

export class PauseOverlay extends BaseOverlay {
  constructor(rect, gameScreen) {
    super(gameScreen)
    this.rect = rect
    const rectBtnContinuar = new Rectangle(
      rect.x + GAME.GAP,
      rect.getBottom() - (50 + GAME.GAP),
      rect.width / 2 - GAME.GAP,
      50,
      COLORS.RGB_CYAN
    )
    const rectBtnMudarLvl = new Rectangle(
      rect.getRight() - rect.width / 2 + GAME.GAP,
      rect.getBottom() - (50 + GAME.GAP),
      rect.width / 2 - GAME.GAP * 2,
      50,
      COLORS.RGB_RED
    )

    this.elements = [
      new Button(rectBtnContinuar, "Continuar", () => {
        this.toggle()
      }),
      new Button(rectBtnMudarLvl, "Mudar Level", () => {
        gameScreen.game.setScreen("LEVELS")
      }),
    ]
  }

  draw(ctx) {
    if (!this.isActive) return
    super.draw(ctx)
    this.rect.drawRect(ctx)
    this.elements.forEach((element) => {
      element.draw(ctx)
    })
  }

  onShow() {
    // Pausa todos os áudios do jogo
    // this.game.audioManager.pauseAll()
  }

  onHide() {
    // Despausa os áudios
    // this.game.audioManager.resumeAll()
  }
}
