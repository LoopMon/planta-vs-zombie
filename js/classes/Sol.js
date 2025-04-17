class Sol {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.cor = "#ff0"
    this.velocidade = 0.5
    this.valor = 25
  }

  draw = (ctx) => {
    ctx.fillStyle = this.cor
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  /**
   * Da a ideia de que o objeto está caindo.
   *
   * Faz o incremento na posição `y` pela velocidade.
   */
  fall = () => {
    this.y += this.velocidade
  }
}
