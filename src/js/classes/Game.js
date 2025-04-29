import { Painel } from "./Painel.js"
import { Wave } from "./Wave.js"
import { SunManager } from "./SunManager.js"
import { Nut } from "./Plants/Nut.js"
import { SunFlower } from "./Plants/SunFlower.js"
import { ShooterPlant } from "./Plants/ShooterPlant.js"
import { DoubleShooterPlant } from "./Plants/DoubleShooterPlant.js"
import { createLawn } from "../functions.js"

import { PLANT, COLORS, CONTROLS, FONT } from "../constants.js"

export class Game {
  mouseStates = {
    FREE: 0,
    PLANT: 1,
    REMOVE: 2,
  }
  gameStates = {
    PLAYING: 0,
    PAUSED: 1,
  }
  gameScreens = {
    START_SCREEN: 0,
    HOME: 1,
    SETTINGS: 2,
    EXTRAS: 3,
    GAME: 4,
  }
  currentGameState = this.gameStates.PLAYING
  currentMouseState = this.mouseStates.FREE
  currentGameScreen = this.gameScreens.GAME
  mousePos = [0, 0]
  painel = null
  lawn = null
  wave = null
  plants = []
  currentPlant = {}
  sunManager = new SunManager()
  mySuns = 5_000 // para desenvolvimento

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
    // Definindo largura e altura do canvas para dimensões da tela
    this.cnv.width = window.innerWidth
    this.cnv.height = window.innerHeight
  }

  /**
   * Responsável por desenhar os elementos do jogo.
   */
  draw = () => {
    this.lawn.drawRect(this.ctx)

    this.painel.drawRect(this.ctx, this.mySuns)

    this.plants.forEach((plant) => {
      plant.drawRect(this.ctx)
    })

    this.plants.forEach((plant) => {
      if (plant.canShoot) plant.drawFire(this.ctx)
    })

    this.wave.drawZombies(this.ctx)

    this.sunManager.draw(this.ctx)

    this.drawMouseInfo()
  }

  /**
   * Responsável por verificar a atualização dos elementos do jogo.
   *
   * @param {DOMHighResTimeStamp} timestamp - O timestamp em milissegundos,
   *    fornecido pelo `requestAnimationFrame`, usado para sincronização de animações.
   */
  update = (timestamp) => {
    this.sunManager.update(timestamp)

    this.plants.forEach((plant) => {
      this.wave.zombies.forEach((zombie) => {
        if (plant.canShoot) plant.zombieDetection(zombie)
      })
    })

    this.wave.update(timestamp)

    this.plants.forEach((plant) => {
      plant.update(timestamp)
      if (plant.canShoot) {
        plant.fire()
        this.wave.zombies.forEach((zombie) => plant.fireColision(zombie))
      }
    })

    this.wave.attackPlants(this.plants)
    this.wave.moveZombies()
    this.wave.checkZombiesLife()
    this.sunManager.fallSuns(this)
    this.sunManager.collectSun(this)
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
    this.ctx.fillStyle = COLORS.RGB_GREEN
    let fontConfig = `${FONT.MEDIUM}px ${FONT.FAMILY}`
    this.ctx.font = fontConfig
    this.ctx.fillText(
      this.currentMouseState,
      this.mousePos[0],
      this.mousePos[1]
    )
  }

  /**
   * Chama os métodos para criar os objetos
   * que nascem por tempo.
   */
  spawns = () => {
    this.sunManager.spawnSun(this)
    this.plants.forEach((plant) => {
      if (plant.isSunFlower) {
        plant.createSun(this.sunManager)
      }
    })
    this.wave.spawnZombie()
  }

  /**
   * Posiciona a planta em uma posição informada, se
   * ja estiver ocupado não planta.
   *
   * @param {number[2]} plantPos - posição da nova planta
   * @param {number[2]} gridPos - grid onde vai ser colocada a planta
   */
  plant = (plantPos, gridPos) => {
    if (!!this.lawn.grid[gridPos[0]][gridPos[1]].content) return

    if (this.currentPlant && this.mySuns >= this.currentPlant.cust) {
      let newPlant = null

      switch (this.currentPlant.name) {
        case "Sol":
          newPlant = new SunFlower(
            plantPos[0],
            plantPos[1],
            PLANT.WIDTH,
            PLANT.HEIGHT,
            COLORS.CHOCOLATE
          )
          break
        case "Simples":
          newPlant = new ShooterPlant(
            plantPos[0],
            plantPos[1],
            PLANT.WIDTH,
            PLANT.HEIGHT,
            COLORS.GREEN
          )
          break
        case "Duplo":
          newPlant = new DoubleShooterPlant(
            plantPos[0],
            plantPos[1],
            PLANT.WIDTH,
            PLANT.HEIGHT,
            COLORS.PURPLE
          )
          break
        case "Noz":
          newPlant = new Nut(
            plantPos[0],
            plantPos[1],
            PLANT.WIDTH,
            PLANT.HEIGHT,
            COLORS.BROWN
          )
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

      if (newPlant.isSunFlower) {
        newPlant.initSunCycle()
      }

      this.mySuns -= this.currentPlant.cust
      this.currentPlant = {}
      this.currentMouseState = this.mouseStates.FREE
    }
  }

  removePlant(gridPos) {
    if (this.currentMouseState === this.mouseStates.REMOVE) {
      const removedPlant = this.lawn.removePlant(gridPos[0], gridPos[1])

      if (removedPlant) {
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
          this.currentMouseState == this.mouseStates.FREE &&
          this.mySuns >= item.cust
        ) {
          this.currentMouseState = this.mouseStates.PLANT
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
            if (this.currentMouseState === this.mouseStates.REMOVE) {
              this.removePlant([i, j])
            } else {
              this.plant([field.x, field.y], [i, j])
            }
          }
        })
      })
    })

    document.addEventListener("keyup", (event) => {
      if (event.key.toLowerCase() === CONTROLS.R) {
        this.currentMouseState =
          this.currentMouseState === this.mouseStates.REMOVE
            ? this.mouseStates.FREE
            : this.mouseStates.REMOVE
      }
      if (event.key.toLowerCase() === CONTROLS.ESC) {
        console.log("Pause Game")
      }
    })

    document.addEventListener("mousemove", (event) => {
      this.mousePos[0] = event.clientX
      this.mousePos[1] = event.clientY
    })
  }

  /**
   * Loop principal do jogo/animacao, executado a cada frame.
   *
   * @param {DOMHighResTimeStamp} timestamp - O timestamp atual em milissegundos,
   * fornecido pelo `requestAnimationFrame`.
   */
  run = (timestamp) => {
    this.clearCanvas(this.ctx)
    this.draw()
    this.update(timestamp)
    window.requestAnimationFrame(this.run)
  }

  /**
   * Inicia o jogo criando os
   * itens principais para jogar.
   */
  init = () => {
    const items = [
      {
        name: "Sol",
        cust: 50,
      },
      {
        name: "Simples",
        cust: 100,
      },
      {
        name: "Duplo",
        cust: 200,
      },
      {
        name: "Noz",
        cust: 50,
      },
    ]
    this.painel = new Painel(
      0,
      0,
      this.cnv.width,
      Math.floor(this.cnv.height / 5),
      COLORS.GREEN_YELLOW,
      items
    )
    this.lawn = createLawn(this.painel, this.cnv, [5, 13])
    this.wave = new Wave(
      this.lawn.grid.map((_, index) => this.lawn.grid[index][0].y)
    )
    this.addEvents()

    console.log("Starting Game!!!")
    this.run()
  }
}
