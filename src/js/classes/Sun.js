import { Rectangle } from "./Rectangle.js"
import { SUN, COLORS } from "../constants.js"

/**
 * Representa o Sol que cai lentamente na tela.
 *
 * A classe `Sun` estende `Rectangle` e define um objeto com posição, tamanho, cor e comportamento de queda.
 *
 * Propriedades:
 * - `VALUE`: energia para comprar plantas
 * - `SPEED`: velocidade de queda
 *
 * Métodos:
 * - `fall()`: incrementa a posição vertical (`y`) simulando a queda do Sol.
 */
export class Sun extends Rectangle {
  value = SUN.VALUE
  speed = SUN.SPEED

  /**
   * @param {number} x
   * @param {number} y
   * @param {boolean} canFall
   */
  constructor(x, y, canFall) {
    super(
      x - SUN.SCALE < 0 ? 0 : x - SUN.SCALE,
      y - SUN.SCALE,
      SUN.SCALE,
      SUN.SCALE,
      COLORS.RGB_YELLOW
    )
    this.canFall = canFall
  }

  /**
   * Da a ideia de que o objeto está caindo.
   *
   * Faz o incremento na posição `y` pela velocidade.
   */
  fall() {
    if (!this.canFall) return
    this.y += this.speed
  }
}
