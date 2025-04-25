class ShooterPlant extends Plant {
  bullets = []
  fireTimer = 0
  timeToFire = 100
  damage = 1
  hasZombieInLine = false
  canShoot = true

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
      this.hasZombieInLine = true // Marca que há zumbis na linha
    }
  }

  updateShooting() {
    if (this.hasZombieInLine) {
      this.fireTimer += 1

      if (this.fireTimer >= this.timeToFire) {
        this.bullets.push(
          new Bullet(this.x + this.width, this.y + this.height / 4)
        )
        this.fireTimer = 0
      }
    }
    this.hasZombieInLine = false // Reseta para o próximo frame
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
