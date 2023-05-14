import * as PIXI from 'pixi.js'

export class Scene {
  public container: PIXI.Container

  constructor() {
    this.container = new PIXI.Container()
  }

  public update() {

  }

  public resize(props: { isLandscape: boolean, screenHeight: number, screenWidth: number }) {
  }
}
