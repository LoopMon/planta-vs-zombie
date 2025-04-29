import { ShooterPlant } from "./ShooterPlant.js"
import { Bullet } from "./Bullet.js"

export class DoubleShooterPlant extends ShooterPlant {
  update(timestamp) {
    if (this.hasZombieInLine) {
      if (timestamp - this.currentTime > this.timeToFire) {
        this.currentTime = timestamp
        this.bullets.push(
          new Bullet(this.x + this.width, this.y + this.height / 4)
        )
        this.bullets.push(
          new Bullet(this.x + this.width / 2, this.y + this.height / 4)
        )
      }
    }
    this.hasZombieInLine = false
  }
}
