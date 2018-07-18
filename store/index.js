import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      name: null,
      email: null,
      streetAddress: null,
      zipCode: null,
      phone: null,
      comments: null,
      org: 'fftf',
      rep: {},
      donationsEnabled: true,
      analyticsEnabled: true
    },

    mutations: {
      setName: (state, value) => state.name = value,
      setEmail: (state, value) => state.email = value,
      setStreetAddress: (state, value) => state.streetAddress = value,
      setZipCode: (state, value) => state.zipCode = value,
      setPhone: (state, value) => state.phone = value,
      setComments: (state, value) => state.comments = value,
      setOrg: (state, value) => state.org = value,
      setRep: (state, value) => state.rep = value,
      disableDonations: state => state.donationsEnabled = false,
      disableAnalytics: state => state.analyticsEnabled = false
    }
  })
}

export default createStore
