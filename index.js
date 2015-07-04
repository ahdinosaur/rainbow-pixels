var range = require('lodash.range')
var reduce = require('lodash.reduce')
var inherits = require('inherits')
var Readable = require('readable-stream').Readable
var defined = require('defined')
var mod = require('mod-op')
var Ndarray = require('ndarray')

module.exports = RainbowPixels

inherits(RainbowPixels, Readable)
function RainbowPixels (opts) {
  if (!(this instanceof RainbowPixels)) {
    return new RainbowPixels(opts)
  }

  Readable.call(this, {
    objectMode: true
  })

  this.shape = defined(opts.shape, [8, 8, 3]) 
  this.inc = defined(opts.inc, 5)
  this.size = reduce(this.shape, mult)
  this.offset = 0
  this.saturation = defined(opts.saturation, 100)
  this.value = defined(opts.value, 100)
}

RainbowPixels.prototype._read = read
RainbowPixels.prototype._readSample = readSample

function read (numSamples) {
  this.push(this._readSample())
}

function readSample () {
  var colors = new Float64Array(this.size)
  var colorDepth = 3

  for (var i = 0; i < colors.length; i += colorDepth) {
    colors[i] = mod(
        (
          (i / this.size)
          * 360
        )
        + this.offset
      , 360)
    colors[i + 1] = this.saturation
    colors[i + 2] = this.value
  }

  this.offset += this.inc

  return Ndarray(colors, this.shape)
}

function mult (x, y) { return x * y }
