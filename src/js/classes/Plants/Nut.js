import { Plant } from "../Plant.js"
import { PLANT } from "../../constants.js"

export class Nut extends Plant {
  life = PLANT.LIFE * 3
}
