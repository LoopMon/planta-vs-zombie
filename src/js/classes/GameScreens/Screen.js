export class Screen {
  elements = []

  /**
   *
   * @param {string} name - nome para identificar a tela
   * @param {Game} game - referência a classe Game
   */
  constructor(name, game) {
    this.name = name
    this.game = game
  }

  init() {}

  draw(ctx) {
    this.drawElements(ctx)
  }

  drawElements(ctx) {
    this.elements.forEach((element) => {
      element.draw(ctx)
    })
  }

  update(timestamp) {
    this.elements.forEach((element) => {
      element.update(this.game.mousePos)
    })
  }

  handleClick(mousePos) {
    this.elements.forEach((element) => {
      if (typeof element.onClick === "function") {
        element.onClick(mousePos)
      }
    })
  }

  handleKeyUp(eventKey) {}

  onExit() {
    console.log("Saiu da tela:", this.name)
  }

  onEnter() {
    console.log("Entrou na tela:", this.name)
    this.init()
  }
}
