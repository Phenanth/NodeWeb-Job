import api from './axios.js'
import store from './store/index.js'
import router from './router'

export const searchJobs = (type, data) => {
	if(type === 'ALL'){
		search = api.getJobList
		action = 'updateSearchJobs'
	}
	else if(type === 'STAR'){
		action = 'updateSearchJobs' // 将来改写为关注函数
	}
	let result = {
		data: [],
		pageCount: 1
	}

	search(searchData).then(({ res }) => {
        console.log(res.data);
		if (res.data.pageCount > 0) {
		result = {
			data: res.data.results,
			pageCount: res.data.pageCount
		}
        console.log(result.data, result.pageCount);
			this.$store.dispatch(action, result);

		} else {
			this.$store.dispatch(action, result)
		}
	})
	.catch(err => {
		console.log(err)
	})
}