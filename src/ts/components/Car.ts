import * as PIXI from 'pixi.js'
import { MainScene } from '../scenes/MainScene'

const COLORS_TEXTURE = {
  yellow: 'assets/car/car_color_yellow.png',
  green: 'assets/car/car_color_green.png',
  blue: 'assets/car/car_color_blue.png',
}

const DESIGN_TEXTURE = {
  red: 'assets/car/design_1.png',
  blue: 'assets/car/design_2.png',
}

const BASE_TEXTURE = 'assets/car/car.png'

export class Car {
  public container: PIXI.Container

  private readonly car: PIXI.Sprite
  private readonly carColor: PIXI.Sprite
  private readonly design: PIXI.Sprite

  private scene: MainScene

  constructor(config: { scene: MainScene }) {
    this.container = new PIXI.Container()
    this.container.position.set(500, 1700)

    this.carColor = PIXI.Sprite.from(COLORS_TEXTURE.yellow)
    this.carColor.anchor.set(0.5)
    this.container.addChild(this.carColor)

    this.design = PIXI.Sprite.from(DESIGN_TEXTURE.blue)
    this.design.anchor.set(0.5)
    this.container.addChild(this.design)

    this.car = PIXI.Sprite.from(BASE_TEXTURE)
    this.car.anchor.set(0.5, 0.48)
    this.container.addChild(this.car)

    this.container.scale.set(0.6)

    // const g = new PIXI.Graphics()
    // g.beginFill(0xDE3249, 1)
    // g.drawCircle(0, 0, 50)
    // g.endFill()
    // this.container.addChild(g)

    this.scene = config.scene
  }

  public moveLeft(dx: number) {
    const newX = this.scene.checkBorderLeft(this.container.position.x - dx)

    this.container.position.x = newX
  }

  public moveRight(dx: number) {
    const newX = this.scene.checkBorderRight(this.container.position.x + dx)

    this.container.position.x = newX
  }
}
