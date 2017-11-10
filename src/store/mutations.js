import * as types from './types'

const mutations = {
	[types.LOGIN]: (state, data) => {
		localStorage.setItem('token', data)
		// localStorage.token = data
		state.token = data
	},
	[types.LOGOUT]: (state) => {
		localStorage.removeItem('token');
		state.token = null
	},
	[types.USERNAME]: (state, data) => {
		localStorage.setItem('username', data)
		state.username = data
	},
	[types.CHANGEHEADLINE]: (state, headline) => {
		state.headline = headline
	},
	[types.TABTRIGGER]: (state, tab) => {
		state.tab = tab
	},
	[types.UPDATESEARCHJOBS]: (state, jobs) => {
		state.searchJobs = jobs
	}
}
export default mutations
