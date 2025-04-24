class Zombie extends Rectangle {
  constructor(x, y, width, height, type) {
    super(x, y, width, height, "red")
    this.type = type
    this.canMove = true
    this.speed = 0.5 // 0.05
    this.life = 10
    this.damage = 1
    this.attackTimer = 0
    this.timeToAttack = 100
    this.targetPlant = null
  }

  /**
   * Move o zombie para a esquerda.
   *
   * @returns {void}
   */
  move() {
    if (!this.canMove) return
    this.x -= this.speed
  }

  /**
   * Verifica se colidiu com uma planta.
   *
   * Se houver colisão chama o método `attackPlant`.
   *
   * @param {Plant} plant
   * @returns {void}
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
   * @returns {void}
   */
  attackPlant(plant) {
    this.attackTimer += 1
    if (this.attackTimer >= this.timeToAttack) {
      this.attackTimer = 0
      plant.life -= this.damage
      if (plant.life <= 0 || !this.isCollidingWith(plant)) {
        this.canMove = true
        this.targetPlant = null
      }
      console.log("atacou")
    }
  }
}
