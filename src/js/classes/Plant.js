import { Rectangle } from "./Rectangle.js"
import { PLANT } from "../constants.js"

export class Plant extends Rectangle {
  life = PLANT.LIFE
  gridPos = [-1, -1]
  canShoot = false
  isSunFlower = false

  update() {}
}
