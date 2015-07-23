
var sedu = require('..')
var assert = require('assert')
var tags = require('@weo-edu/education-tags')

describe('sedu', function () {
  this.timeout(5000)
  it('should return tag name first for all tags', function() {
    tags.forEach(function (tag) {

      var result = sedu(tag.displayName)
      assert(result[0].displayName == tag.displayName)
    })
  })

  it('should return one result for "spell correctly grade 6"', function() {
    var result = sedu('spell correctly grade 6')
    assert(result.length)
  })
})
