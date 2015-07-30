var test = require('tape')
var through = require('through2')

var rainbowPixels = require('./')

test('streams a rainbow', function (t) {

  var shape = [8]
  var colors = [[
    0, 100, 50,
    45, 100, 50,
    90, 100, 50,
    135, 100, 50,
    180, 100, 50,
    225, 100, 50,
    270, 100, 50,
    315, 100, 50
  ], [
    10, 100, 50,
    55, 100, 50,
    100, 100, 50,
    145, 100, 50,
    190, 100, 50,
    235, 100, 50,
    280, 100, 50,
    325, 100, 50
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
    t.deepEqual(pixels.shape, expected.shape.concat([3]))

    if (colors.length === 0) {
      t.end()
    } else {
      cb()
    }
  }))
})
