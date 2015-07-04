var test = require('tape')
var through = require('through2')

var rainbowPixels = require('./')

test('streams a rainbow', function (t) {

  var shape = [8, 3]
  var colors = [[
    0, 100, 100,
    45, 100, 100,
    90, 100, 100,
    135, 100, 100,
    180, 100, 100,
    225, 100, 100,
    270, 100, 100,
    315, 100, 100
  ], [
    10, 100, 100,
    55, 100, 100,
    100, 100, 100,
    145, 100, 100,
    190, 100, 100,
    235, 100, 100,
    280, 100, 100,
    325, 100, 100
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
    var expected = colors.shift()
    t.deepEqual([].slice.call(pixels.data), expected.data)
    t.deepEqual(pixels.shape, expected.shape)

    if (colors.length === 0) {
      t.end()
    } else {
      cb()
    }
  }))
})
