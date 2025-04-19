class Painel {
  constructor(x, y, width, height, corFundo) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.corFundo = corFundo
    this.items = []
    this.areaPlayerSuns = {
      x: this.x + 5,
      y: this.y + 5,
      width: 100,
      height: this.height - 10,
      color: "brown",
    }
  }

  draw = (ctx, playerSuns) => {
    // PAINEL
    ctx.fillStyle = this.corFundo
    ctx.fillRect(this.x, this.y, this.width, this.height)

    this.drawPlayerSuns(ctx, playerSuns)
    this.drawItens(ctx)
  }

  drawPlayerSuns = (ctx, playerSuns) => {
    // AREA PLAYER SUNS
    ctx.fillStyle = this.areaPlayerSuns.color
    ctx.fillRect(
      this.areaPlayerSuns.x,
      this.areaPlayerSuns.y,
      this.areaPlayerSuns.width,
      this.areaPlayerSuns.height
    )
    // PLAYER SUNS
    let tamanhoFonte = 24
    ctx.fillStyle = "#ff0"
    ctx.font = `${tamanhoFonte}px Arial`
    ctx.fillText(
      formatarNumero(playerSuns),
      this.areaPlayerSuns.x,
      this.areaPlayerSuns.y + tamanhoFonte,
      this.areaPlayerSuns.width
    )
  }

  drawItens = (ctx) => {
    this.items.forEach((item) => {
      let tamanhoFonte = 12
      // ITEM TEXT
      ctx.fillStyle = "#000"
      ctx.lineWidth = 1
      ctx.font = `${tamanhoFonte}px Arial`
      ctx.fillText(item.nome, item.x + tamanhoFonte, item.y + tamanhoFonte * 2)
      ctx.fillText(
        item.custo,
        item.x + tamanhoFonte,
        item.y + tamanhoFonte * 3.5
      )

      // BOX
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 2
      ctx.strokeRect(item.x, item.y, item.width, item.height)
    })
  }

  init = () => {
    const elementos = [
      {
        nome: "simples",
        custo: 100,
      },
      {
        nome: "duplo",
        custo: 200,
      },
      {
        nome: "pedra",
        custo: 50,
      },
    ]
    this.items = createPainelItens(this, elementos)
  }
}
