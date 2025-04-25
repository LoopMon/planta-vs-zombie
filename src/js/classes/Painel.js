class Painel extends Rectangle {
  /**
   * Cria o painel do jogo.
   *
   * @param {number} x - posição x do painel no canvas
   * @param {number} y - posição y do painel no canvas
   * @param {number} width - largura do painel
   * @param {number} height - altura do painel
   * @param {string} backgroundColor - cor do painel
   * @returns {Painel}
   */
  constructor(x, y, width, height, backgroundColor) {
    super(x, y, width, height, backgroundColor)
    this.items = []
    this.areaPlayerSuns = new Rectangle(
      this.x + 5,
      this.y + 5,
      100,
      this.height - 10,
      "brown"
    )
  }

  drawRect(ctx, playerSuns) {
    super.drawRect(ctx)

    this.drawPlayerSuns(ctx, playerSuns)
    this.drawItens(ctx)
  }

  drawPlayerSuns(ctx, playerSuns) {
    // AREA PLAYER SUNS
    this.areaPlayerSuns.drawRect(ctx)
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

  drawItens(ctx) {
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

  init() {
    const elementos = [
      {
        nome: "Simples",
        custo: 100,
      },
      {
        nome: "Duplo",
        custo: 200,
      },
      {
        nome: "Noz",
        custo: 50,
      },
    ]
    this.items = createPainelItens(this, elementos)
  }
}
