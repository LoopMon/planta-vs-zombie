class Zombie {
  constructor(x, y, width, height, type) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.type = type
    this.canMove = true
    this.speed = 0.05
    this.life = 10
    this.damage = 1
    this.attackTimer = 0
    this.timeToAttack = 100
  }

  draw = (ctx) => {
    ctx.fillStyle = "red"
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  move = () => {
    if (!this.canMove) return
    this.x -= this.speed
  }

  plantDetection = (plant) => {
    if (
      this.x + this.width >= plant.x &&
      this.x <= plant.x + plant.width &&
      this.y + this.height >= plant.y &&
      this.y <= plant.y + plant.height
    ) {
      this.canMove = false
      this.attackPlant(plant)
    }
  }

  attackPlant = (plant) => {
    this.attackTimer += 1
    if (this.attackTimer >= this.timeToAttack) {
      this.attackTimer = 0
      plant.life -= this.damage
      if (plant.life <= 0) {
        this.canMove = true
      }
      console.log("atacou")
    }
  }
}
