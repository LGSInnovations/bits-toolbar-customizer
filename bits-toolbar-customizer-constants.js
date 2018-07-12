((global) => {
  'use strict';
  const QUERIES = {
    gallery: {
      query: [
        ['id', 'gallery'],
        ['tagName', 'paper-icon-button']
      ],
      target: 'toolbar'
    },

    logo: {
      query: [
        ['textContent', 'BITS'],
        ['parentNode.parentNode.tagName', 'app-toolbar']
      ],
      target: 'toolbar'
    },

    powerMenu: {
      query: [
        ['id', 'menu'],
        ['parentNode.host.tagName', 'base-system-power-control']
      ],
      target: 'toolbar'
    },

    powerOff: {
      query: [
        ['tagName', 'paper-item'],
        ['textContent', 'Power off']
      ],
      target: 'toolbar'
    },

    reboot: {
        query: [
        ['tagName', 'paper-item'],
        ['textContent', 'Reboot']
      ],
      target: 'toolbar'
    },

    signOut: {
      query: [
        ['tagName', 'paper-item'],
        ['textContent', 'Sign out']
      ],
      target: 'toolbar'
    },

    homeSidebar: {
      query: [
        [ 'tagName', 'base-home']
      ],
      target: 'ownerDocument'
    },

    homeLink: {
      query: [
        ['textContent', 'Home', 'parentNode.parentNode.host.style'],
        ['parentNode.parentNode.host.tagName', 'base-gallery-category', 'parentNode.parentNode.host.style']
      ],
      target: 'ownerDocument'
    },

    dashboard: {
      query: [
        [ 'tagName', 'base-home', null,
          /* If this is null, hide base-home. Otherwise, execute this query on base-home.
          However, this has a flaw. The hidden items will still appear after clicking the
          "Home" link in the gallery, but will be hidden if you refresh the page.*/
          [
            [
              /* See computeSidebar(user) in base-home.html */
              ['textContent', 'Dashboard', 'parentNode.style']
            ]
          ]
        ]
      ],
      target: 'ownerDocument'
    },

    activity: {
      query: [
        [ 'tagName', 'base-home', null,
          /* If this is null, hide base-home. Otherwise, execute this query on base-home.
          However, this has a flaw. The hidden items will still appear after clicking the
          "Home" link in the gallery, but will be hidden if you refresh the page.*/
          [
            [
              /* See computeSidebar(user) in base-home.html */
              ['textContent', 'Activity', 'parentNode.style']
            ]
          ]
        ]
      ],
      target: 'ownerDocument'
    },

    users: {
      query: [
        [ 'tagName', 'base-home', null,
          /* If this is null, hide base-home. Otherwise, execute this query on base-home.
          However, this has a flaw. The hidden items will still appear after clicking the
          "Home" link in the gallery, but will be hidden if you refresh the page.*/
          [
            [
              /* See computeSidebar(user) in base-home.html */
              ['textContent', 'Users', 'parentNode.style']
            ]
          ]
        ]
      ],
      target: 'ownerDocument'
    },

    omgs: {
      query: [
        [ 'tagName', 'base-home', null,
          /* If this is null, hide base-home. Otherwise, execute this query on base-home.
          However, this has a flaw. The hidden items will still appear after clicking the
          "Home" link in the gallery, but will be hidden if you refresh the page.*/
          [
            [
              /* See computeSidebar(user) in base-home.html */
              ['textContent', 'OMGs', 'parentNode.style']
            ]
          ]
        ]
      ],
      target: 'ownerDocument'
    },

    modules: {
      query: [
        [ 'tagName', 'base-home', null,
          /* If this is null, hide base-home. Otherwise, execute this query on base-home.
          However, this has a flaw. The hidden items will still appear after clicking the
          "Home" link in the gallery, but will be hidden if you refresh the page.*/
          [
            [
              /* See computeSidebar(user) in base-home.html */
              ['textContent', 'Modules', 'parentNode.style']
            ]
          ]
        ]
      ],
      target: 'ownerDocument'
    },

    logs: {
      query: [
        [ 'tagName', 'base-home', null,
          /* If this is null, hide base-home. Otherwise, execute this query on base-home.
          However, this has a flaw. The hidden items will still appear after clicking the
          "Home" link in the gallery, but will be hidden if you refresh the page.*/
          [
            [
              /* See computeSidebar(user) in base-home.html */
              ['textContent', 'Logs', 'parentNode.style']
            ]
          ]
        ]
      ],
      target: 'ownerDocument'
    }
  };

  const PREFIX = "bits-toolbar-customizer# ";
  const REQUESTS = {
    SET_CUSTOMIZATIONS: PREFIX + 'set customizations',
    GET_CUSTOMIZATIONS: PREFIX + 'get customizations'
  }

  //Use from client side as well as server side
  if (typeof(module) != 'undefined') {
    module.exports = {QUERIES, REQUESTS};
  }
  global.TOOLBAR_CUSTOMIZER = global.TOOLBAR_CUSTOMIZER || {};
  global.TOOLBAR_CUSTOMIZER.QUERIES = QUERIES;
  global.TOOLBAR_CUSTOMIZER.REQUESTS = REQUESTS;
})(this);
