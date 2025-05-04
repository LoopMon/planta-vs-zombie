import { Rectangle } from "../../Rectangle.js"

export class ImageElement extends Rectangle {
  constructor(rect, src, spriteOptions = {}) {
    super(rect.x, rect.y, rect.width, rect.height, rect.color)
    this.img = new Image()
    this.img.src = src
    this.loaded = false

    this.sprite = {
      frameWidth: spriteOptions.frameWidth || rect.width, // Largura de cada frame
      frameHeight: spriteOptions.frameHeight || rect.height, // Altura de cada frame
      totalFrames: spriteOptions.totalFrames || 1, // Número total de frames
      currentFrame: 0, // Frame atual
      frameSpeed: spriteOptions.frameSpeed || 5, // Velocidade da animação
      frameCount: 0, // Contador interno para controle
      loop: spriteOptions.loop !== undefined ? spriteOptions.loop : true,
      isPlaying: true,
    }

    this.img.onload = () => {
      this.loaded = true
      if (!spriteOptions.frameWidth) this.sprite.frameWidth = this.img.width
      if (!spriteOptions.frameHeight) this.sprite.frameHeight = this.img.height
    }
  }

  draw(ctx) {
    if (!this.loaded) return
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(
      this.img,
      this.sprite.currentFrame * this.sprite.frameWidth, // Posição X do frame no spritesheet
      0, // Posição Y do frame no spritesheet (assumindo animação horizontal)
      this.sprite.frameWidth, // Largura do frame de origem
      this.sprite.frameHeight, // Altura do frame de origem
      this.x, // Posição X no canvas
      this.y, // Posição Y no canvas
      this.width, // Largura de exibição
      this.height // Altura de exibição
    )
  }

  update() {
    if (!this.loaded || !this.sprite.isPlaying || this.sprite.totalFrames <= 1)
      return

    // Avança o frame conforme a velocidade
    this.sprite.frameCount += 1
    if (this.sprite.frameCount >= this.sprite.frameSpeed) {
      this.sprite.frameCount = 0
      this.sprite.currentFrame += 1

      // Verifica se a animação terminou
      if (this.sprite.currentFrame >= this.sprite.totalFrames) {
        if (this.sprite.loop) {
          this.sprite.currentFrame = 0 // Reinicia a animação
        } else {
          this.sprite.currentFrame = this.sprite.totalFrames - 1 // Mantém no último frame
          this.sprite.isPlaying = false // Para a animação
        }
      }
    }
  }

  // Métodos adicionais para controle da animação
  play() {
    this.sprite.isPlaying = true
  }

  pause() {
    this.sprite.isPlaying = false
  }

  reset() {
    this.sprite.currentFrame = 0
    this.sprite.frameCount = 0
  }

  setFrame(frame) {
    if (frame >= 0 && frame < this.sprite.totalFrames) {
      this.sprite.currentFrame = frame
    }
  }
}
