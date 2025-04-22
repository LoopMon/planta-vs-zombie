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
  }

  move() {
    if (!this.canMove) return
    this.x -= this.speed
  }

  plantDetection(plant) {
    if (!this.isCollidingWith(plant)) return

    this.canMove = false
    this.attackPlant(plant)
  }

  attackPlant(plant) {
    this.attackTimer += 1
    if (this.attackTimer >= this.timeToAttack) {
      this.attackTimer = 0
      plant.life -= this.damage
      if (plant.life <= 0 || !this.isCollidingWith(plant)) {
        this.canMove = true
      }
      console.log("atacou")
    }
  }
}
