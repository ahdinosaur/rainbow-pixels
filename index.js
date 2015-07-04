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

  this.shape = defined(opts.shape, [8, 8]) 
  this.inc = defined(opts.inc, 5)
  this.size = reduce(this.shape, mult)
  this.offset = 0
  this.saturation = defined(opts.saturation, 1)
  this.value = defined(opts.value, 1)
}

RainbowPixels.prototype._read = read
RainbowPixels.prototype._readSample = readSample

function read (numSamples) {

  for (; numSamples > 0; numSamples--) {
    var more = this.push(this._readSample())
    if (more === false) {
      return
    }
  }

}

function readSample () {
  var colors = range(this.size)
  .map(function (n) {
    return {
      h: mod(
        (
          (n / this.size)
          * 360
        )
        + this.offset
      , 360),
      s: this.saturation,
      v: this.value
    }
  }, this)

  this.offset += this.inc

  return Ndarray(colors, this.shape)
}

function mult (x, y) { return x * y }
