(function() {
  'use strict';

  var domId = 'BFTN_WIDGET';
  var animationDuration = 500;
  var closedCookie = '_BFTN_WIDGET_CLOSED_';

  // user-configurable options
  var opts = window.BFTN_WIDGET_OPTIONS || {};
  var org = opts.org || null;
  var cookieExpirationDays = parseFloat(opts.cookieExpirationDays || 1);
  var alwaysShow = !!(opts.alwaysShow || window.location.hash.indexOf('ALWAYS_SHOW_WIDGET') !== -1);
  var disableGoogleAnalytics = !!opts.disableGoogleAnalytics;
  var disableDonations = !!opts.disableDonations;
  var iframeHost = opts.iframeHost !== undefined ? opts.iframeHost : 'https://july23.battleforthenet.com';

  var stylesToReset = {};

  function closeWindow() {
    document.body.style.overflow = stylesToReset.overflow;

    if (stylesToReset.position !== undefined) {
      document.body.style.position = stylesToReset.position;
    }

    if (stylesToReset.scrollTop !== undefined) {
      window.scrollTo(0, stylesToReset.scrollTop);
    }

    window.removeEventListener('message', receiveMessage);

    var el = document.getElementById(domId);
    el.classList.add('BFTN--closing')
    setTimeout(function(){
      el.parentNode.removeChild(el);
    }, animationDuration);

    setCookie(closedCookie, 'true', cookieExpirationDays);
  }

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    var c;

    for(var i = 0; i < ca.length; i++) {
      c = ca[i].trim();
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return "";
  }

  function setCookie(name, val, exdays) {
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));

    var expires = "expires="+d.toGMTString();
    document.cookie = name + "=" + val + "; " + expires + "; path=/";
  }

  function getIframeSrc() {
    var src = iframeHost + '/?';

    if (org) {
      src += 'org=' + encodeURIComponent(org) + '&';
    }

    if (disableGoogleAnalytics) {
      src += 'ga=false&';
    }

    if (disableDonations) {
      src += 'donations=false&';
    }

    return src.replace(/(\?|&)$/, '');
  }

  function createIframe() {
    var wrapper = document.createElement('div');
    wrapper.id = domId;
    var iframe = document.createElement('iframe');
    iframe.src = getIframeSrc();
    iframe.frameBorder = 0;
    iframe.allowTransparency = true;
    // iframe.style.display = 'none';
    wrapper.appendChild(iframe);
    document.body.appendChild(wrapper);

    return wrapper;
  }

  function showIframe() {
    stylesToReset = {
      overflow: document.body.style.overflow
    };

    setTimeout(function(){
      document.getElementById(domId).classList.add('BFTN--visible');
      document.body.style.overflow = 'hidden';

      var isProbablyMobile = window.innerWidth < 500;

      if (isProbablyMobile) {
        stylesToReset.position = document.body.style.position;
        stylesToReset.scrollTop = window.pageYOffset;
        document.body.style.position = 'fixed';
      }
    }, animationDuration);
  }

  function injectCSS(id, css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.id = id;
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    }
    else {
      style.appendChild(document.createTextNode(css));
    }
    document.head.appendChild(style);
  }

  function receiveMessage(event) {
    if (!event.data.BFTN_WIDGET) return;

    switch (event.data.action) {
      case 'closeWindow':
        return closeWindow();
    }
  }

  function init() {
    if (alwaysShow || !getCookie(closedCookie)) {
      injectCSS('BFTN_WIDGET_CSS',
        '#' + domId + ' { position: fixed; right: 0; left: 0; bottom: 0; width: 100%; height: 100%; z-index: 20000; -webkit-overflow-scrolling: touch; overflow: hidden; transition: all ' + animationDuration + 'ms ease-in; opacity: 0; } ' +
        '#' + domId + '.BFTN--visible { opacity: 1; }' +
        '#' + domId + '.BFTN--closing { opacity: 0; } ' +
        '#' + domId + ' iframe { width: 100%; height: 100%; }'
      );

      createIframe();
      showIframe();

      // listen for messages from iframe
      window.addEventListener('message', receiveMessage);
    }

    document.removeEventListener('DOMContentLoaded', init);
  }

  // Wait for DOM content to load.
  switch(document.readyState) {
    case 'complete':
    case 'loaded':
    case 'interactive':
      init();
      break;
    default:
      document.addEventListener('DOMContentLoaded', init);
  }
})();
