import { Plant } from "../Plant.js"
import { Bullet } from "../Bullet.js"
import { PLANT } from "../../constants.js"

export class ShooterPlant extends Plant {
  bullets = []
  fireTimer = 0
  timeToFire = 100
  damage = PLANT.DAMAGE
  hasZombieInLine = false
  canShoot = true

  /**
   * Desenha os disparos da planta.
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  drawFire(ctx) {
    this.bullets.forEach((bullet) => {
      bullet.drawRect(ctx)
    })
  }

  update() {
    if (this.hasZombieInLine) {
      this.fireTimer += 1

      if (this.fireTimer >= this.timeToFire) {
        this.bullets.push(
          new Bullet(this.x + this.width, this.y + this.height / 4)
        )
        this.fireTimer = 0
      }
    }
    this.hasZombieInLine = false
  }

  /**
   * Para cada bala presente na planta, elas se
   * moverão para a direita.
   */
  fire() {
    this.bullets.forEach((bullet) => {
      bullet.move()
    })
  }

  /**
   * Verifica se existe zombie na frente da planta.
   *
   * @param {Zombie} zombie
   */
  zombieDetection(zombie) {
    if (this.y == zombie.y && this.x <= zombie.x) {
      this.hasZombieInLine = true
    }
  }

  /**
   * Verifica as colisões dos disparos e o
   * remove se ele colidir com um `zombie`
   * ou sair da tela.
   *
   * @param {Zombie} zombie
   */
  fireColision(zombie) {
    this.bullets = this.bullets.filter((bullet) => {
      const hitZombie = bullet.isCollidingWith(zombie)
      if (hitZombie) {
        zombie.takeDamage(this.damage)
        return false
      }
      return bullet.x <= window.innerWidth
    })
  }
}
