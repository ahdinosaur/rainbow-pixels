var test = require('tape')
var through = require('through2')

var rainbowPixels = require('./')

test('streams a rainbow', function (t) {

  var shape = [8, 1]
  var colors = [[
    { h: 0, s: 1, v: 1 },
    { h: 45, s: 1, v: 1 },
    { h: 90, s: 1, v: 1 },
    { h: 135, s: 1, v: 1 },
    { h: 180, s: 1, v: 1 },
    { h: 225, s: 1, v: 1 },
    { h: 270, s: 1, v: 1 },
    { h: 315, s: 1, v: 1 }
  ], [
    { h: 10, s: 1, v: 1 },
    { h: 55, s: 1, v: 1 },
    { h: 100, s: 1, v: 1 },
    { h: 145, s: 1, v: 1 },
    { h: 190, s: 1, v: 1 },
    { h: 235, s: 1, v: 1 },
    { h: 280, s: 1, v: 1 },
    { h: 325, s: 1, v: 1 }
  ]].map(function (colors) {
    return {
      data: colors,
      shape: shape
    }
  })
  var inc = 10

  rainbowPixels({
    shape: shape,
    inc: inc
  })
  .pipe(through.obj(function (pixels, enc, cb) {
    t.deepEqual(pixels, colors.shift())

    if (colors.length === 0) {
      t.end()
    } else {
      cb()
    }
  }))
})
