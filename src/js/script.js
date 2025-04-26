/// <reference path="./types.js" />

import { Game } from "./classes/Game.js"

main()

function main() {
  const cnv = document.querySelector("#cnv")
  const ctx = cnv.getContext("2d")

  if (ctx == null) {
    console.log("Contexto não encontrado!!!")
    return
  }

  /** @type {Game} */
  const game = new Game(cnv, ctx)

  game.init()
}
