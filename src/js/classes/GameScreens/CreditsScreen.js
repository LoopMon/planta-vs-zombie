import { COLORS } from "../../constants.js"
import { Rectangle } from "../Rectangle.js"
import { Button } from "./UI/Button.js"
import { Screen } from "./Screen.js"

export class CreditsScreen extends Screen {
  init() {
    const rectBtnHome = new Rectangle(50, 100, 200, 50, COLORS.BROWN)
    this.elements = [
      new Button(rectBtnHome, "Voltar", () => this.game.setScreen("HOME")),
    ]
  }
}
