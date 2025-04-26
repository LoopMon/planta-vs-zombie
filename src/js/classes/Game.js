import { Painel } from "./Painel.js"
import { Wave } from "./Wave.js"
import { Sun } from "./Sun.js"
import { Nut } from "./Plants/Nut.js"
import { ShooterPlant } from "./Plants/ShooterPlant.js"
import { DoubleShooterPlant } from "./Plants/DoubleShooterPlant.js"
import { detectMouseCollision, createLawn } from "../functions.js"

export class Game {
  /**
   * Cria o jogo com todos os elementos necessários.
   *
   * @param {HTMLCanvasElement} cnv - Elemento canvas HTML
   * @param {CanvasRenderingContext2D} ctx - Contexto de renderização do canvas
   * @returns {Game}
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
    this.lawn = null
    this.wave = null
    this.plants = []
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
   */
  draw = () => {
    this.painel.drawRect(this.ctx, this.mySuns)

    this.lawn.drawRect(this.ctx)

    this.plants.forEach((plant) => {
      plant.drawRect(this.ctx)
    })

    this.plants.forEach((plant) => {
      if (plant.canShoot) plant.drawFire(this.ctx)
    })

    this.wave.drawZombies(this.ctx)

    this.suns.forEach((sun) => sun.drawRect(this.ctx))

    this.drawMouseInfo()
  }

  /**
   * Responsável por verificar a atualização
   * dos elementos do jogo.
   */
  update = () => {
    this.suns.forEach((sun, index) => {
      sun.fall()
      this.collectSun(sun)

      if (sun.y > this.cnv.height) {
        this.suns.splice(index, 1)
      }
    })

    // Primeiro detecta todos os zumbis
    this.plants.forEach((plant) => {
      this.wave.zombies.forEach((zombie) => {
        if (plant.canShoot) plant.zombieDetection(zombie)
      })
    })

    // Depois atualiza os disparos
    this.plants.forEach((plant) => {
      if (plant.canShoot) {
        plant.updateShooting()
        plant.fire()
        this.wave.zombies.forEach((zombie) => plant.fireColision(zombie))
      }
    })

    this.wave.attackPlants(this.plants)
    this.wave.moveZombies()
    this.wave.checkZombiesLife()
    this.spawns()
  }

  /**
   * Informa ao jogador qual estado se encontra o mouse:
   *
   * - Livre;
   *
   * - Com planta na mão;
   *
   * - Para remover planta;
   */
  drawMouseInfo = () => {
    this.ctx.fillStyle = "#0f0"
    this.ctx.font = "16px Arial"
    this.ctx.fillText(this.mouseState, this.mousePos[0], this.mousePos[1])
  }

  /**
   * Chama os métodos para criar os objetos
   * que nascem por tempo.
   */
  spawns = () => {
    this.spawnSun()
    this.wave.spawnZombie()
  }

  /**
   * Detecta se o mouse colidiu com um Sol
   * presente no canvas.
   *
   * @param {Sun} sun
   */
  collectSun = (sun) => {
    if (!detectMouseCollision(this.mousePos, sun)) return

    this.mySuns += Sun.VALUE

    this.suns.splice(this.suns.indexOf(sun), 1)
  }

  /**
   * Cria um sol quando o `sunTimer`
   * alcançar `timeToSpawnSun`.
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
   */
  addSun = () => {
    const x = Math.floor(Math.random() * this.cnv.width)
    const y = Math.floor(Math.random())
    this.suns.push(new Sun(x, y))
  }

  /**
   * Posiciona a planta em uma posição informada, se
   * ja estiver ocupado não planta.
   *
   * @param {number[2]} plantPos - posição da nova planta
   * @param {number[2]} gridPos - grid onde vai ser colocada a planta
   * @param {Grid} grid - grid para plantar
   */
  plant = (plantPos, gridPos) => {
    if (!!this.lawn.grid[gridPos[0]][gridPos[1]].content) return

    if (this.currentPlant && this.mySuns >= this.currentPlant.cust) {
      let newPlant

      switch (this.currentPlant.name) {
        case "Simples":
          newPlant = new ShooterPlant(plantPos[0], plantPos[1], 40, 60, "green")
          break
        case "Duplo":
          newPlant = new DoubleShooterPlant(
            plantPos[0],
            plantPos[1],
            40,
            60,
            "purple"
          )
          break
        case "Noz":
          newPlant = new Nut(plantPos[0], plantPos[1], 40, 60, "brown")
          break
        default:
          return
      }
      this.plants.push(newPlant)
      this.lawn.addPlant(
        gridPos[0],
        gridPos[1],
        this.plants[this.plants.length - 1]
      )

      this.mySuns -= this.currentPlant.cust
      this.currentPlant = {}
      this.mouseState = this.mouseFlags.free
    }
  }

  removePlant(gridPos) {
    if (this.mouseState === this.mouseFlags.remove) {
      // Remove do grid e obtém a planta removida
      const removedPlant = this.lawn.removePlant(gridPos[0], gridPos[1])

      if (removedPlant) {
        // Remove do array plants
        this.plants = this.plants.filter((plant) => plant !== removedPlant)
        // Devolve parte do custo
        // this.mySuns += Math.floor(removedPlant.custo * 0.5)
      }
    }
  }

  /**
   * Limpa a tela do canvas.
   */
  clearCanvas = () => {
    this.ctx.fillStyle = "#964b00"
    this.ctx.fillRect(0, 0, this.cnv.width, this.cnv.height)
  }

  /**
   * Adiciona os eventos ao documento.
   */
  addEvents = () => {
    document.addEventListener("click", (event) => {
      const mousePos = [event.clientX, event.clientY]
      // Seleciona um item do painel
      this.painel.items.forEach((item) => {
        if (
          mousePos[0] > item.x &&
          mousePos[0] < item.x + item.width &&
          mousePos[1] > item.y &&
          mousePos[1] < item.y + item.height &&
          this.mouseState == this.mouseFlags.free &&
          this.mySuns >= item.cust
        ) {
          this.mouseState = this.mouseFlags.plant
          this.currentPlant = item
        }
      })

      // Planta/Remove uma planta no grid
      this.lawn.grid.forEach((line, i) => {
        line.forEach((field, j) => {
          if (
            mousePos[0] > field.x &&
            mousePos[0] < field.x + field.width &&
            mousePos[1] > field.y &&
            mousePos[1] < field.y + field.height
          ) {
            if (this.mouseState === this.mouseFlags.remove) {
              this.removePlant([i, j])
            } else {
              this.plant([field.x, field.y], [i, j])
            }
          }
        })
      })
    })

    document.addEventListener("keyup", (event) => {
      if (event.key.toLowerCase() === "r") {
        this.mouseState =
          this.mouseState === this.mouseFlags.remove
            ? this.mouseFlags.free
            : this.mouseFlags.remove
      }
    })

    document.addEventListener("mousemove", (event) => {
      this.mousePos[0] = event.clientX
      this.mousePos[1] = event.clientY
    })
  }

  /**
   * Loop do jogo, vai chamar a função
   * para desenhar e atualizar.
   */
  run = () => {
    this.clearCanvas(this.ctx)
    this.draw()
    this.update()
    window.requestAnimationFrame(this.run)
  }

  /**
   * Inicia o jogo criando os
   * itens principais para jogar.
   */
  init = () => {
    this.painel = new Painel(
      0,
      0,
      this.cnv.width,
      Math.floor(this.cnv.height / 5),
      "#bb5"
    )
    this.painel.init()
    this.lawn = createLawn(this.painel, this.cnv, [5, 13], [70, 80])
    this.wave = new Wave(
      this.lawn.grid.map((_, index) => this.lawn.grid[index][0].y)
    )
    this.addEvents()

    console.log("Starting Game!!!")
    this.run()
  }
}
