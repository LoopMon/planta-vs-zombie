import { COLORS } from "../../constants.js"
import { Rectangle } from "../Rectangle.js"
import { Button } from "./UI/Button.js"
import { Screen } from "./Screen.js"

export class LevelsScreen extends Screen {
  init() {
    const rectBtnVoltar = new Rectangle(50, 100, 200, 50, COLORS.BROWN)
    const rectBtnLvl1 = new Rectangle(50, 200, 200, 50, COLORS.BROWN)
    const rectBtnLvl2 = new Rectangle(50, 300, 200, 50, COLORS.BROWN)
    this.elements = [
      new Button(rectBtnVoltar, "Voltar", () => this.game.setScreen("HOME")),
      new Button(rectBtnLvl1, "Level 1", () => this.game.setScreen("GAME")),
      new Button(rectBtnLvl2, "Level 2", () => {}),
    ]
  }
}
