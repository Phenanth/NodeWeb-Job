import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state = {
	token: null,
	activeName: 'first',
	username: '',
	headline: '',
	tab: 'jobList',
	searchJobs: {
		data: [],
		pageCount: 0
	},
	starJobs: {
		data: [],
		pageCount: 0
	}
}

export default new Vuex.Store({
	state,
	mutations,
	actions
})
