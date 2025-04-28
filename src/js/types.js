/** Retângulo
 * @typedef {Object} Rectangle
 * @property {number} x - Posição X do Retangulo
 * @property {number} y - Posição Y do Retangulo
 * @property {number} width - Largura
 * @property {number} height - Altura
 * @property {string} color - cor
 */

/** Cell
 * @typedef {Object} Cell
 * @property {number} x - Posição X da célula no grid
 * @property {number} y - Posição Y da célula no grid
 * @property {number} width - Largura da célula
 * @property {number} height - Altura da célula
 * @property {Plant} content - conteúdo da célula
 */

/** Gramado
 * @typedef {Object} Lawn
 * @property {number} x - Posição X do gramado no canvas
 * @property {number} y - Posição Y do gramado no canvas
 * @property {number} width - Largura do gramado
 * @property {number} height - Altura do gramado
 * @property {string} color - cor de fundo para o gramado
 * @property {Cell[][]} grid - Matriz de Células para plantar
 *
 */

/** Sol
 * @typedef {Object} Sun
 * @property {number} x - posição x no plano
 * @property {number} y - posição y no plano
 * @property {number} width - largura do sol
 * @property {number} height - altura do sol
 * @property {string} color - cor
 * @property {number} speed - velocidade da queda
 * @property {number} value - valor do sol
 */

/** Zombie
 * @typedef {Object} Zombie
 * @property {number} x - posição x no plano
 * @property {number} y - posição y no plano
 * @property {number} width - largura do zombie
 * @property {number} height - altura do zombie
 * @property {boolean} canMove - diz se pode mover-se
 * @property {boolean} canAttack - diz se pode atacar
 * @property {number} damage - dano a planta
 * @property {Plant} targetPlant - planta que está atacando
 * @property {number} speed - velocidade do zombie
 * @property {number} life - vida do zombie
 * @property {number} currentTime - contador para atacar
 * @property {number} timeToAttack - temporizador final para atacar
 */

/** Planta
 * @typedef {Object} Plant
 * @property {number} x - posição x no plano
 * @property {number} y - posição y no plano
 * @property {number} width - largura da planta
 * @property {number} height - altura da planta
 * @property {number} life - vida da planta
 * @property {number[2]} gridPos - posição no gramado
 * @property {Boolean} canShoot - diz se é uma planta que atira
 */

/** Planta que atira
 * @typedef {Plant} ShooterPlant
 * @property {Bullet[]} bullets - disparos da planta
 * @property {number} currentTime - contador para atirar
 * @property {number} timeToFire - temporizador final para atirar
 * @property {number} damage - dano que causa
 * @property {Boolena} hasZombieInLine - diz se tem zombie na frente
 * @property {Boolean} canShoot - diz se pode atirar
 */

/** MenuItem
 * @typedef {Object} MenuItem
 * @property {number} x - posição x no plano
 * @property {number} y - posição y no plano
 * @property {number} width - largura do item
 * @property {number} height - altura do item
 * @property {string} name - nome para o item
 * @property {number} cust - valor para o item
 */

/** Painel
 * @typedef {Object} Painel
 * @property {number} x - posição x no plano
 * @property {number} y - posição y no plano
 * @property {number} width - largura do painel
 * @property {number} height - altura do painel
 * @property {string} backgroundColor - cor para o fundo do painel
 * @property {MenuItem[]} items - coleção de itens para o painel
 */

/** SunManager
 * @typedef {Object} SunManager
 * @property {number} currentTime - tempo atual
 * @property {number} timeToSpawn - tempo final para criar o sol
 * @property {Sun[]} suns - coleção de sois
 * @property {boolean} canSpawn - diz se pode criar um sol
 */

/** Game
 * @typedef {Object} Game
 * @property {HTMLCanvasElement} cnv - elemento canvas
 * @property {CanvasRenderingContext2D} ctx - contexto do canvas
 * @property {Object} mouseFlags - estados do mouse
 * @property {Object} gameFlags - estados do jogo
 * @property {number} mouseState - estado atual do mouse
 * @property {number} gameState - estado atual do jogo
 * @property {number[2]} mousePos - posição do mouse X e Y
 * @property {MenuItem} currentPlant - planta atual
 * @property {Painel} painel - painel do jogo
 * @property {Lawn} lawn - gramado para plantar
 * @property {Wave} wave - controla as ondas de zombies
 * @property {Plant[]} plants - coleção de plantas
 * @property {SunManager} sunManager - controla a criação de sois
 * @property {number} mySuns - quantidade de sois coletados
 */
