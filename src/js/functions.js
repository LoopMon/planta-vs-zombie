/// <reference path="./types.js" />

/**
 * Cria o gramado onde vamos plantar as plantas.
 *
 * @param {Painel} painel - painel para posicionar o gramado abaixo dele
 * @param {HTMLCanvasElement} cnv - elemento canvas
 * @param {number[2]} dim - linhas x colunas
 * @param {number[2]} dimCells - largura e altura de cada célula do grid
 * @returns {Cells[][]} grid posicionado abaixo do painel
 */
function createLawn(painel, cnv, dim = [5, 10], dimCells = [70, 80]) {
  const grid = []
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
        grid[i].push(
          new Cell(
            dimCells[0] * j + gap,
            painelArea * (i + 1) + gap,
            dimCells[0] - gap,
            Math.min(dimCells[1], Math.floor(areaForGrids / dim[0]) - gap),
            "#228b22"
          )
        )
      } else {
        grid[i].push(
          new Cell(
            dimCells[0] * j + gap,
            grid[i - 1][j].y + grid[i - 1][j].height + gap,
            dimCells[0] - gap,
            Math.min(dimCells[1], Math.floor(areaForGrids / dim[0]) - gap),
            "#228b22"
          )
        )
      }
    }
  }

  const lawn = new Lawn(painel, cnv, "#0a5c0a", grid)

  return lawn
}

/**
 * Cria os itens do painel.
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
