import { Nut } from "./Nut.js"
import { SunFlower } from "./SunFlower.js"
import { ShooterPlant } from "./ShooterPlant.js"
import { DoubleShooterPlant } from "./DoubleShooterPlant.js"
import { PLANT, COLORS } from "../../constants.js"

export class PlantManager {
  constructor(lawn, game) {
    this.lawn = lawn
    this.game = game
    this.plants = []
  }

  draw(ctx) {
    this.plants.forEach((plant) => {
      plant.drawRect(ctx)
    })

    this.plants.forEach((plant) => {
      if (plant.canShoot) plant.drawFire(ctx)
    })
  }

  update(timestamp, gameWave) {
    this.plants.forEach((plant) => {
      gameWave.zombies.forEach((zombie) => {
        if (plant.canShoot) plant.zombieDetection(zombie)
      })
    })

    this.plants.forEach((plant) => {
      plant.update(timestamp)
      if (plant.canShoot) {
        plant.fire()
        gameWave.zombies.forEach((zombie) => plant.fireColision(zombie))
      }
    })
  }

  spawns(gameSunManager) {
    this.plants.forEach((plant) => {
      if (plant.isSunFlower) {
        plant.createSun(gameSunManager)
      }
    })
  }

  addPlant(type, plantPos, gridPos) {
    if (!this.lawn.canPlantHere(gridPos)) return false

    let newPlant = null

    switch (type) {
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
    newPlant.initCycle()

    return true
  }

  removePlant(gridPos) {
    const removedPlant = this.lawn.removePlant(gridPos[0], gridPos[1])

    if (removedPlant) {
      this.plants = this.plants.filter((plant) => plant !== removedPlant)
      // Devolve parte do custo
      // this.mySuns += Math.floor(removedPlant.custo * 0.5)
    }
  }
}
