
(() => {
  'use strict';

  const logger = global.LoggerFactory.getLogger();
  const Messenger = global.helper.Messenger;
  const CrudApi = global.helper.CrudApi;
  const CrudManager = global.helper.CrudManager;

  const BitsToolbarCustomizerManager = require('./bits-toolbar-customizer-manager');

  class BitsToolbarCustomizerApp{
    /**
     * Called when the module is constructed.
     */
    constructor() {
      this._messenger = new Messenger();
      this._manager = new BitsToolbarCustomizerManager();
    }

    /**
     * Called by BITS when the module is loaded.
     *
     * @param {object} messageCenter - the BITS message center object
     */
    load(messageCenter) {
      logger.info('Loading Bits Toolbar Customizer!');

      this._manager.load(messageCenter);

      this._toolbarItemApi = new CrudApi('base#ToolbarItems', messageCenter, {scopes: null});

      this._messenger.load(messageCenter)
      .then(() => {
        console.log('Creating toolbar item');
        return this._toolbarItemApi.create({
          primary: {
            href: '/elements/bits-toolbar-customizer/bits-toolbar-customizer.html',
            tag: 'bits-toolbar-customizer'
          }
        });
      })
    }

    /**
     * Called by BITS when the module is unloaded.
     *
     * @return {any} - the return value is ununsed
     */
    unload() {
      return Promise.resolve()
        .then(() => this._messenger.unload())
    }

  }

  module.exports = new BitsToolbarCustomizerApp();

})();
