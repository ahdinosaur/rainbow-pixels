const defined = require('defined')
const Ndarray = require('ndarray')
const rainbowGradient = require('rainbow-linear-gradient')

module.exports = RainbowPixels

function RainbowPixels (opts) {
  opts = defined(opts, {})

  var shape = defined(opts.shape, [8, 8])
  var inc = defined(opts.inc, 5)
  var gradientOpts = {
    start: 0,
    step: opts.step,
    length: size(shape),
    saturation: opts.saturation,
    lightness: opts.lightness,
  }

  return function generate () {
    var gradient = rainbowGradient(gradientOpts)

    gradientOpts.start += inc

    return Ndarray(
      gradient.data,
      shape.concat(gradient.shape.slice(gradient.shape.length - 1))
    )
  }
}


function size (shape) { return shape.reduce(mult) }
function mult (a, b) { return a * b }
