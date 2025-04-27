import { Plant } from "../Plant.js"
import { Sun } from "../Sun.js"

export class SunFlower extends Plant {
  timerSun = 0
  timeToSpawnSun = 1000
  isSunFlower = true
  canSpawnSun = false

  update() {
    this.timerSun += 1

    if (this.timerSun > this.timeToSpawnSun) {
      this.canSpawnSun = true
      this.timerSun = 0
    }
  }

  createSun(gameSuns) {
    if (!this.canSpawnSun) return
    gameSuns.push(new Sun(this.x + this.width / 2, this.y + this.height, false))
    this.canSpawnSun = false
  }
}
