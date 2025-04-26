/**
 * Classe base para representar um retângulo na tela.
 *
 * A classe `Rectangle` define as propriedades e comportamentos básicos de um retângulo, como posição,
 * tamanho, cor, desenho e detecção de colisão.
 *
 * Propriedades:
 * - `x` (number): posição horizontal.
 * - `y` (number): posição vertical.
 * - `width` (number): largura do retângulo.
 * - `height` (number): altura do retângulo. Se não for informado, será igual à largura (formando um quadrado).
 * - `color` (string): cor usada no preenchimento ou contorno.
 *
 * Métodos:
 * - `drawRect(ctx)`: desenha o retângulo preenchido no canvas.
 * - `drawStroke(ctx, color, lineWidth)`: desenha o contorno do retângulo.
 * - `isCollidingWith(obj)`: verifica colisão com outro retângulo.
 * - `move(x, y)`: move o retângulo pela tela.
 */
export class Rectangle {
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
   */
  drawRect(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  /**
   * Desenha o contorno do retângulo.
   *
   * @param {CanvasRenderingContext2D} ctx - Contexto de renderização do canvas
   * @param {string} color - cor para o contorno
   * @param {number} lineWidth - largura do contorno
   */
  drawStroke(ctx, color = null, lineWidth = 1) {
    ctx.strokeStyle = !!color ? color : this.color
    ctx.lineWidth = lineWidth
    ctx.strokeRect(this.x, this.y, this.width, this.height)
  }

  /**
   * Verifica se colidiu com outro retangulo.
   *
   * @param {Rectangle} rect - retângulo
   * @returns {boolean}
   */
  isCollidingWith(rect) {
    return !(
      this.x + this.width < rect.x ||
      this.x > rect.x + rect.width ||
      this.y + this.height < rect.y ||
      this.y > rect.y + rect.height
    )
  }

  /**
   * Move o retângulo de acordo com os
   * valores de `x` e `y`.
   *
   * @param {number} x - valor para mover na horizontal
   * @param {number} y - valor para mover na vertical
   */
  move(x, y) {
    this.x += x
    this.y += y
  }
}
