import { GameScreen } from "./GameScreens/GameScreen.js"
import { HomeScreen } from "./GameScreens/HomeScreen.js"
import { LevelsScreen } from "./GameScreens/LevelsScreen.js"
import { SettingsScreen } from "./GameScreens/SettingsScreen.js"
import { CreditsScreen } from "./GameScreens/CreditsScreen.js"
import { COLORS, CONTROLS } from "../constants.js"

export class Game {
  gameScreens = {
    START_SCREEN: 0, // pode ser uma tela de loading, pensando ainda
    HOME: new HomeScreen("HOME", this),
    LEVELS: new LevelsScreen("LEVELS", this),
    SETTINGS: new SettingsScreen("SETTINGS", this),
    CREDITS: new CreditsScreen("CREDITS", this),
    GAME: new GameScreen("GAME", this),
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

  /**
   * Limpa a tela do canvas.
   */
  clearCanvas = () => {
    this.ctx.fillStyle = COLORS.RGB_WHITE
    this.ctx.fillRect(0, 0, this.cnv.width, this.cnv.height)
  }

  /**
   * Troca a tela atual do game por uma nova.
   */
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
    document.addEventListener("click", () => {
      this.currentGameScreen.handleClick(this.mousePos)
    })

    document.addEventListener("keyup", (event) => {
      this.currentGameScreen.handleKeyUp(event.key)
    })

    document.addEventListener("mousemove", (event) => {
      this.mousePos = [event.clientX, event.clientY]
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
