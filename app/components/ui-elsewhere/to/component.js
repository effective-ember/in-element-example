import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  containerElement: computed('name', function() {
    return document.querySelector(`[data-in-element-container="${this.name}"]`);
  })
})