/**
 * Classe base abstrata para overlays no jogo.
 * Deve ser estendida por overlays específicos.
 * @abstract
 */
export class BaseOverlay {
  constructor(gameScreen) {
    if (new.target === BaseOverlay) {
      throw new Error(
        "BaseOverlay é uma classe abstrata e não pode ser instanciada diretamente."
      )
    }

    this.gameScreen = gameScreen // Referência à tela pai
    this.game = gameScreen.game // Referência ao jogo principal
    this.isActive = false
    this.backgroundColor = "rgba(0, 0, 0, 0.5)"
    this.elements = [] // Botões, textos, etc.
  }

  // Métodos comuns a todos os overlays
  show() {
    this.isActive = true
    this.onShow()
  }

  hide() {
    this.isActive = false
    this.onHide()
  }

  toggle() {
    this.isActive ? this.hide() : this.show()
    console.log("toggle")
  }

  // Hooks para comportamento personalizado
  onShow() {}
  onHide() {}
  beforeDraw() {}
  afterDraw() {}

  update(timestamp) {
    if (!this.isActive) return
    this.elements.forEach((element) => {
      element.update(timestamp)
    })
  }

  draw(ctx) {
    if (!this.isActive) return

    this.beforeDraw()
    ctx.fillStyle = this.backgroundColor
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    this.afterDraw()
  }

  handleClick(mousePos) {
    if (!this.isActive) return false
    this.elements.forEach((button) => {
      button.onClick(mousePos)
    })
  }
}
