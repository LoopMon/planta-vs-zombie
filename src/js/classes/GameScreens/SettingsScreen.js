import { COLORS } from "../../constants.js"
import { Button } from "./UI/Button.js"
import { Screen } from "./Screen.js"
import { Rectangle } from "../Rectangle.js"

export class SettingsScreen extends Screen {
  init() {
    const rectBtnVoltar = new Rectangle(50, 100, 200, 50, COLORS.BROWN)
    this.elements = [
      new Button(rectBtnVoltar, "Voltar", () => this.game.setScreen("HOME")),
    ]
  }
}
