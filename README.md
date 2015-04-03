# Ember Binding Macros
[![npm version](https://badge.fury.io/js/ember-binding-macros.svg)](http://badge.fury.io/js/ember-binding-macros)
[![Ember Observer Score](http://emberobserver.com/badges/ember-binding-macros.svg)](http://emberobserver.com/addons/ember-binding-macros)
[![Build Status](https://travis-ci.org/cowboyd/ember-binding-macros.png?branch=master)](https://travis-ci.org/cowboyd/ember-binding-macros)



Ember has a great data binding system that is used in its
templates. There is also a limited object syntax for it.

This addon enhances that syntax by letting you bind any property of an
object to any other property by giving it a `propertyBindings` array:

```js
var Staircase = Ember.Object.create({
  propertyBindings: ['fourth > third', 'third > second', 'second > first']
})

var stairs = Staircase.create({
  fourth: 'Redpaint'
})

stairs.get('third') //=> Redpaint
stairs.get('second') //=> Redpaint
stairs.get('first') //=> Redpaint

stairs.set('third', 'Bluepaint') //=> Bluepaint

stairs.get('second') //=> Bluepaint
stairs.get('first') //=> Bluepaint
stairs.get('fourth') // Redpaint


```

## Installation

* `git clone` this repository
* `npm install --save ember-binding-macros`


## Running Tests

* `ember test`
* `ember test --server`
