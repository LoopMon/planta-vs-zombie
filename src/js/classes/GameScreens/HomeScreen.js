import { COLORS } from "../../constants.js"
import { Rectangle } from "../Rectangle.js"
import { Screen } from "./Screen.js"
import { Button } from "./UI/Button.js"
import { ImageElement } from "./UI/Image.js"

export class HomeScreen extends Screen {
  lapide = null

  init() {
    const rectLapide = new Rectangle(0, this.game.cnv.height - 600, 300, 600)
    const rectBtnCreditos = new Rectangle(
      50,
      rectLapide.getBottom() - 320,
      200,
      50,
      COLORS.BROWN
    )
    const rectBtnConfiguracoes = new Rectangle(
      50,
      rectBtnCreditos.y - 60,
      200,
      50,
      COLORS.BROWN
    )
    const rectBtnJogar = new Rectangle(
      50,
      rectBtnConfiguracoes.y - 60,
      200,
      50,
      COLORS.BROWN
    )
    const rectLogo = new Rectangle(50, rectLapide.y, 200, 100)

    this.elements = [
      new ImageElement(rectLapide, "./img/lapide/lapide.png", {
        frameWidth: 100, // Largura de cada frame
        totalFrames: 4, // Número de frames na animação
        frameSpeed: 10, // Velocidade (quadros por atualização)
        loop: true, // Se deve repetir
      }),
      new Button(rectBtnJogar, "Jogar", () => this.game.setScreen("LEVELS"), {
        canDrawBG: false,
        color: "#333",
      }),
      new Button(
        rectBtnConfiguracoes,
        "Configurações",
        () => this.game.setScreen("SETTINGS"),
        {
          canDrawBG: false,
          color: "#333",
        }
      ),
      new Button(
        rectBtnCreditos,
        "Créditos",
        () => this.game.setScreen("CREDITS"),
        {
          canDrawBG: false,
          color: "#333",
        }
      ),
      new ImageElement(rectLogo, "./img/logo/logo.png", {
        frameWidth: 80, // Largura de cada framez
        loop: false, // Se deve repetir
      }),
    ]
  }

  draw(ctx) {
    ctx.fillStyle = "#53ecec"
    ctx.fillRect(0, 0, this.game.cnv.width, this.game.cnv.height)
    super.draw(ctx)
  }
}
