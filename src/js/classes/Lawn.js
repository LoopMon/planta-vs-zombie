import { Rectangle } from "./Rectangle.js"

export class Lawn extends Rectangle {
  constructor(painel, cnv, color, grid) {
    super(0, painel.height, cnv.width, cnv.height - painel.height, color)
    this.grid = grid
  }

  drawRect(ctx) {
    super.drawRect(ctx)
    this.drawCells(ctx)
  }

  drawCells(ctx) {
    this.grid.forEach((row) => {
      row.forEach((col) => {
        col.drawRect(ctx)
      })
    })
  }

  canPlantHere(gridPos) {
    return !this.grid[gridPos[0]][gridPos[1]].content
  }

  addPlant(row, col, plant) {
    if (this.grid[row][col].content === null) {
      this.grid[row][col].content = plant
      plant.gridPos = [row, col]
      return true
    }
    return false
  }

  removePlant(row, col) {
    if (
      this.grid[row] &&
      this.grid[row][col] &&
      this.grid[row][col].content !== null
    ) {
      const plant = this.grid[row][col].content
      this.grid[row][col].content = null
      return plant
    }
    return null
  }
}
