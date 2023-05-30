import { Scene } from './Scene'
import { Road } from '../components/Road'
import { Car } from '../components/Car'
import * as PIXI from 'pixi.js'
import { FigureManager } from '../controllers/FigureManager'
import { Figure } from '../components/Figure'
import { Counter } from '../ui/Counter'
import { PlantsManager } from '../controllers/PlantsManager'
import { GAME_SETTINGS } from '../config'
import { HandControl } from '../controllers/HandControl'

export class MainScene extends Scene {
  private road: Road
  private car: Car

  private leftBoarder: number
  private rightBoarder: number
  private upBoarder: number
  private downBoarder: number

  private app: PIXI.Application

  private figureManager: FigureManager

  private plantManager: PlantsManager

  private counter: Counter

  constructor(config: { app: PIXI.Application, emitter: PIXI.utils.EventEmitter }) {
    super()

    this.app = config.app

    // add road
    this.road = new Road({ speed: GAME_SETTINGS.speed, roadHeight: GAME_SETTINGS.roadHeight })
    this.container.addChild(this.road.container)

    // add figures
    this.figureManager = new FigureManager({
      speed: GAME_SETTINGS.speed,
      roadHeight: GAME_SETTINGS.roadHeight,
      captureR: GAME_SETTINGS.captureR,
    })
    this.container.addChild(this.figureManager.container)

    // add car
    this.car = new Car({ scene: this })
    this.container.addChild(this.car.container)

    // add counter
    this.counter = new Counter()
    this.container.addChild(this.counter.container)

    // add plants
    this.plantManager = new PlantsManager({ speed: GAME_SETTINGS.speed, roadHeight: GAME_SETTINGS.roadHeight })
    this.container.addChild(this.plantManager.container)

    // add handControl
    const handControl = new HandControl({ object: this.car })
    this.container.addChild(handControl.container)

    // const myEmitter = config.emitter
    // myEmitter.emit('right', () => this.car.moveRight())
    // myEmitter.on('right', () => this.car.moveRight())
  }

  override update() {

    const playerCord = this.car.container.position

    const figures: Array<Figure> | [] = this.figureManager.getNearFigures(playerCord)

    figures.forEach(el => el.captureAnimate(playerCord))

    this.counter.addScore(figures.length)
  }

  public checkBorderLeft(x: number) {
    return x < this.leftBoarder ? this.leftBoarder : x

  }

  public checkBorderRight(x: number) {
    return x > this.rightBoarder ? this.rightBoarder : x
  }

  private updateBoarder(screenHeight: number) {
    this.leftBoarder = 200
    this.rightBoarder = 1000 - 200
    this.upBoarder = 130
    this.downBoarder = screenHeight / this.container.scale.x - 150
  }

  override resize(props: { screenHeight: number, screenWidth: number, isLandscape: boolean }) {
    if (props.isLandscape) {
      this.container.scale.set(0.4)
    } else {
      this.container.scale.set(0.6)
    }

    this.updateBoarder(props.screenHeight)
    this.car.container.position.y = props.screenHeight / this.container.scale.x - 400
    this.container.position.set(props.screenWidth / 2 - this.container.scale.x * 500, 0)
  }
}







