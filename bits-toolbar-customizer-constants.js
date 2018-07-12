((global) => {
  'use strict';
  const QUERIES = {
    // Stack icon on left side of toolbar, defined in base-toolbar.html
    gallery: {
      query: [
        ['id', 'gallery'],
        ['tagName', 'paper-icon-button']
      ],
      target: 'toolbar'
    },

    // BITS label in toolbar next to gallery, defined in base-toolbar.html
    logo: {
      query: [
        ['textContent', 'BITS'],
        ['parentNode.parentNode.tagName', 'app-toolbar']
      ],
      target: 'toolbar'
    },

    // Power menu items, defined in 'base-system-power-control.html'
    powerMenu: {
      query: [
        ['id', 'menu'],
        ['parentNode.host.tagName', 'base-system-power-control']
      ],
      target: 'toolbar'
    },

    // Power menu item defined in 'base-system-power-control.html'
    powerOff: {
      query: [
        ['tagName', 'paper-item'],
        ['textContent', 'Power off']
      ],
      target: 'toolbar'
    },

    // Power menu item defined in 'base-system-power-control.html'
    reboot: {
        query: [
        ['tagName', 'paper-item'],
        ['textContent', 'Reboot']
      ],
      target: 'toolbar'
    },

    // Power menu item defined in 'base-system-power-control.html'
    signOut: {
      query: [
        ['tagName', 'paper-item'],
        ['textContent', 'Sign out']
      ],
      target: 'toolbar'
    },

    /* The Home sidebar (displayed at server route /home). Defined in base-home.html. */
    homeSidebar: {
      query: [
        [ 'tagName', 'base-home']
      ],
      target: 'ownerDocument'
    },

    // The Home link in the sidebar. Defined in base-gallery.html.
    homeLink: {
      query: [
        ['textContent', 'Home', 'parentNode.parentNode.host.style'],
        ['parentNode.parentNode.host.tagName', 'base-gallery-category', 'parentNode.parentNode.host.style']
      ],
      target: 'ownerDocument'
    },

    /* The following queries select individual items displayed in the home sidebar.
       Select one or more of these as an alternative to hiding the entire home
       sidebar (queries homeSidebar and homeLink). See computeSidebar(user) in base-home.html

       One or more of these can be added to an array and submitted as a sub

       NB: This is currently not working properly. The hidden items will still appear
       after clicking the "Home" link in the gallery, but will be hidden if you refresh the page
     */

    dashboard: {
      query: [
        [ 'tagName', 'base-home', null,
          [
            ['textContent', 'Dashboard', 'parentNode.style']
          ]
        ]
      ],
      target: 'ownerDocument'
    },

    activity: {
      query: [
        [ 'tagName', 'base-home', null,
          [
            ['textContent', 'Activity', 'parentNode.style']
          ]
        ]
      ],
      target: 'ownerDocument'
    },

    users: {
      query: [
        [ 'tagName', 'base-home', null,
          [
            ['textContent', 'Users', 'parentNode.style']
          ]
        ]
      ],
      target: 'ownerDocument'
    },

    omgs: {
      query: [
        [ 'tagName', 'base-home', null,
          [
            ['textContent', 'OMGs', 'parentNode.style']
          ]
        ]
      ],
      target: 'ownerDocument'
    },

    modules: {
      query: [
        [ 'tagName', 'base-home', null,
          [
            ['textContent', 'Modules', 'parentNode.style']
          ]
        ]
      ],
      target: 'ownerDocument'
    },

    logs: {
      query: [
        [ 'tagName', 'base-home', null,
          [
            ['textContent', 'Logs', 'parentNode.style']
          ]
        ]
      ],
      target: 'ownerDocument'
    },

    getOptimizedHomeItemsQuery: function(queries) {
      const query = queries.shift();
      return queries.reduce( (accum, val, idx, arr) => {
          accum[0][3].push(val[0][3][0]);
          return accum;
      }, query);
    }
  };

  const PREFIX = "bits-toolbar-customizer# ";
  const REQUESTS = {
    SET_CUSTOMIZATIONS: PREFIX + 'set customizations',
    GET_CUSTOMIZATIONS: PREFIX + 'get customizations'
  }

  //Use from uncompiled browser or node.js context
  if (typeof(module) != 'undefined') {
    module.exports = {QUERIES, REQUESTS};
  }
  global.TOOLBAR_CUSTOMIZER = global.TOOLBAR_CUSTOMIZER || {};
  global.TOOLBAR_CUSTOMIZER.QUERIES = QUERIES;
  global.TOOLBAR_CUSTOMIZER.REQUESTS = REQUESTS;
})(this);
