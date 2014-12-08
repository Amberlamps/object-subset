var objectSubset = require('../lib');

var doc = {
  _id: '1',
  _index: 'twitter_201411',
  _type: 'tweet',
  _source: {
    text: 'hello world',
    tags: [{
      name: 'bvb',
      secret: 1
    }, {
      secret: 2
    }],
    nested: {
      obj: {
        value: 1,
        secret: 2
      }
    },
    nestedArray: [{
      user: [{
        name: 'alex'
      }]
    }]
  }
};

var keywords = [
  '_id',
  '_type',
  '_source.text',
  '_source.tags.name',
  '_source.nested.obj.value',
  '_source.nestedArray.user.name'
];

describe('Object subset', function() {

  describe('Create subset', function() {
    it('should run without errors', function(done) {
      var subset = objectSubset(keywords, doc);
      done();
    });
  });

});