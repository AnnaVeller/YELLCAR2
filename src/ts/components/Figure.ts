import { BaseEntity } from './BaseEntity'
import * as PIXI from 'pixi.js'
import Move from '../animations/Move'
import Scale from '../animations/Scale'

const FORMS = {
  cone: 'cone',
  cube: 'cube',
  cylinder: 'cylinder',
  sphere: 'sphere',
  tor: 'tor',
}

export class Figure extends BaseEntity {

  public isEnable: boolean
  public animation: Move

  constructor(config: { x: number, y: number, isRandom: boolean }) {
    super({ image: 'assets/cone.png' })

    const form: string = this.getRandomItem()

    this.sprite.texture = PIXI.Texture.from(`assets/${form}.png`)

    this.container.position.set(config.x, config.y)

    this.isEnable = true
  }

  private getRandomItem() {
    const randomIndex = Math.floor(Math.random() * Object.keys(FORMS).length)

    const forms = Object.keys(FORMS)

    const item: string = forms[randomIndex]

    return item
  }

  public captureAnimate(cord: { x: number, y: number }) {
    if (this.animation) this.animation.stop()

    new Move({
      object: this.container,
      to: { x: cord.x, y: cord.y },
      duration: 0.1,
      onComplete: this.destroy.bind(this),
    }).start()

    new Scale({
      object: this.container,
      to: { scaleX: 0, scaleY: 0 },
      duration: 0.1,
    }).start()

    this.isEnable = false
  }

  public destroy() {
    this.container.visible = false
    this.container.destroy()
  }

}
