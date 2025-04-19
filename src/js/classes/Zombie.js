class Zombie {
  constructor(x, y, width, height, tipo) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.tipo = tipo
    this.velocidade = 0.1
    this.vida = 10
  }

  draw = (ctx) => {
    ctx.fillStyle = "red"
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  move = () => {
    this.x -= this.velocidade
  }
}
