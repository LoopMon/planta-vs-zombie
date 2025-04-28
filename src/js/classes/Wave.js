import { Zombie } from "./Zombie.js"
import { COLORS, ZOMBIE } from "../constants.js"

export class Wave {
  zombies = []
  zombiesRound = 0
  maxZombiesPerRound = 2
  round = 0
  spawnTimer = 0
  timeToSpawnZombie = 100

  constructor(gridRowsPos) {
    this.gridRowsPos = gridRowsPos
  }

  update(timestamp) {
    this.zombies.forEach((zombie) => zombie.update(timestamp))
  }

  drawZombies(ctx) {
    this.zombies.forEach((zombie) => {
      zombie.drawRect(ctx)
      zombie.drawStroke(ctx, COLORS.RGB_BLACK)
    })
  }

  moveZombies() {
    this.zombies.forEach((zombie) => {
      zombie.move()
    })
  }

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

  spawnZombie() {
    this.spawnTimer += 1

    if (
      this.spawnTimer >= this.timeToSpawnZombie &&
      this.zombiesRound < this.maxZombiesPerRound
    ) {
      this.zombies.push(
        new Zombie(
          window.innerWidth,
          this.gridRowsPos[Math.floor(Math.random() * this.gridRowsPos.length)],
          ZOMBIE.WIDTH,
          ZOMBIE.HEIGHT
        )
      )
      this.zombiesRound += 1
      this.spawnTimer = 0
    }
  }

  checkZombiesLife() {
    this.zombies = this.zombies.filter((zombie) => zombie.life > 0)
  }
}
