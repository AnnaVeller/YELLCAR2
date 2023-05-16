import Move from '../animations/Move'
import * as PIXI from 'pixi.js'
import { Figure } from '../components/Figure'
import Timer from '../animations/Timer'

export class FigureManager {
  public container: PIXI.Container
  public figures: Array<Figure>

  private timer = new Timer()
  private speed: number
  private roadHeight: number
  private captureR: number

  constructor(config: { speed: number, roadHeight: number, captureR: number }) {
    this.container = new PIXI.Container()
    this.figures = []
    this.speed = config.speed
    this.roadHeight = config.roadHeight
    this.captureR = config.captureR

    this.delayCreation()
  }

  private delayCreation() {

    this.timer.start(0.5, () => {
      this.createNewFigure(-200)
      this.delayCreation()
    })
  }

  private createNewFigure(y: number) {
    const x = 90 + 700 * Math.random()
    const figure = new Figure({ x, y, isRandom: true })
    this.container.addChild(figure.container)
    this.figures.push(figure)

    figure.animation = new Move({
      object: figure.container,
      to: { y: 3 * this.roadHeight },
      duration: (3 * this.roadHeight - y) / this.speed,
      onComplete: this.onComplete.bind(this, figure, y),
    }).start()
  }

  private onComplete(figure: Figure, y: number) {
    figure.destroy()
    this.figures.splice(this.figures.indexOf(figure), 1)
  }

  private static dist(a: number, b: number) {
    return Math.sqrt(a * a + b * b)
  }

  public getNearFigures(cord: { x: number, y: number }) {
    return this.figures.filter(figure => figure.isEnable &&
      FigureManager.dist(
        figure.container.position.x - cord.x,
        figure.container.position.y - cord.y) < this.captureR)
  }
}
