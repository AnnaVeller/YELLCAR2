import { Game } from './ts/Game'

const gameWidth = 800
const gameHeight = 600

const game = new Game({
  width: gameWidth,
  height: gameHeight,
  backgroundColor: 0xe4f391,
  resizeTo: window,
  antialias: true,
})

document.body.appendChild(game.app.view as HTMLCanvasElement)


