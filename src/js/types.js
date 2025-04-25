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
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {string} color
 * @property {Cell[][]} grid
 *
 */

/** Sol
 * @typedef {Object} Sun
 * @property {number} x - posição x no plano
 * @property {number} y - posição y no plano
 * @property {number} width - largura do sol
 * @property {number} height - altura do sol
 * @property {string} color - cor
 * @property {number} SPEED - velocidade da queda
 * @property {number} VALUE - valor do sol
 */

/** Zombie
 * @typedef {Object} Zombie
 * @property {number} x - posição x no plano
 * @property {number} y - posição y no plano
 * @property {number} width - largura do zombie
 * @property {number} height - altura do zombie
 * @property {string} type - classe de zombie
 * @property {Boolean} canMove - pode se mover ou não
 * @property {number} damage - dano a planta
 * @property {number} attackTimer - contador para atacar
 * @property {number} timeToAttack - valor final do attackTimer
 * @property {Plant} targetPlant - planta que está atacando
 * @property {number} speed - velocidade do zombie
 * @property {number} life - vida do zombie
 */

/** Planta
 * @typedef {Object} Plant
 * @property {number} x - posição x no plano
 * @property {number} y - posição y no plano
 * @property {number} width - largura da planta
 * @property {number} height - altura da planta
 * @property {number} life - vida da planta
 * @property {number[2]} gridPos - posição no gramado
 * @property {Boolean} canShoot - é planta que atira?
 */

/** Planta que atira
 * @typedef {Plant} ShooterPlant
 * @property {Bullet[]} bullets - disparos da planta
 * @property {number} fireTimer - contador para atirar
 * @property {number} timerToFire - temporizador final para atirar
 * @property {number} damage - dano que causa
 * @property {Boolena} hasZombieInLine - há zombie na frente?
 * @property {Boolean} canShoot - pode atirar?
 */

/** Item
 * @typedef {Object} Item
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
 * @property {Item[]} items - coleção de itens para o painel
 * @property {Object} areaPlayerSuns - para auxiliar no desenho dos sois do jogador
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
 * @property {Item} currentPlant - planta atual
 * @property {Painel} painel - painel do jogo
 * @property {Lawn} lawn - gramado para plantar
 * @property {Wave} wave - controla as ondas de zombies
 * @property {Plant[]} plants - coleção de plantas
 * @property {Sun[]} suns - coleção de sois
 * @property {number} mySuns - quantidade de sois coletados
 * @property {number} sunTimer - temporizador para o sol nascer
 * @property {number} timerToSpawnSun - tempo limite para o sol nascer
 */
