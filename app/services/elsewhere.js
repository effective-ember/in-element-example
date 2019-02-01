import Service from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

export default Service.extend({
  containers: null,

  init() {
    this._super(...arguments);

    this.set('containers', {});
  },

  addTo(name, guid) {
    let containerSlot = this.containerSlotByName(name);

    containerSlot.pushObject(guid);

    scheduleOnce('afterRender', this, '_notify');
  },

  removeFrom(name, guid) {
    let containerSlot = this.containerSlotByName(name);

    if (containerSlot) {
      containerSlot.removeObject(guid);
      scheduleOnce('afterRender', this, '_notify');
    }
  },

  containerSlotByName(name) {
    if (Object.keys(this.containers).indexOf(name) === -1) {
      this.set(`containers.${name}`, []);
    }

    const containerSlot = this.get(`containers.${name}`);
    return containerSlot;
  },

  _notify() {
    this.notifyPropertyChange('containers');
  }
});