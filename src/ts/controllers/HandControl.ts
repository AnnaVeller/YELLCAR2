import * as PIXI from 'pixi.js'

export class HandControl {
  public container: PIXI.Container
  private readonly rect: PIXI.Sprite
  private isPush: boolean
  private cords: { x: number, y: number } | null
  private myEmitter: PIXI.utils.EventEmitter

  constructor(config: { emitter: PIXI.utils.EventEmitter }) {
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

    this.myEmitter = config.emitter

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
    const dy = this.cords.y - point.y

    const d = 20

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > d) {

      if (dx > 0) {
        this.myEmitter.emit('left')
      } else {
        this.myEmitter.emit('right')
      }

      this.setCords(point)
      return
    }

    if (Math.abs(dx) <= Math.abs(dy) && Math.abs(dy) > d) {

      if (dy > 0) {
        this.myEmitter.emit('up')
      } else {
        this.myEmitter.emit('down')
      }

      this.setCords(point)
      return

    }

  }

  private onPointerUp(point: PIXI.Point) {
    this.isPush = false
  }

  private onPointerOut(point: PIXI.Point) {
    this.isPush = false
  }

}
