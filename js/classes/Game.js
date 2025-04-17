class Game {
  /**
   * Cria o jogo com todos os elementos necessários.
   *
   * @param {HTMLCanvasElement} cnv - Elemento canvas HTML
   * @param {CanvasRenderingContext2D} ctx - Contexto de renderização do canvas
   * @returns {Game} Instância do jogo
   */
  constructor(cnv, ctx) {
    this.cnv = cnv
    this.ctx = ctx
    this.mouseEstados = {
      livre: 0,
      plantar: 1,
      removerPlanta: 2,
    }
    this.mousePos = [0, 0]
    this.gameEstados = {
      jogar: 0,
      pause: 1,
      menu: 2,
    }
    this.mouseEstadoAtual = this.mouseEstados.livre
    this.gameEstadoAtual = this.gameEstados.jogar
    this.plantaAtual = {}
    this.painel = null
    this.grid = null
    this.plants = []
    this.zombies = []
    this.sois = []
    this.mySuns = 400
    this.timerSol = 0

    this.cnv.width = window.innerWidth
    this.cnv.height = window.innerHeight
  }

  /**
   * Responsável por desenhar os elementos do jogo.
   *
   * @returns {void}
   */
  draw = () => {
    this.painel.draw(this.ctx)

    this.grid.forEach((fileira) => {
      fileira.forEach((campo) => {
        this.ctx.fillStyle = "#228b22"
        this.ctx.fillRect(campo.x, campo.y, campo.width, campo.height)
      })
    })

    this.plants.forEach((plant) => {
      plant.draw(this.ctx)
    })

    this.sois.forEach((sol) => {
      sol.draw(this.ctx)
    })

    this.drawMouseInfo()

    this.drawMeusSois()
  }

  /**
   * Responsável por verificar a atualização
   * dos elementos do jogo.
   *
   * @returns {void}
   */
  update = () => {
    this.sois.forEach((sol, index) => {
      sol.fall()
      this.pegarSol(sol)

      if (sol.y > this.cnv.height) {
        this.sois.splice(index, 1)
      }
    })
    this.spawns()
  }

  drawMouseInfo = () => {
    this.ctx.fillStyle = "#0f0"
    this.ctx.font = "16px Arial"
    this.ctx.fillText(this.mouseEstadoAtual, this.mousePos[0], this.mousePos[1])
  }

  drawMeusSois = () => {
    this.ctx.fillStyle = "#ff0a"
    this.ctx.font = "60px Arial"
    this.ctx.fillText(this.mySuns, this.cnv.width - 60, 60)
  }

  pegarSol = (sol) => {
    if (detectMouseCollision(this.mousePos, sol)) {
      this.mySuns += sol.valor
      this.sois.splice(this.sois.indexOf(sol), 1)
    }
  }

  /**
   * Chama os métodos para criar os objetos
   * que nascem por tempo.
   *
   * @returns {void}
   */
  spawns = () => {
    this.timerSol += 1
    if (this.timerSol > 1000) {
      this.spawnSun()
      this.timerSol = 0
    }
  }

  /**
   * Adiciona um sol a coleção de sois.
   *
   * @returns {void}
   */
  spawnSun = () => {
    this.sois.push(
      createSun(
        Math.floor(Math.random() * this.cnv.width - 40) + 40,
        Math.floor(Math.random() * -30),
        30,
        30
      )
    )
  }

  /**
   * Posiciona a planta em uma posição informada
   *
   * @param {number} x - x de um campo do grid
   * @param {number} y - y de um campo do grid
   * @returns {void}
   */
  plantar = (x, y) => {
    if (this.plantaAtual && this.mySuns >= this.plantaAtual.custo) {
      this.plants.push(createPlant(x, y, 40, 60, this.plantaAtual.nome))
      this.mySuns -= this.plantaAtual.custo
      this.plantaAtual = {}
      this.mouseEstadoAtual = this.mouseEstados.livre
    }
  }

  /**
   * Limpa a tela do canvas
   *
   * @returns {void}
   */
  clearCanvas = () => {
    this.ctx.fillStyle = "#964b00"
    this.ctx.fillRect(0, 0, this.cnv.width, this.cnv.height)
  }

  addEvents = () => {
    document.addEventListener("click", (event) => {
      this.painel.items.forEach((item) => {
        if (
          event.clientX > item.x &&
          event.clientX < item.x + item.width &&
          event.clientY > item.y &&
          event.clientY < item.y + item.height &&
          this.mouseEstadoAtual == this.mouseEstados.livre &&
          this.mySuns >= item.custo
        ) {
          this.mouseEstadoAtual = this.mouseEstados.plantar
          this.plantaAtual = item
        }
      })

      this.grid.forEach((fileira) => {
        fileira.forEach((campo) => {
          if (
            event.clientX > campo.x &&
            event.clientX < campo.x + campo.width &&
            event.clientY > campo.y &&
            event.clientY < campo.y + campo.height
          ) {
            this.plantar(campo.x, campo.y)
          }
        })
      })
    })

    document.addEventListener("mousemove", (event) => {
      this.mousePos[0] = event.clientX
      this.mousePos[1] = event.clientY
    })
  }

  /**
   * Loop do jogo, vai chamar a função
   * para desenhar e a de atualizar
   *
   * @returns {void}
   */
  run = () => {
    this.clearCanvas()
    this.draw()
    this.update()
    window.requestAnimationFrame(this.run)
  }

  /**
   * Inicializa o jogo criando os
   * itens principais para jogar.
   *
   * @returns {void}
   */
  init = () => {
    this.painel = createPainel(
      0,
      0,
      this.cnv.width,
      Math.floor(this.cnv.height / 5),
      "#bb5"
    )
    this.painel.init()
    this.grid = createGrid(this.painel, [4, 10])
    this.addEvents()
    console.log("Starting Game!!!")
    this.run()
  }
}
