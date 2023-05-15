import Move from './animations/Move'
import * as PIXI from 'pixi.js'
import Timer from './animations/Timer'
import { Plant } from './Plant'

const ROAD_TEXTURE_HEIGHT = 1500
const SPEED = 700

export class PlantsManager {
  public container: PIXI.Container
  public plants: Array<Plant>

  private animation: Move
  private timer = new Timer()

  constructor() {
    this.container = new PIXI.Container()
    this.plants = []

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
      to: { y: 3 * ROAD_TEXTURE_HEIGHT },
      duration: (3 * ROAD_TEXTURE_HEIGHT - y) / SPEED,
      onComplete: this.onComplete.bind(this, plant, y),
    }).start()
  }

  onComplete(plant: Plant, y: number) {
    plant.destroy()
    this.plants.splice(this.plants.indexOf(plant), 1)
  }
}
