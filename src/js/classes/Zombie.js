import { Rectangle } from "./Rectangle.js"
import { ZOMBIE } from "../constants.js"

export class Zombie extends Rectangle {
  canMove = true
  canAttack = false
  speed = ZOMBIE.SPEED
  life = ZOMBIE.LIFE
  damage = ZOMBIE.DAMAGE
  targetPlant = null
  currentTime = 0
  timeToAttack = ZOMBIE.TIME_TO_ATTACK

  constructor(x, y, width, height) {
    super(x, y, width, height, "red")
  }

  update(timestamp) {
    if (this.targetPlant !== null) {
      if (timestamp - this.currentTime > this.timeToAttack) {
        this.currentTime = timestamp
        this.canAttack = true
      }
    }
  }

  /**
   * Move o zombie para a esquerda.
   */
  move() {
    if (!this.canMove) return
    super.move(-this.speed, 0)
  }

  /**
   * Verifica se colidiu com uma planta.
   *
   * Se houver colisão chama o método `attackPlant`.
   *
   * @param {Plant} plant
   */
  plantDetection(plant) {
    if (!this.isCollidingWith(plant)) {
      if (this.targetPlant === plant) {
        this.canMove = true
        this.targetPlant = null
      }
      return
    }

    this.canMove = false
    this.targetPlant = plant
    this.attackPlant(plant)
  }

  /**
   * Ataca a planta tirando `1` do `plant.life` da planta.
   *
   * @param {Plant} plant
   */
  attackPlant(plant) {
    if (!this.canAttack) return

    plant.life -= this.damage
    if (plant.life <= 0 || !this.isCollidingWith(plant)) {
      this.canMove = true
      this.targetPlant = null
    }
    console.log("atacou")
    this.canAttack = false
  }

  /**
   * Tira 1 de vida do zombie.
   */
  takeDamage(plantDamage) {
    this.life -= plantDamage
  }
}
