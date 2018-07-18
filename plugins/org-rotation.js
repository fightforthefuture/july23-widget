const orgs = {
  fp: {
    id: 'fp',
    name: 'Free Press',
    link: 'https://www.freepress.net',
    donateLink: 'https://freepress.actionkit.com/donate/single/'
  },
  dp: {
    id: 'dp',
    name: 'Demand Progress',
    link: 'https://www.demandprogress.org',
    donateLink: 'https://secure.actblue.com/donate/nndayofaction?refcode=20170712-bftn'
  },
  fftf: {
    id: 'fftf',
    name: 'Fight for the Future',
    link: 'https://www.fightforthefuture.org',
    donateLink: 'https://donate.fightforthefuture.org'
  }
}

// fp = 20%, dp = 40%, fftf = 40%
function getRandomOrg() {
  var coinToss = Math.random();
  if (coinToss < .20) {
    return 'fp';
  }
  else if (coinToss < .60) {
    return 'dp';
  }
  else {
    return 'fftf';
  }
}

// set org on route change
export default ({ app }) => {
  app.router.afterEach((to, from) => {
    const org = to.query.org || to.query.source || getRandomOrg()
    app.store.commit('setOrg', orgs[org])
  })
}
