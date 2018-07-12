(() => {
  'use strict';

  const BitsToolbarCustomizerMessenger = require('./bits-toolbar-customizer-messenger');

  const {EVENTS} = require('./bits-toolbar-customizer-constants');
  
  const SCOPES = {scopes: ['public']};

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
      this._customizations = data.queries;
      this._hiddenProps = data.hiddenProps;
      this._messageCenter.sendEvent(EVENTS.UPDATE_CUSTOMIZATIONS, SCOPES, data);
    }

    getCustomizations() {
      return {queries: this._customizations, hiddenProps: this._hiddenProps};
    }
  }

  module.exports = BitsToolbarCustomizerManager;

})();
