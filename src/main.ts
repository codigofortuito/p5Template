import p5 from 'p5'
import './style.css'

import CCapture from 'ccapture.js-npmfixed'

const app = document.querySelector<HTMLDivElement>('#app')!

const capturer = new CCapture({
  framerate: 5,
  format: 'gif',
  name: 'movie',
  quality: 50,
  verbose: false,
})

new p5((p5: p5) => {
  let p5Renderer: p5.Renderer

  p5.setup = function setup() {
    p5Renderer = p5.createCanvas(480, 480)
  }

  p5.draw = function draw() {
    if (p5.frameCount === 1) {
      capturer.start()
    }
    p5.background(255)

    capturer.capture(p5Renderer.elt)

    if (p5.frameCount === 30) {
      p5.noLoop()
      capturer.stop()
      capturer.save()
    }
  }
}, app)
