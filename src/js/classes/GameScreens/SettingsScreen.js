import { COLORS } from "../../constants.js"
import { Button } from "./Button.js"
import { Screen } from "./Screen.js"

export class SettingsScreen extends Screen {
  constructor(name, game) {
    super(name, game)
    this.buttons = [
      new Button(50, 100, 200, 50, COLORS.BROWN, "Voltar", () =>
        this.game.setScreen("HOME")
      ),
    ]
  }
}
