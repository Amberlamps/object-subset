# object-subset

## What is it about?

Object-subset is a tool to conveniently create a subset of a given tool by defining corresponding fields. This is incredibly helpful if you are serving an API or other end point that is fetching data from your MongoDB, Elastic Search or any other database that is at least able to return the results as JSON. In most cases you do not want to return the raw data because first of all it may contain information that is not meant for the public and secondly just because we can, does not mean we should put an unnecessary high payload on the wire.

## How does it work?

Two parameters are needed: An array of keywords that the script should look for and the document where it should retrieve the information from. The array is one-dimensional. In most cases documents are more complex than that. Simple dot-notation is used to dig deeper. That also goes for nested-object, array and nested-arrays:

```
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
  'user.name.children.name',
  'user.name.children.age'
];
```

## Install

```npm install object-subset```

## Example

In this example our database is Elastic Search. ES is always also returning information like `_id`, `_index` and `_type`. It is in your interest to not make those information public in order to hide how you operate internally. Furthermore ES is capable of returning a large amount of data in an insanely short amount of time. But in a lot of cases we only need a small portion of that. In order to keep our payload small we should only select only the information we need
