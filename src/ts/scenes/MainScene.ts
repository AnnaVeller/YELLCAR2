import { Scene } from './Scene'
import { Road } from '../Road'
import { Car } from '../Car'

export class MainScene extends Scene {
  private road: Road
  private car: Car

  constructor() {
    super()

    // add road
    this.road = new Road()
    this.container.addChild(this.road.container)

    // add car
    this.car = new Car()
    this.container.addChild(this.car.container)

    document.addEventListener('keydown', (key: KeyboardEvent) => this.onKeyDown(key))
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
}

