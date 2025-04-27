import { Rectangle } from "./Rectangle.js"
import { BULLET, COLORS } from "../constants.js"

export class Bullet extends Rectangle {
  speed = BULLET.SPEED
  constructor(x, y) {
    super(x, y, BULLET.SCALE, BULLET.SCALE, COLORS.RGB_BLUE)
  }

  /**
   * Move a bala para a direita.
   */
  move() {
    super.move(this.speed, 0)
  }
}
