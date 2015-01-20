import Ember from 'ember';

function parseSpecifier(spec) {
  var match;
  var normal = spec.replace(/\s+/g, '');
  if ((match = normal.match(/(.+)<>(.+)/))) {
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

export default Ember.Mixin.create({
  __initializePropertyBindings__: Ember.observer(function() {
    var _this = this;
    this.get('propertyBindings').forEach(function(specifier) {
      var spec = parseSpecifier(specifier);
      var binding = Ember.Binding.from(spec.from).to(spec.to);
      if (spec.oneWay) {
        binding.oneWay();
      }
      //console.log('binding', binding.toString());
      binding.connect(_this);
    });
  }).on('init')
});
