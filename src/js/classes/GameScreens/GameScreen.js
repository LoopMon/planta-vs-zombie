import { Screen } from "./Screen.js"
import { Wave } from "../GameEnemies/Wave.js"
import { Painel } from "../GamePainel/Painel.js"
import { SunManager } from "../GameSun/SunManager.js"
import { PlantManager } from "../GamePlants/PlantManager.js"
import { createLawn } from "../../functions.js"
import { COLORS, FONT } from "../../constants.js"

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
  mousePos = [0, 0]
  painel = null
  lawn = null
  wave = null
  currentPlant = {}
  plantManager = null
  sunManager = new SunManager()
  mySuns = 1_000 // para desenvolvimento

  constructor(name, game) {
    super(name, game)
  }

  onEnter() {
    this.init()
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

    this.drawMouseInfo(ctx, this.game.mousePos)
  }

  /**
   * Responsável por verificar a atualização dos elementos do jogo.
   *
   * @param {DOMHighResTimeStamp} timestamp - O timestamp em milissegundos,
   *    fornecido pelo `requestAnimationFrame`, usado para sincronização de animações.
   */
  update = (timestamp) => {
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
   * Informa ao jogador qual estado se encontra o mouse:
   *
   * - Livre;
   *
   * - Com planta na mão;
   *
   * - Para remover planta;
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
  }
}
