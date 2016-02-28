const defined = require('defined')
const Ndarray = require('ndarray')
const rainbowGradient = require('rainbow-linear-gradient')
const infinite = require('pull-stream/sources').infinite

module.exports = RainbowPixels

function RainbowPixels (opts) {
  opts = opts || {}

  var shape = defined(opts.shape, [8, 8])
  var inc = defined(opts.inc, 5)
  var gradientOpts = {
    start: 0,
    step: opts.step,
    length: size(shape),
    saturation: opts.saturation,
    lightness: opts.lightness,
  }

  return infinite(generate)

  function generate () {
    var gradient = rainbowGradient(gradientOpts)

    gradientOpts.start += inc

    var pixels = Ndarray(
      gradient.data,
      shape.concat(gradient.shape.slice(gradient.shape.length - 1))
    )

    pixels.format = gradient.format

    return pixels
  }
}


function size (shape) { return shape.reduce(mult) }
function mult (a, b) { return a * b }
