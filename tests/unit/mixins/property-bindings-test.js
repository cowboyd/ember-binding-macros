/* jshint expr:true */
import Ember from 'ember';
import PropertyBindingsMixin from 'ember-binding-macros/mixins/property-bindings';
import startApp from '../../helpers/start-app';

describe('PropertyBindingsMixin', function() {
  var object;
  function setup(options) {
    object = Ember.Object.createWithMixins(PropertyBindingsMixin, options);
  }

  describe('binding one-way from left to right', function() {
    beforeEach(function() {
      setup({
        propertyBindings: ['left > right'],
        left: 5
      });
    });

    it('copies from left to right', function() {
      expect(object.get('right')).to.equal(5);
    });

    describe('. Setting the right however', function() {
      beforeEach(function() {
        object.set('right', 10);
      });
      it('has no effect', function() {
        expect(object.get('left')).to.equal(5);
      });
    });

  });

  describe('binding one way bind from right to left', function() {
    beforeEach(function() {
      setup({
        propertyBindings: ['left < right'],
        right: 5
      });
    });
    it('copies the value', function() {
      expect(object.get('left')).to.equal(5);
    });
    describe('setting the left', function() {
      beforeEach(function() {
        object.set('left', 10);
      });
      it('has no effect', function() {
        expect(object.get('right')).to.equal(5);
      });
    });

  });
  describe('binding both ways', function() {
    beforeEach(function() {
      setup({
        propertiesBindings: ['left <> right'],
        left: 5
      });
      it("copies the value from left to right", function() {
        expect(object.get('right')).to.equal(5);
      });
      describe("setting the right", function() {
        beforeEach(function() {
          object.set('right', 10);
        });
        it("copies the value from right to left", function() {
          expect(object.get('left')).to.equal(10);
        });
      });
    });

  });

  describe('nested properties', function() {
    beforeEach(function() {
      setup({
        propertyBindings: ['one.source > two.dest'],
        one: {
          source: 'Hi'
        },
        two: {
          dest: 'Bye'
        }
      });
    });
    it("can still bind", function() {
      expect(object.get('two.dest')).to.equal('Hi');
    });
  });

});
