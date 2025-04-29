import { Plant } from "../Plant.js"
import { Sun } from "../Sun.js"
import { PLANT } from "../../constants.js"

/**
 * Classe que representa uma planta SunFlower (Girassol) no jogo.
 * Herda da classe Plant e é responsável por gerar sóis automaticamente.
 *
 * @extends Plant
 * @property {number} currentTime - Timestamp do último ciclo de geração de sol
 * @property {number} timeToSpawnFirstSun - Tempo necessário para gerar o primeiro sol (em milissegundos)
 * @property {number} timeToSpawnSun - Intervalo de tempo entre a geração de sóis subsequentes (em milissegundos)
 * @property {boolean} isSunFlower - Flag que identifica esta planta como um Girassol (constante)
 * @property {boolean} canSpawnSun - Indica se a planta pode gerar um sol no momento
 * @property {boolean} firstSunSpawned - Indica se o primeiro sol já foi gerado
 * @property {boolean} isActive - Indica se a planta está ativa e pode gerar sóis
 */
export class SunFlower extends Plant {
  timeToSpawnFirstSun = PLANT.TIME_TO_FIRST_SUN
  timeToSpawnSun = PLANT.TIME_TO_SUN
  isSunFlower = true
  canSpawnSun = false
  firstSunSpawned = false
  isActive = false

  /**
   * Atualiza o estado do Girassol e verifica se é hora de gerar um novo sol.
   *
   * @param {number} timestamp - O timestamp atual do jogo em milissegundos.
   */
  update(timestamp) {
    if (!this.isActive) return
    if (
      timestamp - this.currentTime > this.timeToSpawnFirstSun &&
      !this.firstSunSpawned
    ) {
      this.currentTime = timestamp
      this.canSpawnSun = true
      this.firstSunSpawned = true
      return
    }

    if (timestamp - this.currentTime > this.timeToSpawnSun) {
      this.currentTime = timestamp
      this.canSpawnSun = true
    }
  }

  /**
   * Cria um novo sol e o adiciona ao gerenciador de sóis.
   *
   * @param {SunManager} sunManager - O gerenciador de sóis do jogo.
   */
  createSun(sunManager) {
    if (!this.canSpawnSun || !this.isActive) return
    sunManager.suns.push(
      new Sun(this.x + this.width / 2, this.y + this.height, false)
    )
    this.canSpawnSun = false
  }
}
