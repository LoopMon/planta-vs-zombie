class Sol {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.cor = "#ff0"
    this.velocidade = 0.5
  }

  draw = (ctx) => {
    ctx.fillStyle = this.cor
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  fall = () => {
    this.y += this.velocidade
  }
}
