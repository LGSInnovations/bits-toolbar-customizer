(() => {
  'use strict';

  const SCOPES = {scopes: ['public']};
  const Messenger = global.helper.Messenger;
  const {REQUESTS} = require('./bits-toolbar-customizer-constants');

  class BitsToolbarCustomizerMessenger extends Messenger {
    constructor(manager) {
      super();
      this._manager = manager;
    }

    load(messageCenter) {
      super.load(messageCenter)
      .then(() => {
        this.addRequestListener(REQUESTS.SET_CUSTOMIZATIONS, SCOPES, this._setCustomizations.bind(this));
        this.addRequestListener(REQUESTS.GET_CUSTOMIZATIONS, SCOPES, this._getCustomizations.bind(this));
      });
    }

    _setCustomizations(meta, data) {
      this._manager.setCustomizations(data);
    }

    _getCustomizations(meta) {
      return Promise.resolve(
        this._manager.getCustomizations());
    }
  }

  module.exports = BitsToolbarCustomizerMessenger

})();
