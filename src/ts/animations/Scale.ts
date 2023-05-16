import { gsap } from 'gsap'
import * as PIXI from 'pixi.js'
import { PixiPlugin } from 'gsap/PixiPlugin'

export interface BaseConfig {
  object: PIXI.Container,
  to: { scaleX?: number, scaleY?: number },
  from?: { scaleX?: number, scaleY?: number },
  delay?: number,
  duration?: number,
  ease?: string,
  repeat?: number,
  onRepeat?: () => {},
  onComplete?: () => {},
}

export default class Scale {
  private readonly animateObj: PIXI.Container
  private readonly from?: { scaleX?: number, scaleY?: number }
  private readonly to: { scaleX?: number, scaleY?: number }
  private readonly delay: number
  private readonly duration: number
  private readonly ease: string
  private readonly animation: GSAPTween
  private readonly repeat: number
  private readonly onRepeat?: () => {}
  private readonly onComplete?: () => {}

  constructor(config: BaseConfig) {
    this.animateObj = config.object
    this.from = config.from
    this.to = config.to

    this.delay = config.delay || 0
    this.duration = config.duration || 1
    this.ease = config.ease || 'none'
    this.repeat = config.repeat || 0
    this.onRepeat = config.onRepeat
    this.onComplete = config.onComplete

    this.animation = this.createAnimation()
  }

  onRepeatHandler() {
    if (typeof this.onRepeat === 'function') {
      this.onRepeat()
    }
  }

  onCompleteHandler() {
    if (typeof this.onComplete === 'function') {
      this.onComplete()
    }
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
        onRepeat: () => this.onRepeatHandler(),
        onComplete: () => this.onCompleteHandler(),
      })
  }
}

