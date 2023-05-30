import { BaseEntity } from './BaseEntity'
import * as PIXI from 'pixi.js'
import Move from '../animations/Move'
import Scale from '../animations/Scale'

const FORMS = {
  cone: 'cone',
  sphere: 'sphere',
  tor: 'tor',
  // cube: 'cube',
  // cylinder: 'cylinder',
}

const COLORS = {
  blue: 'blue',
  green: 'green',
  orange: 'orange',
  pink: 'pink',
  yellow: 'yellow',
}

export class Figure extends BaseEntity {

  public isEnable: boolean
  public animation: Move

  constructor(config: { x: number, y: number, isRandom: boolean }) {
    super({ image: 'assets/figures/cone_yellow.png' })

    const form: string = this.getRandomItem(FORMS)
    const color: string = this.getRandomItem(COLORS)

    this.sprite.texture = PIXI.Texture.from(`assets/figures/${form}_${color}.png`)

    this.sprite.anchor.set(0.5)

    this.container.position.set(config.x, config.y)

    this.isEnable = true

    // const g = new PIXI.Graphics()
    // g.beginFill(0xDE3249, 1)
    // g.drawCircle(0, 0, 30)
    // g.endFill()
    // this.container.addChild(g)
  }

  private getRandomItem(object: object) {
    const randomIndex = Math.floor(Math.random() * Object.keys(object).length)

    const forms = Object.keys(object)

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
