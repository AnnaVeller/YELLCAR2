import { BaseEntity } from './BaseEntity'
import Move from './animations/Move'
import * as PIXI from 'pixi.js'

const ROAD_TEXTURE = 'assets/road.png'
const ROAD_TEXTURE_HEIGHT = 1500
const SPEED = 400

export class Road extends BaseEntity {
  private animation: Move

  constructor() {
    super({ image: ROAD_TEXTURE })

    const roadUpper = PIXI.Sprite.from(ROAD_TEXTURE)
    roadUpper.position.set(0, -ROAD_TEXTURE_HEIGHT)
    this.container.addChild(roadUpper)

    this.animation = new Move({
      object: this.container,
      from: { x: 0, y: 0 },
      to: { x: 0, y: ROAD_TEXTURE_HEIGHT },
      duration: ROAD_TEXTURE_HEIGHT / SPEED,
      repeat: -1,
    }).start()
  }
}
