/** Grid
 * @typedef {Object} Grid
 * @property {number} x - Posição X do item no grid.
 * @property {number} y - Posição Y do item no grid.
 * @property {number} width - Largura do item.
 * @property {number} height - Altura do item.
 */

/** Sol
 * @typedef {Object} Sol
 * @property {number} x - posição x no plano
 * @property {number} y - posição y no plano
 * @property {number} width - largura do sol
 * @property {number} height - altura do sol
 * @property {string} cor - cor
 * @property {number} velocidade - velocidade da queda
 * @property {number} valor - valor do sol
 */

/** Zombie
 * @typedef {Object} Zombie
 * @property {number} x - posição x no plano
 * @property {number} y - posição y no plano
 * @property {number} width - largura do zombie
 * @property {number} height - altura do zombie
 * @property {string} tipo - classe de zombie
 * @property {number} velocidade - velocidade do zombie
 * @property {number} vida - vida do zombie
 */

/** Planta
 * @typedef {Object} Planta
 * @property {number} x - posição x no plano
 * @property {number} y - posição y no plano
 * @property {number} width - largura da planta
 * @property {number} height - altura da planta
 * @property {string} tipo - classe de planta
 * @property {number} timerFire - temporizador para o ataque
 * @property {Object} fireObj - objeto de ataque
 */

/** Item
 * @typedef {Object} Item
 * @property {number} x - posição x no plano
 * @property {number} y - posição y no plano
 * @property {number} width - largura do item
 * @property {number} height - altura do item
 * @property {string} nome - nome para o item
 * @property {number} custo - valor para o item
 */

/** Painel
 * @typedef {Object} Painel
 * @property {number} x - posição x no plano
 * @property {number} y - posição y no plano
 * @property {number} width - largura do painel
 * @property {number} height - altura do painel
 * @property {string} corFundo - cor para o fundo do painel
 * @property {Item[]} items - coleção de itens para o painel
 */

/** Game
 * @typedef {Object} Game
 * @property {HTMLCanvasElement} cnv - elemento canvas
 * @property {CanvasRenderingContext2D} ctx - contexto do canvas
 * @property {Object} mouseEstados - estados do mouse
 * @property {number} mouseEstadoAtual - estado atual do mouse
 * @property {number[2]} mousePos - posição do mouse X e Y
 * @property {Object} gameEstados - estados do jogo
 * @property {number} gameEstadoAtual - estado atual do jogo
 * @property {Item} plantaAtual - planta atual
 * @property {Painel} painel - painel do jogo
 * @property {Grid[][]} grid - coleção de grids
 * @property {Planta[]} plantas - coleção de plantas
 * @property {Zombie[]} zombies - coleção de zombies
 * @property {Sol[]} sois - coleção de sols
 * @property {number} meusSois - quantidade de sols
 * @property {number} timerSol - temporizador para o sol
 */
