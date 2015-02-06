import Ember from 'ember';

function parseSpecifier(spec) {
  if (!spec) {
    return null;
  }
  var match;
  var normal = spec.replace(/\s+/g, '');
  if ((match = normal.match(/^(.+)<>(.+)$/))) {
    return {
      oneWay: false,
      from: match[1],
      to: match[2]
    };
  } else if ((match = normal.match(/^(.+)>(.+)$/))) {
    return {
      oneWay: true,
      from: match[1],
      to: match[2]
    };
  } else if ((match = normal.match(/^(.+)<(.+)$/))) {
    return {
      oneWay: true,
      from: match[2],
      to: match[1]
    };
  } else {
    throw new Error("invalid property binding specifier '"+ spec + "'");
  }
}

function bindingsFor(obj) {
  var meta = Ember.meta(obj);
  if (!meta.propertyBindings) {
    meta.propertyBindings = [];
  }
  return meta.propertyBindings;
}

export default Ember.Mixin.create({
  __initializePropertyBindings__: Ember.observer(function() {
    var bindings = bindingsFor(this);
    var specifiers = this.get('propertyBindings') || [];

    specifiers.forEach(function(specifier) {
      var spec = parseSpecifier(specifier);
      if (spec) {
        var binding = Ember.Binding.from(spec.from).to(spec.to);
        if (spec.oneWay) {
          binding.oneWay();
        }
        binding.connect(this);
        bindings.push(binding);
      }
    }, this);
  }).on('init'),

  willDestroy: function() {
    var bindings = bindingsFor(this);
    bindings.forEach(function(binding) {
      binding.disconnect(this);
    }, this);
    this._super.apply(this, arguments);
  }
});
