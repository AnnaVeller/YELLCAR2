import { gsap } from 'gsap'
import * as PIXI from 'pixi.js'
import { PixiPlugin } from 'gsap/PixiPlugin'

export interface BaseConfig {
  object: PIXI.Container,
  to: { x?: number, y?: number },
  from?: { x?: number, y?: number },
  delay?: number,
  duration?: number,
  ease?: string,
  repeat?: number
}

export default class Move {
  private readonly animateObj: PIXI.Container
  private readonly from?: { x?: number, y?: number }
  private readonly to: { x?: number, y?: number }
  private readonly delay: number
  private readonly duration: number
  private readonly ease: string
  private readonly animation: GSAPTween
  private readonly repeat: number

  constructor(config: BaseConfig) {
    this.animateObj = config.object
    this.from = config.from
    this.to = config.to

    this.delay = config.delay || 0
    this.duration = config.duration || 1
    this.ease = config.ease || 'none'
    this.repeat = config.repeat || 0

    this.animation = this.createAnimation()
  }

  public start() {
    this.animation.restart(true)

    return this
  }

  public stop() {
    this.animation.pause()
  }

  private createAnimation() {
    gsap.registerPlugin(PixiPlugin)
    PixiPlugin.registerPIXI(PIXI)

    return gsap.fromTo(this.animateObj,
      this.from ? { pixi: this.from } : {},
      {
        delay: this.delay,
        pixi: this.to,
        duration: this.duration,
        ease: this.ease,
        repeat: this.repeat,
        paused: true,
      })
  }
}
