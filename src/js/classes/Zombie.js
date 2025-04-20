class Zombie {
  constructor(x, y, width, height, type) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.type = type
    this.speed = 0.05
    this.life = 10
    this.damage = 1
    this.attackTimer = 0
    this.timeToAttack = 500
  }

  draw = (ctx) => {
    ctx.fillStyle = "red"
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  move = () => {
    this.x -= this.speed
  }

  plantDetection = (plant) => {
    if (plant.x + plant.width > this.x) {
      this.attackPlant(plant)
    }
  }

  attackPlant = (plant) => {
    this.attackTimer += 1
    if (this.attackTimer >= this.timeToAttack) {
      this.attackTimer = 0
      plant.life -= this.damage
    }
  }
}
