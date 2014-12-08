var objectSubset = require('../lib');

var doc = {
  _id: 1,
  _type: 'user',
  _index: 'users',
  _source: {
    name: 'John',
    age: 42,
    creditCard: [{
      type: 'VISA',
      cardNumber: '4532043405899708'
    }],
    children: [{
      name: 'Jane',
      age: 9
    }, {
      name: 'Frank',
      age: 13
    }]
  }
};

var keywords = [
  '_source.name',
  '_source.children.name',
  '_source.children.age'
];

describe('Object subset', function() {

  describe('Create subset', function() {
    it('should run without errors', function(done) {
      var subset = objectSubset(keywords, doc);
      console.log(JSON.stringify(subset));
      done();
    });
  });

});