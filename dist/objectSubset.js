/**
 * Module to create a subset of an object using a list of keywords.
 *
 * User: Alexander Behrens <alexander.behrens.84@gmail.com>
 */

(function() {


  'use strict';

  if (module && module.exports) {
    module.exports = createSubset;
  } else if (window) {
    window.objectSubset = createSubset;
  }


  /**
   * createSubset is initializing the creation of the subset.
   * If keywords is not an array return doc immediately.
   */
  function createSubset(keywords, doc) {

    if (!keywords || Object.prototype.toString.call(keywords) !== '[object Array]') {
      return doc;
    }

    var lookup = createLookUp(keywords);

    return traverseThroughObject(lookup, doc);

  }


  /**
   * createLookUp iterates over every keyword and creates a tree
   * where the leaves are empty objects. The lookup object is used
   * to be able to traverse along the input document.
   */
  function createLookUp(keywords) {

    return keywords.reduce(function(p, c) {

      c.split('.').reduce(function(pr, cu) {

        if (pr.hasOwnProperty(cu)) {

          return pr[cu];

        } else {

          pr[cu] = {};
          return pr[cu];

        }

      }, p);

      return p;

    }, {});

  }


  /**
   * traverseThroughObject is traversing through the object
   * by the fields described in lookup and filling the
   * output object accordingly in the process.
   */
  function traverseThroughObject(lookup, doc, output) {

    if (!output) {
      output = {};
    }

    for (var key in lookup) {

      if (doc.hasOwnProperty(key)) {

        if(Object.keys(lookup[key]).length === 0) {

          output[key] = doc[key];

        } else {

          if (!output.hasOwnProperty(key)) {

            if (Object.prototype.toString.call(doc[key]) === '[object Array]') {

              output[key] = [];
              for (var i = 0, _len = doc[key].length; i < _len; i++) {
                var field = {};
                output[key].push(field);
                traverseThroughObject(lookup[key], doc[key][i], field);
              }

            } else {

              output[key] = {};
              traverseThroughObject(lookup[key], doc[key], output[key]);

            }

          }

        }

      }

    }

    return output;

  }

})();