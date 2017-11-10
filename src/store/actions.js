import api from '../axios'
import Vue from 'vue'
import router from '../router/index'
import * as types from './types'

export default {
	UserLogin({ commit }, data) {
		commit(types.LOGIN, data)
	},

	UserLogout({ commit }) {
		commit(types.LOGOUT)
	},

	UserName({ commit }, data) {
		commit(types.USERNAME, data)
	},

	changeHeadLine({ commit }, headline) {
		commit(types.CHANGEHEADLINE, headline)
	},

	tabTrigger({ commit }, tab) {
		commit(types.TABTRIGGER, tab)
	},

	updateSearchJobs({ commit }, data) {
		commit(types.UPDATESEARCHJOBS, data)
	}
}
