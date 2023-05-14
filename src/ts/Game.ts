import * as PIXI from 'pixi.js'
import { MainScene } from './scenes/MainScene'
import { Scene } from './scenes/Scene'

export class Game {
  public app: PIXI.Application
  private mainScene: Scene

  constructor(config: {
    width: number,
    height: number,
    backgroundColor: number,
    resizeTo: Window | HTMLElement,
    antialias: boolean
  }) {

    this.app = new PIXI.Application(config)

    this.run()
  }

  run() {
    this.mainScene = new MainScene()
    this.app.stage.addChild(this.mainScene.container)

    this.resize()
    window.onresize = () => setTimeout(() => this.resize(), 10)
  }

  private screenSize() {
    return {
      width: document.body.clientWidth - 10,
      height: document.body.clientHeight - 30,
    }
  }

  private resize() {
    setTimeout(() => this.resizeCustom(), 10)
  }

  private resizeCustom() {
    /**
     * screenWidth, screenHeight - высота текущего экрана
     * {x: screenWidth, y: screenHeight} - правый нижний угол
     *
     *
     */

    const { width: screenWidth, height: screenHeight } = this.screenSize()

    const w = window.outerWidth
    const h = window.outerHeight

    const ratio = w / h

    const isLandscape = ratio > 1

    this.app.renderer.resize(screenWidth, screenHeight)
  }
}
