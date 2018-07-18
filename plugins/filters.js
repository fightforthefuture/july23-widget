import Vue from 'vue'
import { formatNumber, pluralize } from '~/assets/js/helpers'

Vue.filter('formatNumber', formatNumber)
Vue.filter('pluralize', pluralize)
