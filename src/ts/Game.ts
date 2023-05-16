import * as PIXI from 'pixi.js'
import { MainScene } from './scenes/MainScene'
import { Scene } from './scenes/Scene'

export class Game {
  public app: PIXI.Application
  private mainScene: Scene
  public width: number
  public height: number
  private readonly myEmitter: PIXI.utils.EventEmitter

  constructor(config: {
    width: number,
    height: number,
    backgroundColor: number,
    resizeTo: Window | HTMLElement,
    antialias: boolean
  }) {

    this.app = new PIXI.Application(config)

    this.myEmitter = new PIXI.utils.EventEmitter()

    this.run()
  }

  run() {
    this.mainScene = new MainScene({ app: this.app, emitter: this.myEmitter })
    this.mainScene.container.scale.set(0.8)
    this.app.stage.addChild(this.mainScene.container)
    this.app.ticker.add(() => this.update())

    this.resize()
    window.onresize = () => setTimeout(() => this.resize(), 10)
  }

  public update() {
    this.mainScene.update()
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

    this.width = screenWidth
    this.height = screenHeight

    this.mainScene.resize({ screenHeight, screenWidth, isLandscape })
  }
}
