export function openPopup(url, title='popup', w=600, h=500) {
  // Fixes dual-screen position
  var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
  var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

  var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  var left = ((width / 2) - (w / 2)) + dualScreenLeft;
  var top = ((height / 2) - (h / 2)) + dualScreenTop;
  var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus();
  }
}

export function postFormData(url, data={}) {
  const axios = require('axios')
  const qs = require('qs')

  return axios.post(url, qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function sendToMothership(data={}, submission={}) {
  return postFormData('https://queue.fightforthefuture.org/action', data)
}

export async function pingCounter(counter) {
  const axios = require('axios')

  try {
    await axios.post(`https://counter.battleforthenet.com/ping/${counter}`)
  }
  catch (error) {
    //
  }
}

export function formatNumber(x) {
  return x || x === 0 ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';
}
