/// <reference path="./types.js" />

/**
 * Cria um painel para o jogo
 *
 * @param {number} x - posição X
 * @param {number} y - posição Y
 * @param {number} width - largura
 * @param {number} height - altura
 * @param {string} corFundo - cor de fundo
 * @returns {Painel} retorna uma instância do Painel
 */
function createPainel(x, y, width, height, corFundo) {
  const painel = new Painel(x, y, width, height, corFundo)
  return painel
}

/**
 * Cria um sol
 *
 * @param {number} x - posição X
 * @param {number} y - posição Y
 * @param {number} width - largura
 * @param {number} height - altura
 * @returns {Sol} retorna uma instância do Sol
 */
function createSun(x, y, width, height) {
  const sol = new Sol(x, y, width, height)
  return sol
}

/**
 * Cria uma planta
 *
 * @param {number} x - posição X
 * @param {number} y - posição Y
 * @param {number} width - largura
 * @param {number} height - altura
 * @param {string} tipo - classe de planta
 * @returns {Planta} retorna uma instância da Planta
 */
function createPlant(x, y, width, height, tipo) {
  const planta = new Planta(x, y, width, height, tipo)
  return planta
}

/**
 * Cria um zombie
 *
 * @param {number} x - posição X
 * @param {number} y - posição Y
 * @param {number} width - largura
 * @param {number} height - altura
 * @param {string} tipo - classe de zombie
 * @returns {Zombie} retorna uma instância do zombie
 */
function createZombie(x, y, width, height, tipo) {
  const zombie = new Zombie(x, y, width, height, tipo)
  return zombie
}

/**
 * Cria o grid onde vamos plantar as plantas
 *
 * @param {Painel} painel - Painel do jogo
 * @param {number} dim - dimensões para o grid
 * @returns {Grid[]} grid posicionado abaixo do painel
 */
function createGrid(painel, dim) {
  const grid = []
  const deslocamento = 65
  for (let i = 0; i < dim[0]; i++) {
    grid.push([])
    for (let j = 0; j < dim[1]; j++) {
      grid[i].push({
        x: 5 + deslocamento * j,
        y: (painel.y + painel.height + 5) * (i + 1),
        width: deslocamento - 5,
        height: 80,
      })
    }
  }
  return grid
}

/**
 * Cria os itens do painel
 *
 * @param {Painel} painel - Painel do jogo
 * @param {Object[]} elementos - Elementos para o painel
 * @returns {Item[]} retorna uma coleção de itens
 */
function createPainelItens(painel, elementos) {
  const items = []
  const deslocamento = 90
  for (let i = 0; i < elementos.length; i++) {
    items.push({
      x: 5 + deslocamento * i,
      y: 5,
      width: 80,
      height: painel.height - 20,
      custo: elementos[i].custo,
      nome: elementos[i].nome,
    })
  }

  return items
}

/**
 * Permite identificar se o mouse passou
 * por cima de um objeto.
 *
 * @param {number[]} mouse - posições do mouse no plano
 * @param {Object} obj - objeto do plano
 * @returns {boolean}
 */
function detectMouseCollision(mouse, obj) {
  return (
    mouse[0] >= obj.x &&
    mouse[0] <= obj.x + obj.width &&
    mouse[1] >= obj.y &&
    mouse[1] <= obj.y + obj.height
  )
}
