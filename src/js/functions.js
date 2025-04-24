/// <reference path="./types.js" />

/**
 * Cria um painel para o jogo
 *
 * @param {number} x - posição X
 * @param {number} y - posição Y
 * @param {number} width - largura
 * @param {number} height - altura
 * @param {string} backgroundColor - cor de fundo
 * @returns {Painel} retorna uma instância do Painel
 */
function createPainel(x, y, width, height, backgroundColor) {
  const painel = new Painel(x, y, width, height, backgroundColor)
  return painel
}

/**
 * Cria um sol
 *
 * @param {number} x - posição X
 * @param {number} y - posição Y
 * @returns {Sun} retorna uma instância do Sol
 */
function createSun(x, y) {
  const sun = new Sun(x, y)
  return sun
}

/**
 * Cria uma planta
 *
 * @param {number} x - posição X
 * @param {number} y - posição Y
 * @param {number} width - largura
 * @param {number} height - altura
 * @param {string} type - classe de planta
 * @returns {Plant} retorna uma instância da Planta
 */
function createPlant(x, y, width, height, type) {
  const plant = new Plant(x, y, width, height, type)
  return plant
}

/**
 * Cria um zombie
 *
 * @param {number} x - posição X
 * @param {number} y - posição Y
 * @param {number} width - largura
 * @param {number} height - altura
 * @param {string} type - classe de zombie
 * @returns {Zombie} retorna uma instância do zombie
 */
function createZombie(x, y, width, height, type) {
  const zombie = new Zombie(x, y, width, height, type)
  return zombie
}

/**
 * Cria o grid onde vamos plantar as plantas
 *
 * @param {Painel} painel - Painel do jogo
 * @param {number} dim - dimensões para o grid (Linha x Coluna)
 * @returns {Grid[][]} grid posicionado abaixo do painel
 */
function createGrid(cnv, painel, dim = [5, 10]) {
  const grid = []
  const gridWidth = 80
  const gridHeight = 90
  let painelArea = painel.y + painel.height
  let areaForGrids = cnv.height - painelArea
  let gap = 5

  if (dim[0] > 5) {
    dim[0] = 5
  }

  for (let i = 0; i < dim[0]; i++) {
    grid.push([])
    for (let j = 0; j < dim[1]; j++) {
      if (i == 0) {
        grid[i].push({
          x: gridWidth * j + gap,
          y: painelArea * (i + 1) + gap,
          width: gridWidth - gap,
          height: Math.min(gridHeight, Math.floor(areaForGrids / dim[0]) - gap),
          value: "",
        })
      } else {
        grid[i].push({
          x: gridWidth * j + gap,
          y: grid[i - 1][j].y + grid[i - 1][j].height + gap,
          width: gridWidth - gap,
          height: Math.min(gridHeight, Math.floor(areaForGrids / dim[0]) - gap),
          value: "",
        })
      }
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
function createPainelItens(painel, elements) {
  const items = []

  let gap = 10
  let posX = painel.areaPlayerSuns.x + painel.areaPlayerSuns.width + gap
  let posY = 10

  for (let i = 1; i <= elements.length; i++) {
    if (i == 1) {
      items.push({
        x: posX,
        y: posY,
        width: 80,
        height: painel.height - posY * 2,
        custo: elements[i - 1].custo,
        nome: elements[i - 1].nome,
      })
    } else {
      items.push({
        x: items[i - 2].x + items[i - 2].width + gap,
        y: posY,
        width: 80,
        height: painel.height - posY * 2,
        custo: elements[i - 1].custo,
        nome: elements[i - 1].nome,
      })
    }
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

/**
 * Função responsável por transformar números grandes
 * em strings dos números abreviados.
 *
 * Por exemplo:
 *
 * - 1000 -> 1k
 *
 * - 10000 -> 10k
 *
 * - 4000000 -> 4M
 *
 * @param {number} n - Número completo
 * @returns {string}
 */
function formatarNumero(n) {
  const casas = {
    k: [3, 4, 5],
    M: [6, 7, 8],
    B: [9, 10, 11],
    T: [12, 13, 14],
  }

  if (n >= 1000) {
    n = "" + n

    let cd = n.slice(1, n.length).length

    for (let key in casas) {
      if (casas[key].includes(cd)) {
        aux = +("1e" + casas[key][0])
        n = +n
        n = (n / aux).toFixed(2)
        n = n + key
        break
      }
    }
    return n
  }

  return n
}
