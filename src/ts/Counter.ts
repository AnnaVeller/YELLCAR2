import * as PIXI from 'pixi.js'

export class Counter {
  public container: PIXI.Container
  private readonly text: PIXI.Text
  private score: number

  constructor() {
    this.score = 0

    this.container = new PIXI.Container()
    this.container.position.set(0, 0)

    const style = new PIXI.TextStyle({
      fontFamily: 'georgia',
      fontSize: 64,
      fontWeight: 'bold',
      fill: ['#ffbf00'],
      stroke: '#4a1850',
      strokeThickness: 3,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrapWidth: 440,
      lineJoin: 'round',
    })

    this.text = new PIXI.Text('Score:', style)
    this.changeText()
    this.text.x = 50
    this.text.y = 100
    this.container.addChild(this.text)
  }

  private changeText() {
    this.text.text = `Score: ${this.score}`
  }

  public addScore(score: number = 1) {
    this.score += score
    this.changeText()
  }

}
