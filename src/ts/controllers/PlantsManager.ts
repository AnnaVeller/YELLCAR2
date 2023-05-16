import Move from '../animations/Move'
import * as PIXI from 'pixi.js'
import Timer from '../animations/Timer'
import { Plant } from '../components/Plant'

export class PlantsManager {
  public readonly container: PIXI.Container
  public readonly plants: Array<Plant>

  private animation: Move
  private readonly timer = new Timer()
  private readonly speed: number
  private readonly roadHeight: number

  constructor(config: { speed: number, roadHeight: number }) {
    this.container = new PIXI.Container()
    this.plants = []
    this.speed = config.speed
    this.roadHeight = config.roadHeight

    this.delayCreation()
  }

  public delayCreation() {

    this.timer.start(1.5, () => {
      this.createNewFigure(-220, -400)
      this.createNewFigure(1200, -200)
      this.delayCreation()
    })
  }

  public createNewFigure(x: number, y: number) {
    const plant = new Plant({ x, y })
    this.container.addChild(plant.container)
    this.plants.push(plant)

    this.animation = new Move({
      object: plant.container,
      to: { y: 3 * this.roadHeight },
      duration: (3 * this.roadHeight - y) / this.speed,
      onComplete: this.onComplete.bind(this, plant, y),
    }).start()
  }

  onComplete(plant: Plant, y: number) {
    plant.destroy()
    this.plants.splice(this.plants.indexOf(plant), 1)
  }
}
