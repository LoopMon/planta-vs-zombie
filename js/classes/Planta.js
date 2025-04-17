class Planta {
  constructor(x, y, width, height, tipo) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.tipo = tipo
    this.timerFire = 0
    this.fireObj = {
      x: this.x + this.width - 5,
      y: this.y + Math.floor(this.height / 2),
      scale: 10,
    }
  }

  draw = (ctx) => {
    ctx.fillStyle = "green"
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  zombieDetection = (zombie, ctx) => {
    if (this.x < zombie.x) {
      this.fire()
      this.drawFire(ctx)
      this.fireColision(zombie)
    }
  }

  drawFire = (ctx) => {
    ctx.fillStyle = "blue"
    ctx.fillRect(
      this.fireObj.x,
      this.fireObj.y,
      this.fireObj.scale,
      this.fireObj.scale
    )
  }

  fire = () => {
    this.fireObj.x += 2
  }

  fireColision = (zombie) => {
    if (this.fireObj.x > zombie.x) {
      zombie.vida -= 1
      this.fireObj.x = this.x + this.width - 5
    }
  }
}
