import { Zombie } from "./Zombie.js"
import { COLORS, ZOMBIE } from "../../constants.js"

/**
 * Classe que controla as ondas de zumbis no jogo.
 *
 * Responsável por spawnar, atualizar e gerenciar o comportamento dos zumbis.
 *
 * @property {Zombie[]} zombies - Array contendo todos os zumbis ativos
 * @property {number} zombiesRound - Contador de zumbis spawnados na rodada atual
 * @property {number} maxZombiesPerRound - Número máximo de zumbis por rodada
 * @property {number} round - Número da rodada atual
 * @property {number} currentTime - Timestamp do último spawn
 * @property {number} timeToSpawnZombie - Intervalo entre spawns de zumbis (ms)
 * @property {boolean} canSpawn - Flag que indica se pode spawnar novo zumbi
 * @property {number[]} gridRowsPos - Posições Y das linhas do gramado para spawn
 */
export class Wave {
  zombies = []
  zombiesRound = 0
  maxZombiesPerRound = 20
  round = 0
  currentTime = 0
  timeToSpawnZombie = ZOMBIE.TIME_TO_SPAWN
  canSpawn = false

  /**
   * Cria uma nova instância de Wave.
   *
   * @param {number[]} gridRowsPos - Array com posições Y das linhas do gramado (Lawn)
   */
  constructor(gridRowsPos) {
    this.gridRowsPos = gridRowsPos
  }

  /**
   * Atualiza o estado da onda e dos zumbis.
   *
   * @param {number} timestamp - Timestamp atual do jogo
   */
  update(timestamp) {
    if (timestamp - this.currentTime > this.timeToSpawnZombie) {
      this.currentTime = timestamp
      this.canSpawn = true
    }

    this.zombies.forEach((zombie) => zombie.update(timestamp))
  }

  /**
   * Desenha todos os zumbis na tela.
   *
   * @param {CanvasRenderingContext2D} ctx - Contexto de renderização do canvas
   */
  drawZombies(ctx) {
    this.zombies.forEach((zombie) => {
      zombie.drawRect(ctx)
      zombie.drawStroke(ctx, COLORS.RGB_BLACK)
    })
  }

  /**
   * Move todos os zumbis ativos.
   */
  moveZombies() {
    this.zombies.forEach((zombie) => {
      zombie.move()
    })
  }

  /**
   * Gerencia os ataques dos zumbis às plantas.
   *
   * @param {Plant[]} plants - Coleção de plantas no jogo
   */
  attackPlants(plants) {
    this.zombies.forEach((zombie) => {
      const plantsCopy = [...plants]

      plantsCopy.forEach((plant) => {
        zombie.plantDetection(plant)

        if (plant.life <= 0) {
          // Antes de remover a planta, liberamos todos os zombies que a estavam atacando
          this.zombies.forEach((z) => {
            if (z.targetPlant === plant) {
              z.canMove = true
              z.targetPlant = null
            }
          })

          // Removemos a planta do array original
          const realIndex = plants.indexOf(plant)
          if (realIndex !== -1) {
            plants.splice(realIndex, 1)
          }
        }
      })
    })
  }

  /**
   * Spawna um novo zumbi em posição aleatória.
   */
  spawnZombie() {
    if (this.canSpawn && this.zombiesRound < this.maxZombiesPerRound) {
      this.zombies.push(
        new Zombie(
          window.innerWidth,
          this.gridRowsPos[Math.floor(Math.random() * this.gridRowsPos.length)],
          ZOMBIE.WIDTH,
          ZOMBIE.HEIGHT
        )
      )
      this.zombiesRound += 1
      this.canSpawn = false
    }
  }

  /**
   * Remove zumbis mortos da coleção.
   */
  checkZombiesLife() {
    this.zombies = this.zombies.filter((zombie) => zombie.life > 0)
  }
}
