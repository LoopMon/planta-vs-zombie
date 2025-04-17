class Painel {
  constructor(x, y, width, height, corFundo) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.corFundo = corFundo
    this.corBorda = "blue"
    this.items = []
  }

  draw = (ctx) => {
    // PAINEL
    ctx.fillStyle = this.corFundo
    ctx.fillRect(this.x, this.y, this.width, this.height)

    // PLAYER SUNS
    ctx.fillStyle = "brown"
    ctx.fillRect(this.width - 110, this.y + 5, 100, this.height - 10)

    this.drawItens(ctx)
  }

  drawItens = (ctx) => {
    this.items.forEach((item) => {
      let tamanhoFonte = 12
      ctx.fillStyle = "#000"
      ctx.lineWidth = 1
      ctx.font = `${tamanhoFonte}px Arial`
      ctx.fillText(item.nome, item.x + tamanhoFonte, item.y + tamanhoFonte * 2)
      ctx.fillText(item.custo, item.x + tamanhoFonte, item.y + tamanhoFonte * 3)
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 3
      ctx.strokeRect(item.x, item.y, item.width, item.height)
    })
  }

  init = () => {
    const elementos = [
      {
        nome: "tiro simples",
        custo: 100,
      },
      {
        nome: "tiro duplo",
        custo: 200,
      },
      {
        nome: "pedra",
        custo: "50",
      },
    ]
    this.items = createPainelItens(this, elementos)
  }
}
