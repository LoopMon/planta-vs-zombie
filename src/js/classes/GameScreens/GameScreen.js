import { Wave } from "../GameEnemies/Wave.js"
import { Button } from "./UI/Button.js"
import { Screen } from "./Screen.js"
import { Painel } from "../GamePainel/Painel.js"
import { Rectangle } from "../Rectangle.js"
import { SunManager } from "../GameSun/SunManager.js"
import { createLawn } from "../../functions.js"
import { PlantManager } from "../GamePlants/PlantManager.js"
import { PauseOverlay } from "./modals/PauseOverlay.js"
import { COLORS, CONTROLS, FONT } from "../../constants.js"

export class GameScreen extends Screen {
  mouseStates = {
    FREE: 0,
    PLANT: 1,
    REMOVE: 2,
  }
  gameStates = {
    PLAYING: 0,
    PAUSED: 1,
  }
  currentGameState = this.gameStates.PLAYING
  currentMouseState = this.mouseStates.FREE
  painel = null
  lawn = null
  wave = null
  plantManager = null
  pauseOverlay = null
  sunManager = new SunManager()
  currentPlant = {}
  mySuns = 1_000 // para desenvolvimento

  /**
   * Construtor do GameScreen.
   *
   * @param {string} name - identificação nominal para a tela
   * @param {Game} game - referência do game
   */
  constructor(name, game) {
    super(name, game)
  }

  /**
   * Responsável por desenhar os elementos do jogo.
   */
  draw(ctx) {
    this.lawn.drawRect(ctx)

    this.painel.drawRect(ctx, this.mySuns)

    this.plantManager.draw(ctx)

    this.wave.drawZombies(ctx)

    this.sunManager.draw(ctx)

    super.drawElements(ctx)

    this.pauseOverlay.draw(ctx)

    this.drawMouseInfo(ctx, this.game.mousePos)
  }

  /**
   * Responsável por verificar a atualização dos elementos do jogo.
   *
   * @param {DOMHighResTimeStamp} timestamp - O timestamp em milissegundos,
   *    fornecido pelo `requestAnimationFrame`, usado para sincronização de animações.
   */
  update = (timestamp) => {
    if (this.pauseOverlay.isActive) return

    this.sunManager.update(timestamp)
    this.plantManager.update(timestamp, this.wave)

    this.wave.update(timestamp)
    this.wave.attackPlants(this.plantManager.plants)
    this.wave.moveZombies()
    this.wave.checkZombiesLife()
    this.sunManager.fallSuns(this.game)
    this.sunManager.collectSun(this.game, this)
    this.spawns()
  }

  /**
   * Inicializa os elementos do GameScreen ao entrar na tela.
   */
  onEnter() {
    super.onEnter()

    this.init()
  }

  handleClick(mousePos) {
    super.handleClick(mousePos)
    this.pauseOverlay.handleClick(mousePos)

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
  }

  handleKeyUp(eventKey) {
    if (eventKey.toLowerCase() === CONTROLS.R) {
      this.currentMouseState =
        this.currentMouseState === this.mouseStates.REMOVE
          ? this.mouseStates.FREE
          : this.mouseStates.REMOVE
    }

    if (eventKey.toLowerCase() === CONTROLS.ESC) {
      this.pauseOverlay.toggle()
    }
  }

  /**
   * Informa ao jogador qual estado se encontra o mouse:
   *
   * - Livre: `0`;
   *
   * - Com planta na mão: `1`;
   *
   * - Para remover planta: `2`;
   */
  drawMouseInfo = (ctx, mousePos) => {
    ctx.fillStyle = COLORS.RGB_GREEN
    let fontConfig = `${FONT.MEDIUM}px ${FONT.FAMILY}`
    ctx.font = fontConfig
    ctx.fillText(this.currentMouseState, mousePos[0], mousePos[1])
  }

  /**
   * Chama os métodos para criar os objetos
   * que nascem por tempo.
   */
  spawns = () => {
    this.sunManager.spawnSun(this.game)
    this.plantManager.spawns(this.sunManager)
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
    if (!this.hasResourcesForPlant()) return

    this.plantManager.addPlant(this.currentPlant.name, plantPos, gridPos)
    this.mySuns -= this.currentPlant.cust
    this.currentPlant = {}
    this.currentMouseState = this.mouseStates.FREE
  }

  /**
   * Remove a planta do gramado quando o
   * mouse se encontra no estado de REMOVE.
   */
  removePlant = (gridPos) => {
    if (this.currentMouseState === this.mouseStates.REMOVE) {
      this.plantManager.removePlant(gridPos)
      this.currentMouseState = this.mouseStates.FREE
    }
  }

  /**
   * Verifica se possui planta na mão e
   * se possui sois suficientes.
   *
   * @returns {boolean}
   */
  hasResourcesForPlant = () => {
    return this.currentPlant && this.mySuns >= this.currentPlant.cust
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
      this.game.cnv.width,
      Math.floor(this.game.cnv.height / 5),
      COLORS.GREEN_YELLOW,
      items
    )
    this.lawn = createLawn(this.painel, this.game.cnv, [5, 13])
    this.plantManager = new PlantManager(this.lawn, this)
    this.wave = new Wave(
      this.lawn.grid.map((_, index) => this.lawn.grid[index][0].y)
    )
    const rect = new Rectangle(
      this.game.cnv.width / 2 - 150,
      this.game.cnv.height / 2 - 250,
      300,
      500,
      COLORS.RGB_BLUE
    )
    this.pauseOverlay = new PauseOverlay(rect, this)

    const rectBtnPausar = new Rectangle(
      this.painel.width - 100,
      0,
      100,
      50,
      COLORS.RGB_BLUE
    )
    this.elements = [
      new Button(rectBtnPausar, "Pausar", () => {
        this.pauseOverlay.toggle()
      }),
    ]
  }
}
