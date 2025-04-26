import { ShooterPlant } from "./ShooterPlant.js"
import { Bullet } from "../Bullet.js"

export class DoubleShooterPlant extends ShooterPlant {
  updateShooting() {
    if (this.hasZombieInLine) {
      this.fireTimer += 1

      if (this.fireTimer >= this.timeToFire) {
        this.bullets.push(
          new Bullet(this.x + this.width, this.y + this.height / 4)
        )
        this.bullets.push(
          new Bullet(this.x + this.width / 2, this.y + this.height / 4)
        )
        this.fireTimer = 0
      }
    }
    this.hasZombieInLine = false
  }
}
