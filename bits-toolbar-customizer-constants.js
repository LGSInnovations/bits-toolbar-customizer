((global) => {
  'use strict';

  /*
  * The queries below are used to select UI items to hide. Items are specified
  * with a query consisting of one or more arrays of search criteria. The search
  * criteria are applied to a target DOM node specified for each query (currently
  * either the BITS toolbar or the entire document).
  *
  * Search criteria are specified as an array of at least two and no more than four
  * items, as follows:
  *
  * 0: A key representing a child property of the target node to match. The key may
  *    be a dot-separated path, e.g. <someChildNode.someChildNode.someProperty>.
  * 1: A string value to match against the specified key.
  * 2: (Optional) A dot-separated path specifying the object to be hidden if the
  *    node is found. The object must have a 'display' property (which will be set
  *    to 'none' if the node is found). The default is 'style' (i.e. hide the node
  *    itself). For example, to hide a node's parent, specify 'parentNode.style'.
  * 3: (Optional) A sub-query consisting of search criteria items 0 through 3 (i.e.
  *    you cannot nest sub-queries). If a sub-query is present, instead of hiding
  *    the selected node when found, the sub-query will be executed with the selected
  *    node as the target node.
  *
  * A single query or a collection of queries may be submitted. In the latter case,
  * the node(s) selected by each query will be hidden if matched. When more than one
  * arrays of search criteria are provided for a query, the node will be hidden if
  * exactly all criteria match. If more than one node matches a set of search criteria,
  * all of them will be hidden.
  *
  * Examples:
  *
  * 1) The following query will search the toolbar for 'paper-icon-button' elements
  *    with an id of 'gallery'. All such elements found will be hidden.
  *
  *   gallery: {
  *     query: [
  *       ['id', 'gallery'],
  *       ['tagName', 'paper-icon-button']
  *     ],
  *     target: 'toolbar'
  *   }
  *
  * 2) The following query will search the entire document for a 'base-host-gallery'
  *   element whose grandparent's host element is a 'base-gallery-category' element.
  *   If found, the element's grandparent's host element will be hidden.
  *
  *   homeLink: {
  *     query: [
  *       ['textContent', 'Home', 'parentNode.parentNode.host.style'],
  *       ['parentNode.parentNode.host.tagName', 'base-gallery-category', 'parentNode.parentNode.host.style']
  *     ],
  *     target: 'ownerDocument'
  *   }
  *
  * 3) The following query will search the entire document for the 'base-home'
  * element. If found, that element will be searched for a node whose text node
  * has the value 'Dashboard'. If that node is found, its parent node will be hidden.
  *
  *   dashboard: {
  *     query: [
  *       [ 'tagName', 'base-home', null,
  *         [
  *           ['textContent', 'Dashboard', 'parentNode.style']
  *         ]
  *       ]
  *     ],
  *     target: 'ownerDocument'
  *   }
  */
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
        [
          'parentNode.parentNode.host.tagName',
          'base-gallery-category',
          ['parentNode.parentNode.host.style', 'display=none']
        ]
      ],
      target: 'ownerDocument'
    },

    /* The following queries select individual items displayed in the home sidebar.
       Select one or more of these as an alternative to hiding the entire home
       sidebar (queries homeSidebar and homeLink). See computeSidebar(user) in base-home.html

       If more than one of these queries is used, a single query will be made with base-home
       as the initial query and the home items combined into an array and specified as a
       collection of sub-queries. Each sub-query must contain exactly one search criteria array.

       NB: This is currently not working properly. The hidden items will still appear
       after clicking the "Home" link in the gallery, but will be hidden if you refresh the page.
     */

    dashboard: {
      query: [
        [ 'tagName', 'base-home', null,
          [
            [
              'textContent',
              'Dashboard',
              ['parentNode.style', 'display=none']
            ]
          ]
        ]
      ],
      target: 'ownerDocument'
    },

    activity: {
      query: [
        [ 'tagName', 'base-home', null,
          [
            [
              'textContent',
              'Activity',
              ['parentNode.style', 'display=none']
            ]
          ]
        ]
      ],
      target: 'ownerDocument'
    },

    users: {
      query: [
        [ 'tagName', 'base-home', null,
          [
            [
              'textContent',
              'Users',
              ['parentNode.style', 'display=none']
            ]
          ]
        ]
      ],
      target: 'ownerDocument'
    },

    omgs: {
      query: [
        [ 'tagName', 'base-home', null,
          [
            [
              'textContent',
              'OMGs',
              ['parentNode.style', 'display=none']
            ]
          ]
        ]
      ],
      target: 'ownerDocument'
    },

    modules: {
      query: [
        [ 'tagName', 'base-home', null,
          [
            [
              'textContent',
              'Modules',
              ['parentNode.style', 'display=none']
            ]
          ]
        ]
      ],
      target: 'ownerDocument'
    },

    logs: {
      query: [
        [ 'tagName', 'base-home', null,
          [
            [
              'textContent',
              'Logs',
              ['parentNode.style', 'display=none']
            ]
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

  const EVENTS = {
    UPDATE_CUSTOMIZATIONS: PREFIX + "update customizations"
  }

  //Use from uncompiled browser or node.js context
  if (typeof(module) != 'undefined') {
    module.exports = {QUERIES, REQUESTS, EVENTS};
  }
  global.TOOLBAR_CUSTOMIZER = global.TOOLBAR_CUSTOMIZER || {};
  global.TOOLBAR_CUSTOMIZER.QUERIES = QUERIES;
  global.TOOLBAR_CUSTOMIZER.REQUESTS = REQUESTS;
  global.TOOLBAR_CUSTOMIZER.EVENTS = EVENTS;
})(this);
