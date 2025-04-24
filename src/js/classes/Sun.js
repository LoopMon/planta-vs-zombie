class Sun extends Rectangle {
  constructor(x, y, width = 30, height = 30, color = "#ff0") {
    super(x - width < 0 ? 0 : x - width, y - height, width, height, color)
    this.speed = 0.5
    this.value = 25
  }

  /**
   * Da a ideia de que o objeto está caindo.
   *
   * Faz o incremento na posição `y` pela velocidade.
   */
  fall() {
    this.y += this.speed
  }
}
