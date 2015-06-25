var range = require('lodash.range')
var reduce = require('lodash.reduce')
var inherits = require('inherits')
var Readable = require('readable-stream').Readable
var defined = require('defined')
var mod = require('mod-op')

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
  this.size = reduce(this.shape, function (x, y) {
    return x * y
  })
  this.offset = 0
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
      s: 1,
      v: 1
    }
  }, this)

  this.offset += this.inc

  return {
    data: colors,
    shape: this.shape
  }
}
