import { BaseEntity } from './BaseEntity'
import Move from './animations/Move'
import * as PIXI from 'pixi.js'

const ROAD_TEXTURE = 'assets/road.png'
const ROAD_TEXTURE_HEIGHT = 1500
const SPEED = 700

export class Road extends BaseEntity {
  private animation: Move

  constructor() {
    super({ image: ROAD_TEXTURE })

    const roadUpUpUp = PIXI.Sprite.from(ROAD_TEXTURE)
    roadUpUpUp.position.set(0, -3 * ROAD_TEXTURE_HEIGHT)
    this.container.addChild(roadUpUpUp)

    const roadUpUp = PIXI.Sprite.from(ROAD_TEXTURE)
    roadUpUp.position.set(0, -2 * ROAD_TEXTURE_HEIGHT)
    this.container.addChild(roadUpUp)

    const roadUp = PIXI.Sprite.from(ROAD_TEXTURE)
    roadUp.position.set(0, -ROAD_TEXTURE_HEIGHT)
    this.container.addChild(roadUp)

    const roadDown = PIXI.Sprite.from(ROAD_TEXTURE)
    roadDown.position.set(0, ROAD_TEXTURE_HEIGHT)
    this.container.addChild(roadDown)

    const roadDownDown = PIXI.Sprite.from(ROAD_TEXTURE)
    roadDownDown.position.set(0, 2 * ROAD_TEXTURE_HEIGHT)
    this.container.addChild(roadDownDown)

    this.animation = new Move({
      object: this.container,
      from: { x: 0, y: 0 },
      to: { x: 0, y: 3 * ROAD_TEXTURE_HEIGHT },
      duration: 3 * ROAD_TEXTURE_HEIGHT / SPEED,
      repeat: -1,
    }).start()

  }
}
