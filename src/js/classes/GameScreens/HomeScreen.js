import { COLORS } from "../../constants.js"
import { Screen } from "./Screen.js"
import { Button } from "./Button.js"

export class HomeScreen extends Screen {
  constructor(name, game) {
    super(name, game)
    this.buttons = [
      new Button(50, 100, 200, 50, COLORS.BROWN, "Jogar", () =>
        this.game.setScreen("LEVELS")
      ),
      new Button(50, 200, 200, 50, COLORS.BROWN, "Configurações", () =>
        this.game.setScreen("SETTINGS")
      ),
      new Button(50, 300, 200, 50, COLORS.BROWN, "Créditos", () =>
        this.game.setScreen("CREDITS")
      ),
    ]
  }
}
