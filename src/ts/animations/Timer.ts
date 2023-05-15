import { gsap } from 'gsap'

export default class Timer {
  constructor() {
  }

  start(delay: number, onComplete: () => void) {
    gsap.to(this, {
      delay: delay,
      duration: 0,
      onComplete: onComplete,
    })
  }
}
