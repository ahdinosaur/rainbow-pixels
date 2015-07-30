var inherits = require('inherits')
var Readable = require('readable-stream').Readable
var defined = require('defined')
var Ndarray = require('ndarray')
var rainbowGradient = require('rainbow-linear-gradient')

module.exports = RainbowPixels

inherits(RainbowPixels, Readable)
function RainbowPixels (opts) {
  if (!(this instanceof RainbowPixels)) {
    return new RainbowPixels(opts)
  }

  opts = opts || {}

  Readable.call(this, {
    objectMode: true
  })

  this.shape = defined(opts.shape, [8, 8]) 
  this.inc = defined(opts.inc, 5)
  this.gradientOpts = {
    start: 0,
    step: opts.step,
    length: size(this.shape),
    saturation: opts.saturation,
    lightness: opts.lightness
  }
}

RainbowPixels.prototype._read = read
RainbowPixels.prototype._readSample = readSample

function read (numSamples) {
  this.push(this._readSample())
}

function readSample () {
  var gradient = rainbowGradient(this.gradientOpts)

  this.gradientOpts.start += this.inc

  var pixels = Ndarray(
    gradient.data,
    this.shape.concat(gradient.shape.slice(gradient.shape.length - 1))
  )

  pixels.format = gradient.format

  return pixels
}

function size (shape) { return shape.reduce(mult) }
function mult (a, b) { return a * b }
