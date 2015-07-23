/**
 * Modules
 */

var tags = require('@weo-edu/education-tags')
var lunr = require('@weo-edu/lunr')

/**
 * Vars
 */

var idx = lunr(function() {
  this.field('displayName', {boost: 30})
  this.field('tags', {boost:  10})
  this.field('tagType', {boost: 10})
  this.field('all')
  this.ref('displayName')
})

var tagMap = {}
tags.forEach(function(tag) {
  tag = clone(tag)
  tag.all = [].concat(tag.displayName, tag.content, tag.tags, tag.meta, tag.tagType).filter(Boolean).join(' ')
  idx.add(tag)
  tagMap[tag.displayName] = tag
})

/**
 * Expose sedu
 */

module.exports = sedu

/**
 * sedu
 */

function sedu (query) {
  var results = idx.search(query)
  if (!results.length) return []

  var filtered = []

  var i = 0
  var first = results[i].score
  while(i < results.length && results[i].score / first > .1) {
    filtered.push(results[i])
    i++
  }

  return filtered.map(function(res) {
    var t = tagMap[res.ref]
    t.score = res.score
    return t
  })
}

function clone(obj) {
  var c = {}
  for (var key in obj) {
    c[key] = obj[key]
  }
  return c
}
