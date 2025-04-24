class Plant extends Rectangle {
  constructor(x, y, width, height, type) {
    super(x, y, width, height)
    this.type = type
    this.timerFire = 0
    this.fireObj = new Rectangle(
      this.x + this.width - 5,
      this.y + Math.floor(this.height / 3),
      10
    )
    this.types = {
      pedra: "brown",
      simples: "green",
      duplo: "purple",
    }
    this.color = this.types[type]
    this.life = 5
    this.gridPos = [0, 0] // para usar quando for remover uma planta do grid
  }

  zombieDetection(zombie, ctx) {
    if (this.x < zombie.x) {
      this.fire()
      this.drawFire(ctx)
      this.fireColision(zombie)
    }
  }

  drawFire(ctx) {
    this.fireObj.drawRect(ctx)
  }

  fire() {
    this.fireObj.x += 2
  }

  fireColision(zombie) {
    if (this.fireObj.x > zombie.x) {
      zombie.life -= 1
      this.fireObj.x = this.x + this.width - 5
    }
  }
}
