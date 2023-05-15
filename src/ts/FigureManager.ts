import Move from './animations/Move'
import * as PIXI from 'pixi.js'
import { Figure } from './Figure'
import Timer from './animations/Timer'

const ROAD_TEXTURE_HEIGHT = 1500
const SPEED = 700

export class FigureManager {
  public container: PIXI.Container
  public figures: Array<Figure>

  private animation: Move
  private timer = new Timer()

  constructor() {
    this.container = new PIXI.Container()
    this.figures = []

    this.delayCreation()
  }

  public delayCreation() {

    this.timer.start(0.5, () => {
      this.createNewFigure(-100)
      this.delayCreation()
    })
  }

  public createNewFigure(y: number) {
    const x = 90 + 700 * Math.random()
    const figure = new Figure({ x, y, isRandom: true })
    this.container.addChild(figure.container)
    this.figures.push(figure)

    this.animation = new Move({
      object: figure.container,
      to: { y: 3 * ROAD_TEXTURE_HEIGHT },
      duration: (3 * ROAD_TEXTURE_HEIGHT - y) / SPEED,
      onComplete: this.onComplete.bind(this, figure, y),
    }).start()
  }

  onComplete(figure: Figure, y: number) {
    figure.destroy()
    this.figures.splice(this.figures.indexOf(figure), 1)
  }
}
