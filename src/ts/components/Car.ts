import * as PIXI from 'pixi.js'
import Move from '../animations/Move'
import { MainScene } from '../scenes/MainScene'

const COLORS_TEXTURE = {
  yellow: 'assets/car_color_yellow.png',
  green: 'assets/car_color_green.png',
  blue: 'assets/car_color_blue.png',
}

const DESIGN_TEXTURE = {
  red: 'assets/design_1.png',
  blue: 'assets/design_2.png',
}

const BASE_TEXTURE = 'assets/car.png'

const SPEED = 50

export class Car {
  public container: PIXI.Container

  private readonly car: PIXI.Sprite
  private readonly carColor: PIXI.Sprite
  private readonly design: PIXI.Sprite

  private animation: Move
  private scene: MainScene

  constructor(config: { scene: MainScene }) {
    this.container = new PIXI.Container()
    this.container.position.set(500, 1500)

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

    this.scene = config.scene
  }

  private launchAnimation(x: number, y: number) {
    if (this.animation) this.animation.stop()

    this.animation = new Move({
      object: this.container,
      to: { x, y },
      duration: 0.08,
    }).start()
  }

  private move(dx: number, dy: number) {
    let newX = this.container.position.x + dx
    let newY = this.container.position.y + dy;

    ({ x: newX, y: newY } = this.scene.checkBorders(newX, newY))

    this.launchAnimation(newX, newY)
  }

  public moveLeft() {
    this.move(-SPEED, 0)
  }

  public moveRight() {
    this.move(SPEED, 0)
  }

  public moveUp() {
    this.move(0, -SPEED)
  }

  public moveDown() {
    this.move(0, SPEED)
  }
}
