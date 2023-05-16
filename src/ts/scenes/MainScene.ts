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


    const myEmitter = config.emitter

    // add handControl
    const handControl = new HandControl({ emitter: myEmitter })
    this.container.addChild(handControl.container)

    document.addEventListener('keydown', (key: KeyboardEvent) => this.onKeyDown(key))

    myEmitter.on('right', () => this.car.moveRight())
    myEmitter.on('left', () => this.car.moveLeft())
    myEmitter.on('up', () => this.car.moveUp())
    myEmitter.on('down', () => this.car.moveDown())
  }

  override update() {

    const playerCord = this.car.container.position

    const figures: Array<Figure> | [] = this.figureManager.getNearFigures(playerCord)

    figures.forEach(el => el.captureAnimate(playerCord))

    this.counter.addScore(figures.length)
  }

  private onKeyDown(key: KeyboardEvent) {
    // A Key = 65
    // Left arrow = 37
    if (key.keyCode === 65 || key.keyCode === 37) {
      this.car.moveLeft()
    }

    // W Key = 87
    // Up arrow = 38
    if (key.keyCode === 87 || key.keyCode === 38) {
      this.car.moveUp()
    }

    // D Key = 68
    // Right arrow = 39
    if (key.keyCode === 68 || key.keyCode === 39) {
      this.car.moveRight()
    }

    // S Key = 83
    // Down arrow = 40
    if (key.keyCode === 83 || key.keyCode === 40) {
      this.car.moveDown()
    }
  }

  public checkBorders(x: number, y: number) {
    if (x < this.leftBoarder) x = this.leftBoarder
    if (x > this.rightBoarder) x = this.rightBoarder
    if (y < this.upBoarder) y = this.upBoarder
    if (y > this.downBoarder) y = this.downBoarder

    return { x, y }
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
    this.container.position.set(props.screenWidth / 2 - this.container.scale.x * 500, 0)
  }
}







