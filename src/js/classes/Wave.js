class Wave {
  zombies = []
  zombiesRound = 0
  maxZombiesPerRound = 8
  round = 0
  spawnTimer = 0
  timeToSpawnZombie = 100

  constructor(gridRowsPos) {
    this.gridRowsPos = gridRowsPos
  }

  drawZombies(ctx) {
    this.zombies.forEach((zombie) => {
      zombie.drawRect(ctx)
    })
  }

  updateZombies() {
    this.zombies.forEach((zombie) => {
      zombie.move()
    })
  }

  spawnZombie() {
    this.spawnTimer += 1

    if (
      this.spawnTimer >= this.timeToSpawnZombie &&
      this.zombiesRound < this.maxZombiesPerRound
    ) {
      this.zombies.push(
        createZombie(
          window.innerWidth,
          this.gridRowsPos[Math.floor(Math.random() * this.gridRowsPos.length)],
          50,
          70
        )
      )
      this.zombiesRound += 1
      this.spawnTimer = 0
      console.log("Wave: zombie spawned")
    }
  }

  init() {}
}
