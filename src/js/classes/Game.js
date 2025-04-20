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
    this.mouseFlags = {
      free: 0,
      plant: 1,
      remove: 2,
    }
    this.gameFlags = {
      play: 0,
      pause: 1,
      menu: 2,
    }
    this.mouseState = this.mouseFlags.free
    this.gameState = this.gameFlags.play
    this.mousePos = [0, 0]
    this.currentPlant = {}
    this.painel = null
    this.grid = null
    this.plants = []
    this.zombies = []
    this.suns = []
    this.mySuns = 1_000_000 // para desenvolvimento
    this.sunTimer = 0
    this.timeToSpawnSun = 1250
    // Definindo largura e altura do canvas para dimensões da tela
    this.cnv.width = window.innerWidth
    this.cnv.height = window.innerHeight
  }

  /**
   * Responsável por desenhar os elementos do jogo.
   *
   * @returns {void}
   */
  draw = () => {
    this.painel.draw(this.ctx, this.mySuns)

    this.grid.forEach((line) => {
      line.forEach((field) => {
        this.ctx.fillStyle = "#228b22"
        this.ctx.fillRect(field.x, field.y, field.width, field.height)
      })
    })

    this.plants.forEach((plant) => {
      plant.draw(this.ctx)
      plant.drawFire(this.ctx)
    })

    this.zombies.forEach((zombie) => {
      zombie.draw(this.ctx)
    })

    this.suns.forEach((sun) => {
      sun.draw(this.ctx)
    })

    this.drawMouseInfo()
  }

  /**
   * Responsável por verificar a atualização
   * dos elementos do jogo.
   *
   * @returns {void}
   */
  update = () => {
    this.suns.forEach((sun, index) => {
      sun.fall()
      this.collectSun(sun)

      if (sun.y > this.cnv.height) {
        this.suns.splice(index, 1)
      }
    })

    this.zombies.forEach((zombie) => {
      zombie.move()
    })

    this.spawns()
  }

  drawMouseInfo = () => {
    this.ctx.fillStyle = "#0f0"
    this.ctx.font = "16px Arial"
    this.ctx.fillText(this.mouseState, this.mousePos[0], this.mousePos[1])
  }

  collectSun = (sun) => {
    if (detectMouseCollision(this.mousePos, sun)) {
      this.mySuns += sun.value
      this.suns.splice(this.suns.indexOf(sun), 1)
    }
  }

  /**
   * Chama os métodos para criar os objetos
   * que nascem por tempo.
   *
   * @returns {void}
   */
  spawns = () => {
    this.spawnSun()
  }

  /**
   * Cria um sol quando o `sunTimer` alcançar 1500.
   *
   * @returns {void}
   */
  spawnSun = () => {
    this.sunTimer += 1
    if (this.sunTimer > this.timeToSpawnSun) {
      this.addSun()
      this.sunTimer = 0
    }
  }

  /**
   * Adiciona um sol a coleção de sois.
   *
   * @returns {void}
   */
  addSun = () => {
    const x = Math.floor(Math.random() * this.cnv.width)
    const y = Math.floor(Math.random())
    this.suns.push(createSun(x, y))
  }

  /**
   * Posiciona a planta em uma posição informada, se
   * ja estiver ocupado não planta.
   *
   * @param {number} x - x de um campo do grid
   * @param {number} y - y de um campo do grid
   * @param {Grid} grid - grid para plantar
   * @returns {void}
   */
  plant = (x, y, grid) => {
    if (!!grid.value) return

    if (this.currentPlant && this.mySuns >= this.currentPlant.custo) {
      this.plants.push(createPlant(x, y, 40, 60, this.currentPlant.nome))
      grid.value = this.currentPlant.nome
      console.log(grid)

      this.mySuns -= this.currentPlant.custo
      this.currentPlant = {}
      this.mouseState = this.mouseFlags.free
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
          this.mouseState == this.mouseFlags.free &&
          this.mySuns >= item.custo
        ) {
          this.mouseState = this.mouseFlags.plant
          this.currentPlant = item
        }
      })

      this.grid.forEach((line, i) => {
        line.forEach((field, j) => {
          if (
            event.clientX > field.x &&
            event.clientX < field.x + field.width &&
            event.clientY > field.y &&
            event.clientY < field.y + field.height
          ) {
            this.plant(field.x, field.y, this.grid[i][j])
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
   * para desenhar e atualizar
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
   * Inicia o jogo criando os
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
    this.grid = createGrid(this.cnv, this.painel, [1, 10])
    this.addEvents()
    this.zombies.push(
      createZombie(this.cnv.width, this.grid[0][0].y, 60, 70, "simples")
    )
    console.log("Starting Game!!!")
    this.run()
  }
}
