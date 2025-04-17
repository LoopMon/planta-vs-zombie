/// <reference path="./types.js" />

main()

function main() {
  const cnv = document.querySelector("#cnv")
  const ctx = cnv.getContext("2d")

  if (ctx == null) {
    console.log("Contexto não encontrado!!!")
    return
  }

  const game = new Game(cnv, ctx)

  game.init()
}
