/** Retângulo
 * @typedef {Object} Retangulo
 * @property {number} x - Posição X do Retangulo.
 * @property {number} y - Posição Y do Retangulo.
 * @property {number} width - Largura.
 * @property {number} height - Altura.
 */

/** Grid
 * @typedef {Object} Grid
 * @property {number} x - Posição X do item no grid.
 * @property {number} y - Posição Y do item no grid.
 * @property {number} width - Largura do item.
 * @property {number} height - Altura do item.
 * @property {string} value - item no grid.
 */

/** Sol
 * @typedef {Object} Sol
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
 * @property {string} type - classe de zombie
 * @property {number} speed - velocidade do zombie
 * @property {number} life - vida do zombie
 */

/** Planta
 * @typedef {Object} Planta
 * @property {number} x - posição x no plano
 * @property {number} y - posição y no plano
 * @property {number} width - largura da planta
 * @property {number} height - altura da planta
 * @property {string} type - classe de planta
 * @property {number} timerToFire - temporizador para o ataque
 * @property {Object} fireObj - objeto de ataque
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
 */

/** Game
 * @typedef {Object} Game
 * @property {HTMLCanvasElement} cnv - elemento canvas
 * @property {CanvasRenderingContext2D} ctx - contexto do canvas
 * @property {Object} mouseFlags - estados do mouse
 * @property {number} mouseState - estado atual do mouse
 * @property {Object} gameFlags - estados do jogo
 * @property {number} gameState - estado atual do jogo
 * @property {number[]} mousePos - posição do mouse X e Y
 * @property {Item} currentPlant - planta atual
 * @property {Painel} painel - painel do jogo
 * @property {Grid[][]} grid - coleção de grids
 * @property {Planta[]} plants - coleção de plantas
 * @property {Zombie[]} zombies - coleção de zombies
 * @property {Sol[]} suns - coleção de sois
 * @property {number} mySuns - quantidade de sois coletados
 * @property {number} sunTimer - temporizador para o sol nascer
 * @property {number} timerToSpawnSun - tempo limite para o sol nascer
 */
