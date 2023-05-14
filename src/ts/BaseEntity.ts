import * as PIXI from 'pixi.js'

interface BaseProps {
  image: string
}

export class BaseEntity {
  public container: PIXI.Container
  public sprite: PIXI.Sprite

  constructor(props: BaseProps) {
    this.container = new PIXI.Container()

    this.sprite = PIXI.Sprite.from(props.image)

    this.container.addChild(this.sprite)
  }
}
