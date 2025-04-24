class Plant extends Rectangle {
  constructor(x, y, width, height, type) {
    super(x, y, width, height)
    this.type = type
    this.bullets = []
    this.fireTimer = 0
    this.timeToFire = 100
    this.types = {
      pedra: "brown",
      simples: "green",
      duplo: "purple",
    }
    this.color = this.types[type]
    this.life = 5
    this.gridPos = [0, 0] // para usar quando for remover uma planta do grid
  }

  /**
   * Desenha os disparos da planta.
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  drawFire(ctx) {
    this.bullets.forEach((bullet) => {
      bullet.drawRect(ctx)
    })
  }

  /**
   * Para cada bala presente na planta, elas se
   * moverão para a direita.
   */
  fire() {
    this.bullets.forEach((bullet) => {
      bullet.move()
    })
  }

  /**
   * Verifica se existe zombie na frente da planta.
   *
   * @param {Zombie} zombie
   */
  zombieDetection(zombie) {
    if (this.y == zombie.y) {
      this.fireTimer += 1

      if (this.fireTimer >= this.timeToFire) {
        this.bullets.push(
          new Bullet(this.x + this.width, this.y + this.height / 4)
        )
        this.fireTimer = 0
      }
    }
  }

  /**
   * Verifica as colisões dos disparos e o
   * remove se ele colidir com um `zombie`
   * ou sair da tela.
   *
   * @param {Zombie} zombie
   */
  fireColision(zombie) {
    this.bullets = this.bullets.filter((bullet) => {
      const hitZombie = bullet.isCollidingWith(zombie)
      if (hitZombie) {
        zombie.takeDamage()
        return false
      }
      return bullet.x <= window.innerWidth
    })
  }
}
