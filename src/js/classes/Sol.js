class Sol {
  constructor(x, y, width = 30, height = 30) {
    this.x = x - width < 0 ? 0 : x - width
    this.y = y - height
    this.width = width
    this.height = height
    this.color = "#ff0"
    this.speed = 0.5
    this.value = 25
  }

  /**
   * Desenha um retangulo do objeto no canvas.
   *
   * @param {CanvasRenderingContext2D} ctx - Contexto de renderização do canvas
   * @returns {void}
   */
  draw = (ctx) => {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  /**
   * Da a ideia de que o objeto está caindo.
   *
   * Faz o incremento na posição `y` pela velocidade.
   */
  fall = () => {
    this.y += this.speed
  }
}
