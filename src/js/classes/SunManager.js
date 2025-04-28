import { Sun } from "./Sun.js"
import { SUN } from "../constants.js"
import { detectMouseCollision } from "../functions.js"

export class SunManager {
  currentTime = 0
  timeToSpawn = SUN.TIME_TO_SPAWN
  suns = []
  canSpawn = false

  draw(ctx) {
    this.suns.forEach((sun) => sun.drawRect(ctx))
  }

  update(timestamp) {
    if (timestamp - this.currentTime > this.timeToSpawn) {
      this.currentTime = timestamp
      this.canSpawn = true
    }
  }

  /**
   * Cria um sol e adiciona na coleção.
   */
  spawnSun(game) {
    if (!this.canSpawn) return

    const x = Math.floor(Math.random() * game.cnv.width)
    const y = Math.floor(Math.random())
    this.suns.push(new Sun(x, y, true))
    this.canSpawn = false
  }

  fallSuns(game) {
    this.suns.forEach((sun, index) => {
      sun.fall()

      if (sun.y > game.cnv.height) {
        this.suns.splice(index, 1)
      }
    })
  }

  /**
   * Detecta se o mouse colidiu com um Sol
   * presente no canvas.
   *
   * @param {Sun} sun
   */
  collectSun = (game) => {
    this.suns.forEach((sun) => {
      if (detectMouseCollision(game.mousePos, sun)) {
        game.mySuns += sun.value
        this.suns.splice(this.suns.indexOf(sun), 1)
      }
    })
  }
}
