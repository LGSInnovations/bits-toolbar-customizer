((global) => {
  'use strict';

  /*
  * The queries below are used to select DOM nodes and specify a change to be made
  * to a string-valued property or sub-property of the selected node. Items are
  * specified with a query consisting of one or more arrays of search criteria.
  * The search criteria are applied to a target DOM node specified for each query
  * (currently either the BITS toolbar or the entire document).
  *
  * Search criteria are specified as an array of objects, each of which contain
  * up to three properties, two mandatory and two optional:
  *
  *   key:      A key representing a child property of the target node to match. The key
  *             key may be a dot-separated path which identifies a sub-property, e.g.
  *             <someChildNode.someChildNode.someProperty>.
  *   value:    A string value to match against the specified key.
  *   setter:   (Optional) An object which specifies a mutation to apply to the selected
  *             node. The default mutation applied if this object is not provided is
  *             <selected node>.style.display='none'
  *   subquery: (Optional) A sub-query consisting of one or more search objects with required
  *             properties only (i.e. there are no nested sub-queries). If the sub-query
  *             property is present, instead of mutating the selected node when found, the
  *             sub-query will be executed with the selected node as the target node.
  *
  * The setter object defined above contains three required properties:
  *
  *   path:     A dot-separated path represseting the parent node of the property to be mutated
  *   node:     The name of the property to be mutated
  *   value:    The value to be set on the node.
  *
  * A single query or a collection of queries may be submitted. In the latter case,
  * the node(s) selected by each query will be mutated if matched. When more than one
  * arrays of search criteria are provided for a query, the node will be mutated if
  * exactly all criteria match. If more than one node matches a set of search criteria,
  * all of them will be mutated.
  *
  * Examples:
  *
  * 1) The following query will search the toolbar for 'paper-icon-button' elements
  *    with an id of 'gallery'. All such elements found will be hidden.
  *
  *   gallery: {
  *     query: [
  *       {key: 'id', value: 'gallery'},
  *       {key: 'tagName', value: 'paper-icon-button'}
  *
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
  *       {
  *         key: 'textContent',
  *         value: 'Home',
  *         setter: {
  *           path: 'parentNode.parentNode.host.style',
  *           node: 'display',
  *           value: 'none'
  *         }
  *       },
  *       {
  *         key: 'parentNode.parentNode.host.tagName',
  *         value: 'base-gallery-category',
  *         setter: {
  *           path: 'parentNode.parentNode.host.style',
  *           node: 'display',
  *           value: 'none'
  *         }
  *       }
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
  *       {key: 'tagName', value: 'base-home',
  *         subquery: [
  *           {
  *             key: 'textContent',
  *             value: 'Dashboard',
  *             setter: {
  *               path: 'parentNode.style',
  *               node: 'display',
  *               value: 'none'
  *             }
  *           }
  *         ]
  *       }
  *     ],
  *     target: 'ownerDocument'
  *   }
  */
  const QUERIES = {
    // Entire toolbar
    toolbar: {

      query: [
          { key: 'id', value: 'toolbar' },
          { key: 'tagName', value: 'base-toolbar'}
      ],
      setters: [
        {path: 'style', node: 'display', value: 'none'},
        {path: 'parentNode.style', node: 'display', value: 'none'}
      ],
      callers: [
        {path: 'parentElement.parentElement', func: 'resetLayout'}
      ],
      target: 'ownerDocument'
    },
    // Stack icon on left side of toolbar, defined in base-toolbar.html
    gallery: {
      query: [
        {key: 'id', value: 'gallery'},
        {key: 'tagName', value: 'paper-icon-button'}
      ],
      target: 'toolbar'
    },

    // BITS label in toolbar next to gallery, defined in base-toolbar.html
    logo: {
      query: [
        {key: 'textContent', value: 'BITS'},
        {key : 'parentNode.parentNode.tagName', value: 'app-toolbar'}
      ],
      target: 'toolbar'
    },

    // Power menu items, defined in 'base-system-power-control.html'
    powerMenu: {
      query: [
        {key: 'id', value: 'menu'},
        {key: 'parentNode.host.tagName', value: 'base-system-power-control'}
      ],
      target: 'toolbar'
    },

    // Power menu item defined in 'base-system-power-control.html'
    powerOff: {
      query: [
        {key: 'tagName', value: 'paper-item'},
        {key: 'textContent', value: 'Power off'}
      ],
      target: 'toolbar'
    },

    // Power menu item defined in 'base-system-power-control.html'
    reboot: {
        query: [
          {key: 'tagName', value: 'paper-item'},
          {key: 'textContent', value: 'Reboot'}
      ],
      target: 'toolbar'
    },

    // Power menu item defined in 'base-system-power-control.html'
    signOut: {
      query: [
        {key:'tagName', value: 'paper-item'},
        {key: 'textContent', value: 'Sign out'}
      ],
      target: 'toolbar'
    },

    // The Home link in the sidebar. Defined in base-gallery.html.
    home: {
      query: [
        {key: 'textContent',value: 'Home'},
        {key: 'parentNode.parentNode.host.tagName', value: 'base-gallery-category'}
      ],
      setters: [
        {path: 'parentNode.parentNode.host.style', node: 'display', value: 'none'}
      ],
      // The Home sidebar (displayed at server route /home). Defined in base-home.html.
      subquery: {
        query: [
            {key: 'tagName', value: 'base-home'}
        ],
        setters: [
          {path: 'style', node: 'display', value: 'none'}
        ],
        target: 'ownerDocument',
        noPreemptMain: true
      },
      target: 'ownerDocument'
    },

    /* The following queries select individual items displayed in the home sidebar.
       Select one or more of these as an alternative to hiding the entire home
       sidebar (queries homeSidebar and homeLink). See computeSidebar(user) in base-home.html

       If more than one of these queries is used, a single query will be made with base-home
       as the initial query and the home items contained in the array at path
       query[0].subquery.query. Thus for these individual queries there must be exactly one
       search object in the query and subquery.query arrays. The queries are combined in
       function getOptimizedHomeItemsQuery. See line 333 for handling of the carindality
       explained above.

       NB: This is currently not working properly. The hidden items will still appear
       after clicking the "Home" link in the gallery, but will be hidden if you refresh the page.
     */

    dashboard: {
      query: [
        {key: 'tagName', value: 'base-home'}
      ],
      subquery: {
        query: [
          {key: 'textContent', value: 'Dashboard'}
        ],
        setters: [
          {path: 'parentNode.style', node: 'display', value: 'none'}
        ]
      },
      target: 'ownerDocument'
    },

    activity: {
      query: [
        {key: 'tagName', value: 'base-home'}
      ],
      subquery: {
        query: [
          {key: 'textContent', value: 'Activity'}
        ],
        setters: [
          {path: 'parentNode.style', node: 'display', value: 'none'}
        ]
      },
      target: 'ownerDocument'
    },

    users: {
      query: [
        {key: 'tagName', value: 'base-home'}
      ],
      subquery: {
        query: [
          {key: 'textContent', value: 'Users'}
        ],
        setters: [
          {path: 'parentNode.style', node: 'display', value: 'none'}
        ]
      },
      target: 'ownerDocument'
    },

    omgs: {
      query: [
        {key: 'tagName', value: 'base-home'}
      ],
      subquery: {
        query: [
          {key: 'textContent', value: 'OMGs'}
        ],
        setters: [
          {path: 'parentNode.style', node: 'display', value: 'none'}
        ]
      },
      target: 'ownerDocument'
    },

    modules: {
      query: [
        {key: 'tagName', value: 'base-home'}
      ],
      subquery: {
        query: [
          {key: 'textContent', value: 'Modules'}
        ],
        setters: [
          {path: 'parentNode.style', node: 'display', value: 'none'}
        ]
      },
      target: 'ownerDocument'
    },

    logs: {
      query: [
        {key: 'tagName', value: 'base-home'}
      ],
      subquery: {
        query: [
          {key: 'textContent', value: 'Logs'}
        ],
        setters: [
          {path: 'parentNode.style', node: 'display', value: 'none'}
        ]
      },
      target: 'ownerDocument'
    },

    /**
    * When hiding multile home sidebar items, there will be multiple queries with
    * <base-home> as the target, each with a different subquery for the item to
    * be hidden. This function combines them into a single query with <base-home>
    * as the target and an array of subqueries for the items to be hidden.
    */
    getOptimizedHomeItemsQuery: function(queries) {
      const query = queries.shift();
      return queries.reduce( (accum, val, idx, arr) => {
          accum.subquery.query.push(val.subquery.query[0]);
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

  /**
  * The "show" and "hide" wrapper functions mutate the queries to be "show" or
  * "hide" queries, respectively. We clone them to avoid mutating the base instance
  * of each query.
  */
  const cloneQuery = function(query) {
    const query_copy = {query: [], target: query.target};
    query.query.forEach( (search) => {
      query_copy.query.push(Object.assign({}, search));
    });
    if (query.setters) {
      query_copy.setters = [];
      query.setters.forEach( (setter) => {
        query_copy.setters.push(Object.assign({}, setter));
      });
    }
    if (query.callers) {
      query_copy.callers = [];
      query.callers.forEach( (caller) => {
        query_copy.callers.push(Object.assign({}, caller));
      });
    }
    if (query.subquery) {
      query_copy.subquery = {};
      query_copy.subquery.query = [];
      query.subquery.query.forEach( (search) => {
        query_copy.subquery.query.push(Object.assign({}, search))
      });
      if (query.subquery.setters) {
        query_copy.subquery.setters = [];
        query.subquery.setters.forEach( (setter) => {
          query_copy.subquery.setters.push(Object.assign({}, setter));
        });
      }
      if (query.subquery.target) {
        query_copy.subquery.target = query.subquery.target;
      }
      if (query.subquery.noPreemptMain) {
        query_copy.subquery.noPreemptMain = query.subquery.noPreemptMain;
      }
    }
    return query_copy;
  }

  /**
  * A wrapper function which mutates a query to be a "show" query. "Show" queries
  * enable us to immediately un-hide an item without refreshing the page.
  */
  const show = function(query) {
    query = cloneQuery(query);
    if (query.subquery) {
      if (query.subquery.setters) {
        query.subquery.setters.forEach( (setter) => {
          if (setter.node === 'display') {
            setter.value = "inline";
          }
        });
      } else {
        query.subquery.setters = [{path: 'style', node: 'display', value: 'inline'}]
      }
    }
    if (query.setters) {
      query.setters.forEach( (setter) => {
        if (setter.node === 'display') {
          setter.value = 'inline';
        }
      })
    } else {
      query.setters = [{path: 'style', node: 'display', value: 'inline'}];
    }
    return query;
  }

  /**
  * A wrapper function which mutates a query to be a "hide" query.
  */
  const hide = function(query) {
    query = cloneQuery(query);
    if (query.subquery) {
      if (query.subquery.setters) {
        query.subquery.setters.forEach( (setter) => {
          if (setter.node === 'display') {
            setter.value = "none";
          }
        });
      }
    }
    if (query.setters) {
      query.setters.forEach( (setter) => {
        if (setter.node === 'display') {
          setter.value = 'none';
        }
      });
    }
    return query;
  }


  //Use from uncompiled browser or node.js context
  if (typeof(module) != 'undefined') {
    module.exports = {QUERIES, REQUESTS, EVENTS};
  }
  global.TOOLBAR_CUSTOMIZER = global.TOOLBAR_CUSTOMIZER || {};
  global.TOOLBAR_CUSTOMIZER.QUERIES = QUERIES;
  global.TOOLBAR_CUSTOMIZER.REQUESTS = REQUESTS;
  global.TOOLBAR_CUSTOMIZER.EVENTS = EVENTS;
  global.TOOLBAR_CUSTOMIZER.show = show;
  global.TOOLBAR_CUSTOMIZER.hide = hide;
})(this);
