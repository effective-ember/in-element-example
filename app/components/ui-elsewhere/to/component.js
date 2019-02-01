import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { guidFor } from '@ember/object/internals';

export default Component.extend({
  tagName: '',

  elsewhere: service(),

  guid: computed(function() {
    return guidFor(this);
  }),

  containerElement: computed('name', function() {
    return document.querySelector(`[data-in-element-container="${this.name}"]`);
  }),

  isActive: computed('elsewhere.containers', function() {
    const containerSlot = this.elsewhere.containerSlotByName(this.name);

    return containerSlot.lastObject === this.guid;
  }),

  didInsertElement() {
    this._super(...arguments);

    this.elsewhere.addTo(this.name, this.guid);
  },

  willDestroyElement() {
    this.elsewhere.removeFrom(this.name, this.guid);
  }
});