(() => {
  'use strict';

  const BitsToolbarCustomizerMessenger = require('./bits-toolbar-customizer-messenger');

  class BitsToolbarCustomizerManager {

    constructor() {
      this._messenger = new BitsToolbarCustomizerMessenger(this);
    }

    load(messageCenter) {
      this._messageCenter = messageCenter;
      this._messenger.load(messageCenter);
    }

    setCustomizations(data) {
      console.log(`set customization ${JSON.stringify(data, null, 2)}`);
      this._customizations = data;
    }

    getCustomizations() {
      return this._customizations;
    }
  }

  module.exports = BitsToolbarCustomizerManager;

})();
