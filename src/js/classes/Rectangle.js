class Rectangle {
  /**
   * Cria uma instância de um retângulo.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {string} color
   * @returns {Rectangle}
   */
  constructor(x, y, width, height = null, color = "#f0f") {
    this.x = x
    this.y = y
    this.width = width
    this.height = !!height ? height : width
    this.color = color
  }

  /**
   * Desenha o retângulo preenchido.
   *
   * @param {CanvasRenderingContext2D} ctx
   * @returns {void}
   */
  drawRect(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  /**
   * Desenha o contorno do retângulo.
   *
   * @param {CanvasRenderingContext2D} ctx - Contexto de renderização do canvas
   * @param {number} lineWidth - largura do contorno
   * @returns {void}
   */
  drawStroke(ctx, lineWidth = 1) {
    ctx.strokeStyle = this.color
    ctx.lineWidth = lineWidth
    ctx.strokeRect(this.x, this.y, this.width, this.height)
  }

  /**
   * Verifica se colidiu com outro retangulo.
   *
   * @param {Rectangle} obj - retângulo
   * @returns {boolean}
   */
  isCollidingWith(obj) {
    return !(
      this.x + this.width < obj.x ||
      this.x > obj.x + obj.width ||
      this.y + this.height < obj.y ||
      this.y > obj.y + obj.height
    )
  }
}
