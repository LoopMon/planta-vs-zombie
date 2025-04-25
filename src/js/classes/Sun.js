/**
 * Representa o Sol que cai lentamente na tela.
 *
 * A classe `Sun` estende `Rectangle` e define um objeto com posição, tamanho, cor e comportamento de queda.
 * - `VALUE`: energia para comprar plantas
 * - `SPEED`: velocidade de queda
 *
 * Métodos:
 * - `fall()`: incrementa a posição vertical (`y`) simulando a queda do Sol.
 */
class Sun extends Rectangle {
  static VALUE = 25
  static SPEED = 0.5
  constructor(x, y, width = 30, height = 30, color = "#ff0") {
    super(x - width < 0 ? 0 : x - width, y - height, width, height, color)
  }

  /**
   * Da a ideia de que o objeto está caindo.
   *
   * Faz o incremento na posição `y` pela velocidade.
   */
  fall() {
    this.y += Sun.SPEED
  }
}
