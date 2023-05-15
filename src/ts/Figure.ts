import { BaseEntity } from './BaseEntity'
import * as PIXI from 'pixi.js'

// const FIGURES_TEXTURE = {
//   cone: 'assets/cone.png',
//   cube: 'assets/cube.png',
//   cylinder: 'assets/cylinder.png',
//   sphere: 'assets/sphere.png',
//   tor: 'assets/tor.png',
// }

const FORMS = {
  cone: 'cone',
  cube: 'cube',
  cylinder: 'cylinder',
  sphere: 'sphere',
  tor: 'tor',
}

export class Figure extends BaseEntity {

  public isEnable: boolean

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

  public eat() {
    this.container.visible = false

    this.isEnable = false
  }

  public destroy() {

    this.container.destroy()
  }

}
