import * as PIXI from 'pixi.js'

export class Plant {

  public container: PIXI.Container
  private sprite: PIXI.Sprite

  constructor(config: { x: number, y: number }) {

    const num = this.randomInteger(1, 4)
    this.sprite = PIXI.Sprite.from(`assets/plant_${num}.png`)

    this.sprite.angle = this.randomInteger(-90, 90)
    this.sprite.scale.set(0.9)
    this.sprite.alpha = this.randomInteger(4, 9) / 10
    this.sprite.anchor.set(0.5)

    this.container = new PIXI.Container()
    this.container.position.set(config.x, config.y)
    this.container.addChild(this.sprite)
  }

  private randomInteger(min: number, max: number) {
    let rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand)
  }

  public destroy() {
    this.container.destroy()
  }

}
