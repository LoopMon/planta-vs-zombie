class Bullet extends Rectangle {
  speed = 2
  constructor(x, y, color = "#00f") {
    super(x, y, 10, 10, (color = color))
  }

  /**
   * Move a bala para a direita.
   */
  move() {
    super.move(this.speed, 0)
  }
}
