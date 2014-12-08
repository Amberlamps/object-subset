# object-subset

## What is it about?

Object-subset is a tool to conveniently create a subset of a given tool by defining corresponding fields. This is incredibly helpful if you are serving an API or other end point that is fetching data from your MongoDB, Elastic Search or any other database that is at least able to return the results as JSON. In most cases you do not want to return the raw data because first of all it may contain information that is not meant for the public and secondly just because we can, does not mean we should put an unnecessary high payload on the wire.

## Install

```npm install object-subset```

## Usage

```javascript
var objectSubset = require('object-subset');
var subset = objectSubset(keywords, doc);
```

## How does it work?

Two parameters are needed: An array of keywords that the script should look for and the document where it should retrieve the information from. The array is one-dimensional. In most cases documents are more complex than that. Simple dot-notation is used to dig deeper. That also goes for nested-object, array and nested-arrays:

```javascript
var doc = {
  user: [{
    name: John,
    children: [{
      name: 'Jane',
      age: 9
    }]
  }]
};

var keywords = [
  'user.name',
  'user.children.name',
  'user.children.age'
];
```

## Example

In this example our database is Elastic Search. ES is always also returning information like `_id`, `_index` and `_type`. It is in your interest to not make those information public in order to hide how you operate internally. Furthermore ES is capable of returning a large amount of data in an insanely short amount of time. But in a lot of cases we only need a small portion of that. In order to keep our payload small we should only select only the information we need.

```javascript
var objectSubset = require('object-subset');

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

var subset = objectSubset(keywords, doc);
```

This will return the following:

```json
{
  "_source": {
    "name":"John",
    "children": [{
      "name":"Jane",
      "age":9
    }, {
      "name":"Frank",
      "age":13
    }]
  }
}
```
