import { COLORS } from "../../constants.js"
import { Rectangle } from "../Rectangle.js"
import { Screen } from "./Screen.js"
import { Button } from "./UI/Button.js"

export class HomeScreen extends Screen {
  init() {
    const rectBtnJogar = new Rectangle(50, 100, 200, 50, COLORS.BROWN)
    const rectBtnConfiguracoes = new Rectangle(50, 200, 200, 50, COLORS.BROWN)
    const rectBtnCreditos = new Rectangle(50, 300, 200, 50, COLORS.BROWN)

    this.elements = [
      new Button(rectBtnJogar, "Jogar", () => this.game.setScreen("LEVELS")),
      new Button(rectBtnConfiguracoes, "Configurações", () =>
        this.game.setScreen("SETTINGS")
      ),
      new Button(rectBtnCreditos, "Créditos", () =>
        this.game.setScreen("CREDITS")
      ),
    ]
  }
}
