(() => {
  'use strict';

  const BitsToolbarCustomizerMessenger = require('./bits-toolbar-customizer-messenger');

  const {EVENTS} = require('./bits-toolbar-customizer-queries');

  const path = require('path');

  const SCOPES = {scopes: ['public']};

  const UtilFs = global.utils.UtilFs;

  class BitsToolbarCustomizerManager {

    constructor() {
      this._messenger = new BitsToolbarCustomizerMessenger(this);
    }

    load(messageCenter) {
      this._messageCenter = messageCenter;
      this._messenger.load(messageCenter);
      this._moduleApi = new global.helper.BaseModuleApi(messageCenter);
      this.loadCustomizations();
    }

    setCustomizations(data) {
      console.log(`${JSON.stringify(data, null, 2)}`);
      this._messageCenter.sendEvent(EVENTS.UPDATE_CUSTOMIZATIONS, SCOPES, data);
      // Send "show" and "hide" queries to client, but only persist "hide" queries
      if (data.action === 'hide') {
        this._customizations = data.queries;
        this._hiddenProps = data.hiddenProps;
        this.dumpCustomizations(data);
      }
    }

    dumpCustomizations(data) {
      this._moduleApi.getDataDirectory('bits-toolbar-customizer')
        .then( (dir) => {
          return UtilFs.writeFile(path.resolve(dir, './customizations.json'), JSON.stringify(data, null, 2), {})
            .catch((err) => {
              console.log(`Failed to write toolbar customizations to file: ${err}`)
            });
        });
    }

    loadCustomizations() {
      this._moduleApi.getDataDirectory('bits-toolbar-customizer')
        .then( (dir) => {
          return UtilFs.readFile(path.resolve(dir, './customizations.json'), {})
            .then( (data) => {
              const contents = JSON.parse(data);
              this._customizations = contents.queries;
              this._hiddenProps = contents.hiddenProps;
            })
            .catch((err) => {
              console.log(`Failed to read saved toolbar customizations from file: ${err}`)
            });
        });
    }

    getCustomizations() {
      return {queries: this._customizations, hiddenProps: this._hiddenProps};
    }
  }

  module.exports = BitsToolbarCustomizerManager;

})();
