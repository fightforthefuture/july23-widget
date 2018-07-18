export default ({ route, store }) => {
  if (route.query.ga === 'false' || (navigator && navigator.doNotTrack)) {
    store.commit('disableAnalytics')
  }

  if (route.query.donations === 'false') {
    store.commit('disableDonations')
  }
}
