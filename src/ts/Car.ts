import * as PIXI from 'pixi.js'
import Move from './animations/Move'

const COLORS_TEXTURE = {
  yellow: 'assets/car_color_yellow.png',
  green: 'assets/car_color_green.png',
  blue: 'assets/car_color_blue.png',
}

const SPEED = 50

const LEFT_BORDER = 200
const RIGHT_BORDER = 1000 - 200
const DOWN_BORDER = 1500 - 200
const UP_BORDER = 200

export class Car {
  private readonly car: PIXI.Sprite
  private readonly carColor: PIXI.Sprite
  private readonly design: PIXI.Sprite
  public container: PIXI.Container
  private animation: Move

  constructor() {
    this.container = new PIXI.Container()
    this.container.position.set(500, 800)

    this.carColor = PIXI.Sprite.from(COLORS_TEXTURE.yellow)
    this.carColor.anchor.set(0.5)
    this.container.addChild(this.carColor)

    this.design = PIXI.Sprite.from('assets/design_1.png')
    this.design.anchor.set(0.5)
    this.container.addChild(this.design)

    this.car = PIXI.Sprite.from('assets/car.png')
    this.car.anchor.set(0.5, 0.48)
    this.container.addChild(this.car)

    this.container.scale.set(0.6)
  }

  private launchAnimation(dx: number, dy: number) {
    if (this.container.position.x + dx < LEFT_BORDER ||
      this.container.position.x + dx > RIGHT_BORDER ||
      this.container.position.y + dy < UP_BORDER ||
      this.container.position.y + dy > DOWN_BORDER
    ) {
      // out of road
      return
    }

    if (this.animation) this.animation.stop()

    this.animation = new Move({
      object: this.container,
      to: { x: this.container.position.x + dx, y: this.container.position.y + dy },
      duration: 0.08,
    }).start()
  }

  public moveLeft() {
    this.launchAnimation(-SPEED, 0)
  }

  public moveRight() {
    this.launchAnimation(SPEED, 0)
  }

  public moveUp() {
    this.launchAnimation(0, -SPEED)
  }

  public moveDown() {
    this.launchAnimation(0, SPEED)
  }
}
