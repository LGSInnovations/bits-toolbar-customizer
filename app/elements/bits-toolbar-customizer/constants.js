((global) => {
  'use strict';
  const QUERIES = {
    gallery: [
      ['id', 'gallery'],
      ['tagName', 'paper-icon-button']
    ],

    logo: [
      ['textContent', 'BITS'],
      ['parentNode.parentNode.tagName', 'app-toolbar']
    ],

    powerMenu: [
      ['id', 'menu'],
      ['parentNode.host.tagName', 'base-system-power-control']
    ],

    powerOff: [
      ['tagName', 'paper-item'],
      ['textContent', 'Power off']
    ],

    reboot: [
      ['tagName', 'paper-item'],
      ['textContent', 'Reboot']
    ],

    signOut: [
      ['tagName', 'paper-item'],
      ['textContent', 'Sign out']
    ],

    homeSidebar: [
      [ 'tagName', 'base-home']
    ],

    homeLink: [
      ['textContent', 'Home', 'parentNode.parentNode.host.style'],
      ['parentNode.parentNode.host.tagName', 'base-gallery-category', 'parentNode.parentNode.host.style']
    ],

    dashboard: [
      ['textContent', 'Dashboard', 'parentNode.style']
    ],

    activity: [
      ['textContent', 'Activity', 'parentNode.style']
    ],

    users: [
      ['textContent', 'Users', 'parentNode.style']
    ],

    omgs: [
      ['textContent', 'OMGs', 'parentNode.style']
    ],

    modules: [
      ['textContent', 'Modules', 'parentNode.style']
    ],

    logs: [
      ['textContent', 'Logs', 'parentNode.style']
    ],
  };
  //Use from client side as well as server side
  if (typeof(module) != 'undefined') {
    module.exports = QUERIES;
  }
  global.TOOLBAR_CUSTOMIZER_QUERIES = QUERIES;
})(this);
