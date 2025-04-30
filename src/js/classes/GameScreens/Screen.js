import { COLORS } from "../../constants.js"

export class Screen {
  buttons = []
  constructor(name, game) {
    this.name = name
    this.game = game
  }

  draw(ctx) {
    ctx.fillStyle = COLORS.RGB_BLACK
    ctx.font = "60px Arial"
    let text = `${this.name} Screen`
    ctx.fillText(text, 10, 65)
    this.buttons.forEach((button) => {
      button.drawRect(ctx)
    })
  }

  update(timestamp) {
    this.buttons.forEach((button) => {
      button.update(this.game.mousePos)
    })
  }

  handleClick(mousePos) {
    this.buttons.forEach((button) => {
      button.onClick(mousePos)
    })
  }

  onExit() {
    console.log("Saiu da tela:", this.name)
  }

  onEnter() {
    console.log("Entrou na tela:", this.name)
  }
}
