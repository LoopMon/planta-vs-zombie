import { COLORS } from "../../constants.js"
import { Button } from "./Button.js"
import { Screen } from "./Screen.js"

export class LevelsScreen extends Screen {
  constructor(name, game) {
    super(name, game)
    this.buttons = [
      new Button(50, 100, 200, 50, COLORS.BROWN, "Voltar", () =>
        this.game.setScreen("HOME")
      ),
      new Button(50, 200, 200, 50, COLORS.BROWN, "Level 1", () =>
        this.game.setScreen("GAME")
      ),
      new Button(50, 300, 200, 50, COLORS.BROWN, "Level 2", () => {}),
    ]
  }
}
