import { COLORS, GAME } from "../../../constants.js"
import { Button } from "../Button.js"
import { BaseOverlay } from "./BaseOverlay.js"

export class PauseOverlay extends BaseOverlay {
  img = null
  constructor(rect, gameScreen) {
    super(gameScreen)
    this.rect = rect
    this.elements = [
      new Button(
        rect.x + GAME.GAP,
        rect.getBottom() - (50 + GAME.GAP),
        rect.width / 2 - GAME.GAP,
        50,
        COLORS.RGB_CYAN,
        "Continuar",
        () => {
          this.toggle()
        }
      ),
      new Button(
        rect.getRight() - rect.width / 2 + GAME.GAP,
        rect.getBottom() - (50 + GAME.GAP),
        rect.width / 2 - GAME.GAP * 2,
        50,
        COLORS.RGB_RED,
        "Mudar Level",
        () => {
          gameScreen.game.setScreen("LEVELS")
        }
      ),
    ]
  }

  draw(ctx) {
    if (!this.isActive) return
    super.draw(ctx)
    this.rect.drawRect(ctx)
    this.elements.forEach((element) => {
      element.drawRect(ctx)
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
