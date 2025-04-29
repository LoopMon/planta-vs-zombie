import { Rectangle } from "./Rectangle.js"
import { PLANT } from "../constants.js"

export class Plant extends Rectangle {
  life = PLANT.LIFE
  gridPos = [-1, -1]
  canShoot = false
  isSunFlower = false
  isActive = false
  currentTime = 0

  /**
   * Inicia o ciclo da planta.
   *
   * Deve ser chamado quando a planta é colocada no gramado.
   */
  initCycle() {
    this.isActive = true
    this.currentTime = performance.now()
  }

  update() {}
}
