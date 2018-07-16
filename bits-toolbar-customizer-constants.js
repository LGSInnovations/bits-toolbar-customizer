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
    // Stack icon on left side of toolbar, defined in base-toolbar.html
    gallery: {
      query: [
        {key: 'id', value: 'gallery', setter: null},
        {key: 'tagName', value: 'paper-icon-button', setter: null}
      ],
      target: 'toolbar'
    },

    // BITS label in toolbar next to gallery, defined in base-toolbar.html
    logo: {
      query: [
        {key: 'textContent', value: 'BITS', setter: null},
        {key : 'parentNode.parentNode.tagName', value: 'app-toolbar', setter: null}
      ],
      target: 'toolbar'
    },

    // Power menu items, defined in 'base-system-power-control.html'
    powerMenu: {
      query: [
        {key: 'id', value: 'menu', setter: null},
        {key: 'parentNode.host.tagName', value: 'base-system-power-control', setter: null}
      ],
      target: 'toolbar'
    },

    // Power menu item defined in 'base-system-power-control.html'
    powerOff: {
      query: [
        {key: 'tagName', value: 'paper-item', setter: null},
        {key: 'textContent', value: 'Power off', setter: null}
      ],
      target: 'toolbar'
    },

    // Power menu item defined in 'base-system-power-control.html'
    reboot: {
        query: [
        {key: 'tagName', value: 'paper-item', setter: null},
        {key: 'textContent', value: 'Reboot', setter: null}
      ],
      target: 'toolbar'
    },

    // Power menu item defined in 'base-system-power-control.html'
    signOut: {
      query: [
        {key:'tagName', value: 'paper-item', setter: null},
        {key: 'textContent', value: 'Sign out', setter: null}
      ],
      target: 'toolbar'
    },

    /* The Home sidebar (displayed at server route /home). Defined in base-home.html. */
    homeSidebar: {
      query: [
        {key: 'tagName', value: 'base-home', setter: null}
      ],
      target: 'ownerDocument'
    },

    // The Home link in the sidebar. Defined in base-gallery.html.
    homeLink: {
      query: [
        {
          key: 'textContent',
          value: 'Home',
          setter: {
            path: 'parentNode.parentNode.host.style',
            node: 'display',
            value: 'none'
          }
        },
        {
          key: 'parentNode.parentNode.host.tagName',
          value: 'base-gallery-category',
          setter: {
            path: 'parentNode.parentNode.host.style',
            node: 'display',
            value: 'none'
          }
        }
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
        {key: 'tagName', value: 'base-home',
          subquery: [
            {
              key: 'textContent',
              value: 'Dashboard',
              setter: {
                path: 'parentNode.style',
                node: 'display',
                value: 'none'
              }
            }
          ]
        }
      ],
      target: 'ownerDocument'
    },

    activity: {
      query: [
        { key: 'tagName', value: 'base-home',
          subquery: [
            {
              key: 'textContent',
              value: 'Activity',
              setter: {
                path: 'parentNode.style',
                node: 'display',
                value: 'none'
              }
            }
          ]
        }
      ],
      target: 'ownerDocument'
    },

    users: {
      query: [
        { key: 'tagName', value: 'base-home',
          subquery: [
            {
              key: 'textContent',
              value: 'Users',
              setter: {
                path: 'parentNode.style',
                node: 'display',
                value: 'none'
              }
            }
          ]
        }
      ],
      target: 'ownerDocument'
    },

    omgs: {
      query: [
        { key: 'tagName', value: 'base-home',
          subquery: [
            {
              key: 'textContent',
              value: 'OMGs',
              setter: {
                path: 'parentNode.style',
                node: 'display',
                value: 'none'
              }
            }
          ]
        }
      ],
      target: 'ownerDocument'
    },

    modules: {
      query: [
        { key: 'tagName', value: 'base-home',
          subquery: [
            {
              key: 'textContent',
              value: 'Modules',
              setter: {
                path: 'parentNode.style',
                node: 'display',
                value: 'none'
              }
            }
          ]
        }
      ],
      target: 'ownerDocument'
    },

    logs: {
      query: [
        { key: 'tagName', value: 'base-home',
          subquery: [
            {
              key: 'textContent',
              value: 'Logs',
              setter: {
                path: 'parentNode.style',
                node: 'display',
                value: 'none'
              }
            }
          ]
        }
      ],
      target: 'ownerDocument'
    },

    getOptimizedHomeItemsQuery: function(queries) {
      const query = queries.shift();
      return queries.reduce( (accum, val, idx, arr) => {
          accum[0].subquery.push(val[0].subquery[0]);
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

  const show = function(query) {
    query.query.forEach( (_query) => {
      if ('setter' in _query) {
        if (_query.setter == null) {
          _query.setter = {path: "style", node: "display", value: "inline"};
        } else if (_query.setter.node === 'display') {
          _query.setter.value = 'inline';
        }
      }
      if (_query.subquery) {
        _query.subquery.forEach( (_subquery) => {
          if ('setter' in _subquery) {
            if (_subquery.setter.node === 'display') {
              _subquery.setter.value = "inline";
            }
          }
        });
      }
    });
    return query;
  }

  const hide = function(query) {
    query.query.forEach( (_query) => {
      if ('setter' in _query && _query.setter != null) {
        if (_query.setter.node === 'display') {
          _query.setter.value = 'none';
        }
      }
      if (_query.subquery) {
        _query.subquery.forEach( (_subquery) => {
          if ('setter' in _subquery.setter) {
            if (_subquery.setter.node === 'display') {
              _subquery.setter.value = 'none';
            }
          }
        });
      }
    });
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
