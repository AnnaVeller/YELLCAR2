import * as PIXI from 'pixi.js'
import { Car } from '../components/Car'

export class HandControl {
  public container: PIXI.Container
  private readonly rect: PIXI.Sprite
  private isPush: boolean
  private cords: { x: number, y: number } | null
  private object: Car

  constructor(config: { object: Car }) {
    this.container = new PIXI.Container()

    this.rect = PIXI.Sprite.from('assets/rect.png')
    this.rect.tint = 0xff0000
    this.container.scale.set(90)
    this.container.position.set(-1900, 0)
    this.container.alpha = 0.01
    this.container.addChild(this.rect)

    this.rect.interactive = true

    this.rect
      .on('pointerdown', (event) => this.onPointerDown(event.global))
      .on('pointermove', (event) => this.onPointerMove(event.global))
      .on('pointerup', (event) => this.onPointerUp(event.global))
      .on('pointerout', (event) => this.onPointerOut(event.global))

    this.isPush = false

    this.object = config.object
  }

  private setCords(point: PIXI.Point) {
    this.cords = { x: point.x, y: point.y }
  }

  private onPointerDown(point: PIXI.Point) {
    this.isPush = true
    this.setCords(point)
  }

  private onPointerMove(point: PIXI.Point) {
    if (!this.isPush) return

    const dx = this.cords.x - point.x

    const ds = dx * 1.5

    if (dx > 0) {
      this.object.moveLeft(ds)
    } else {
      this.object.moveRight(-ds)
    }

    this.setCords(point)
  }

  private onPointerUp(point: PIXI.Point) {
    this.isPush = false
  }

  private onPointerOut(point: PIXI.Point) {
    this.isPush = false
  }

}
