import PropertyBindings from 'ember-binding-macros/mixins/property-bindings';

export function initialize() {
  Ember.Object.prototype.concatenatedProperties.push('propertyBindings');
  Ember.Object.reopen(PropertyBindings);
}

export default {
  name: 'property-bindings',
  initialize: initialize
};
