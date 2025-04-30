import { COLORS, CONTROLS } from "../constants.js"
import { GameScreen } from "./GameScreens/GameScreen.js"
import { HomeScreen } from "./GameScreens/HomeScreen.js"
import { LevelsScreen } from "./GameScreens/LevelsScreen.js"
import { SettingsScreen } from "./GameScreens/SettingsScreen.js"
import { CreditsScreen } from "./GameScreens/CreditsScreen.js"

export class Game {
  gameScreens = {
    START_SCREEN: 0, // pode ser uma tela de loading, pensando ainda
    HOME: new HomeScreen("HOME", this),
    LEVELS: new LevelsScreen("LEVELS", this),
    SETTINGS: new SettingsScreen("SETTINGS", this),
    CREDITS: new CreditsScreen("CREDITS", this),
    GAME: new GameScreen("GAME", this),
    PAUSE: 6, // não sei se pode estar aqui
  }
  currentGameScreen = this.gameScreens.HOME
  mousePos = [0, 0]

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
    this.clearCanvas()
    this.currentGameScreen.draw(this.ctx)
  }

  /**
   * Responsável por verificar a atualização dos elementos do jogo.
   *
   * @param {DOMHighResTimeStamp} timestamp - O timestamp em milissegundos,
   *    fornecido pelo `requestAnimationFrame`, usado para sincronização de animações.
   */
  update = (timestamp) => {
    this.currentGameScreen.update(timestamp)
  }

  clearCanvas = () => {
    this.ctx.fillStyle = COLORS.RGB_WHITE
    this.ctx.fillRect(0, 0, this.cnv.width, this.cnv.height)
  }

  setScreen(screenName) {
    if (this.gameScreens[screenName]) {
      this.currentGameScreen.onExit() // Notifica a tela atual que está saindo
      this.currentGameScreen = this.gameScreens[screenName]
      this.currentGameScreen.onEnter() // Prepara a nova tela
    }
  }

  /**
   * Adiciona os eventos ao documento.
   */
  addEvents = () => {
    document.addEventListener("click", (event) => {
      const mousePos = [event.clientX, event.clientY]

      this.currentGameScreen.handleClick(mousePos)

      if (this.currentGameScreen.name == "GAME") {
        const screen = this.currentGameScreen
        // Seleciona um item do painel
        screen.painel.items.forEach((item) => {
          if (
            this.mousePos[0] > item.x &&
            this.mousePos[0] < item.x + item.width &&
            this.mousePos[1] > item.y &&
            this.mousePos[1] < item.y + item.height &&
            screen.currentMouseState == screen.mouseStates.FREE &&
            screen.mySuns >= item.cust
          ) {
            screen.currentMouseState = screen.mouseStates.PLANT
            screen.currentPlant = item
          }
        })

        // Planta/Remove uma planta no grid
        screen.lawn.grid.forEach((line, i) => {
          line.forEach((field, j) => {
            if (
              this.mousePos[0] > field.x &&
              this.mousePos[0] < field.x + field.width &&
              this.mousePos[1] > field.y &&
              this.mousePos[1] < field.y + field.height
            ) {
              if (screen.currentMouseState === screen.mouseStates.REMOVE) {
                screen.removePlant([i, j])
              } else {
                screen.plant([field.x, field.y], [i, j])
              }
            }
          })
        })
      }
    })

    document.addEventListener("keyup", (event) => {
      if (this.currentGameScreen.name == "GAME") {
        const screen = this.currentGameScreen
        if (event.key.toLowerCase() === CONTROLS.R) {
          screen.currentMouseState =
            screen.currentMouseState === screen.mouseStates.REMOVE
              ? screen.mouseStates.FREE
              : screen.mouseStates.REMOVE
        }
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
    this.draw()
    this.update(timestamp)
    window.requestAnimationFrame(this.run)
  }

  /**
   * Inicia o jogo criando os
   * itens principais para jogar.
   */
  init = () => {
    this.addEvents()
    console.log("Starting Game!!!")
    this.run()
  }
}
