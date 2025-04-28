import { Rectangle } from "./Rectangle.js"
import { ZOMBIE } from "../constants.js"

/**
 * Classe que representa um zumbi no jogo.
 *
 * Herda da classe Rectangle e é responsável pelo comportamento dos zumbis.
 *
 * @extends Rectangle
 * @property {boolean} canMove - Indica se o zumbi pode se mover
 * @property {boolean} canAttack - Indica se o zumbi pode atacar
 * @property {number} speed - Velocidade de movimento do zumbi (pixels por frame)
 * @property {number} life - Vida atual do zumbi
 * @property {number} damage - Dano causado pelo zumbi em cada ataque
 * @property {Plant|null} targetPlant - Planta alvo do zumbi (null se nenhum alvo)
 * @property {number} currentTime - Timestamp do último ataque
 * @property {number} timeToAttack - Intervalo entre ataques (em milissegundos)
 */
export class Zombie extends Rectangle {
  canMove = true
  canAttack = false
  speed = ZOMBIE.SPEED
  life = ZOMBIE.LIFE
  damage = ZOMBIE.DAMAGE
  targetPlant = null
  currentTime = 0
  timeToAttack = ZOMBIE.TIME_TO_ATTACK

  /**
   * Cria uma nova instância de Zombie
   * @param {number} x - Posição X inicial
   * @param {number} y - Posição Y inicial
   * @param {number} width - Largura do zumbi
   * @param {number} height - Altura do zumbi
   */
  constructor(x, y, width, height) {
    super(x, y, width, height, "red")
  }

  /**
   * Atualiza o estado do zumbi e verifica se é hora de atacar novamente.
   *
   * @param {number} timestamp - O timestamp atual do jogo em milissegundos
   */
  update(timestamp) {
    if (this.targetPlant !== null) {
      if (timestamp - this.currentTime > this.timeToAttack) {
        this.currentTime = timestamp
        this.canAttack = true
      }
    }
  }

  /**
   * Move o zumbi para a esquerda (em direção às plantas)
   */
  move() {
    if (!this.canMove) return
    super.move(-this.speed, 0)
  }

  /**
   * Verifica colisão com uma planta e define-a como alvo se houver contato.
   *
   * @param {Plant} plant - A planta a ser verificada como alvo
   */
  plantDetection(plant) {
    if (!this.isCollidingWith(plant)) {
      if (this.targetPlant === plant) {
        this.canMove = true
        this.targetPlant = null
      }
      return
    }

    this.canMove = false
    this.targetPlant = plant
    this.attackPlant(plant)
  }

  /**
   * Realiza um ataque à planta alvo, causando dano.
   *
   * @param {Plant} plant - A planta a ser atacada
   */
  attackPlant(plant) {
    if (!this.canAttack) return

    plant.life -= this.damage
    if (plant.life <= 0 || !this.isCollidingWith(plant)) {
      this.canMove = true
      this.targetPlant = null
    }
    console.log("atacou")
    this.canAttack = false
  }

  /**
   * Reduz a vida do zumbi quando ele sofre dano.
   *
   * @param {number} plantDamage - Quantidade de dano a ser aplicado
   */
  takeDamage(plantDamage) {
    this.life -= plantDamage
  }
}
