import * as PIXI from 'pixi.js'

const gameWidth = 800
const gameHeight = 600

const index = new PIXI.Application<HTMLCanvasElement>({
  backgroundColor: 0xd3d3d3,
  width: gameWidth,
  height: gameHeight,
})

run()

function run() {
  document.body.appendChild(index.view)

  resizeCanvas()

  const road = getRoad()
  road.anchor.set(0.5, 0.5)
  road.position.set(gameWidth / 2, 530)
  index.stage.addChild(road)
}

function resizeCanvas() {
  const resize = () => {
    index.renderer.resize(window.innerWidth, window.innerHeight)
    index.stage.scale.x = window.innerWidth / gameWidth
    index.stage.scale.y = window.innerHeight / gameHeight
  }

  resize()

  window.addEventListener('resize', resize)
}

function getRoad(): PIXI.Sprite {
  const texture = PIXI.Texture.from('assets/road.png')
  const road = new PIXI.Sprite(texture)

  return road
}
