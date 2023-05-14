import Move from './animations/Move'
import * as PIXI from 'pixi.js'
import { Figure } from './Figure'

const ROAD_TEXTURE_HEIGHT = 1500
const SPEED = 700

export class FigureManager {
  private animation: Move
  public container: PIXI.Container
  public figures: Array<Figure>

  constructor() {
    this.container = new PIXI.Container()
    this.figures = []
    this.createNewFigure()
    this.createNewFigure()
    this.createNewFigure()
    this.createNewFigure()
    this.createNewFigure()
    this.createNewFigure()
  }

  public createNewFigure() {
    const y = -3 * ROAD_TEXTURE_HEIGHT * Math.random() - 100
    const figure = new Figure({ x: 90 + 700 * Math.random(), y, isRandom: true })
    this.container.addChild(figure.container)
    this.figures.push(figure)

    this.animation = new Move({
      object: figure.container,
      to: { y: 3 * ROAD_TEXTURE_HEIGHT },
      duration: (3 * ROAD_TEXTURE_HEIGHT - y) / SPEED,
      onComplete: this.onComplete.bind(this, figure),
    }).start()
  }

  onComplete(figure: Figure) {
    this.createNewFigure()
    // figure.destroy()
    this.figures.splice(this.figures.indexOf(figure), 1)
  }
}
