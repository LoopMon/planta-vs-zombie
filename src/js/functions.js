/// <reference path="./types.js" />

import { Cell } from "./classes/Cell.js"
import { Lawn } from "./classes/Lawn.js"
import { MenuItem } from "./classes/MenuItem.js"
import { GAME, COLORS, LAWN, PAINEL } from "./constants.js"

/**
 * Cria o gramado onde vamos plantar as plantas.
 *
 * @param {Painel} painel - painel para posicionar o gramado abaixo dele
 * @param {HTMLCanvasElement} cnv - elemento canvas para cálculo da proporção das células
 * @param {number[2]} dim - linhas x colunas
 * @returns {Cell[][]} grid posicionado abaixo do painel
 */
export function createLawn(painel, cnv, dim = [5, 10]) {
  const grid = []
  let painelArea = painel.getBottom()
  let areaForGrids = cnv.height - painelArea
  let gap = LAWN.CELL_GAP

  if (dim[0] > 5) {
    dim[0] = 5
  }

  for (let i = 0; i < dim[0]; i++) {
    grid.push([])
    for (let j = 0; j < dim[1]; j++) {
      if (i == 0) {
        grid[i].push(
          new Cell(
            LAWN.CELL_WIDTH * j + gap,
            painelArea * (i + 1) + GAME.PAINEL_LAWN_GAP,
            LAWN.CELL_WIDTH - gap,
            Math.min(LAWN.CELL_HEIGHT, Math.floor(areaForGrids / dim[0]) - gap),
            COLORS.RGB_FOREST_GREEN
          )
        )
      } else {
        grid[i].push(
          new Cell(
            LAWN.CELL_WIDTH * j + gap,
            grid[i - 1][j].y + grid[i - 1][j].height + gap,
            LAWN.CELL_WIDTH - gap,
            Math.min(LAWN.CELL_HEIGHT, Math.floor(areaForGrids / dim[0]) - gap),
            COLORS.RGB_FOREST_GREEN
          )
        )
      }
    }
  }

  const lawn = new Lawn(painel, cnv, COLORS.RGB_DARK_GREEN, grid)

  return lawn
}

/**
 * Cria os itens do painel com as posições de acordo com o painel.
 *
 * @param {Painel} painel - Painel do jogo
 * @param {Object[]} items - Elementos para o painel
 * @returns {Item[]} retorna uma coleção de itens
 */
export function createPainelItems(painel, items) {
  const menuItems = []

  let gapX = PAINEL.ITEM_GAP
  let gapY = PAINEL.ITEM_GAP

  for (let i = 0, len = items.length; i < len; i++) {
    if (i !== 0) gapX *= i + 1
    const menuItem = new MenuItem(
      PAINEL.ITEM_SCALE * i + gapX,
      gapY,
      PAINEL.ITEM_SCALE,
      painel.height - gapY * 2,
      items[i].name,
      items[i].cust
    )
    menuItems.push(menuItem)
    gapX = PAINEL.ITEM_GAP
  }

  return menuItems
}

/**
 * Permite identificar se o mouse passou
 * por cima de um objeto.
 *
 * @param {number[2]} mouse - posições do mouse no plano
 * @param {Object} obj - objeto do plano
 * @returns {boolean}
 */
export function detectMouseCollision(mouse, obj) {
  return (
    mouse[0] >= obj.x &&
    mouse[0] <= obj.x + obj.width &&
    mouse[1] >= obj.y &&
    mouse[1] <= obj.y + obj.height
  )
}
