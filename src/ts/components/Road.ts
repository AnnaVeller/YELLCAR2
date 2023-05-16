import { BaseEntity } from './BaseEntity'
import Move from '../animations/Move'
import * as PIXI from 'pixi.js'

const ROAD_TEXTURE = 'assets/road.png'

export class Road extends BaseEntity {
  private readonly animation: Move
  private readonly speed: number
  private readonly roadHeight: number

  constructor(config: { speed: number, roadHeight: number }) {

    super({ image: ROAD_TEXTURE })

    this.speed = config.speed
    this.roadHeight = config.roadHeight

    const roadUpUpUp = PIXI.Sprite.from(ROAD_TEXTURE)
    roadUpUpUp.position.set(0, -3 * this.roadHeight)
    this.container.addChild(roadUpUpUp)

    const roadUpUp = PIXI.Sprite.from(ROAD_TEXTURE)
    roadUpUp.position.set(0, -2 * this.roadHeight)
    this.container.addChild(roadUpUp)

    const roadUp = PIXI.Sprite.from(ROAD_TEXTURE)
    roadUp.position.set(0, -this.roadHeight)
    this.container.addChild(roadUp)

    const roadDown = PIXI.Sprite.from(ROAD_TEXTURE)
    roadDown.position.set(0, this.roadHeight)
    this.container.addChild(roadDown)

    const roadDownDown = PIXI.Sprite.from(ROAD_TEXTURE)
    roadDownDown.position.set(0, 2 * this.roadHeight)
    this.container.addChild(roadDownDown)

    this.animation = new Move({
      object: this.container,
      from: { x: 0, y: 0 },
      to: { x: 0, y: 3 * this.roadHeight },
      duration: 3 * this.roadHeight / this.speed,
      repeat: -1,
    }).start()

  }
}
