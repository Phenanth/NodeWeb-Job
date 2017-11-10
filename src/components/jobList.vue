<template>
<div class="wrapper" v-show="tab === 'jobList'">
	<!-- 搜索表单 -->	
	<div class="searchForm">
    <form @submit.prevent="submit">
      <div class="input-group">
        <span class="input-group-addon">公司名称</span>
        <input type="text" class="form-control" placeholder="公司名称" v-model="company">
      </div>
      <div class="input-group">
        <span class="input-group-addon">职位类型</span>
        <input type="text" class="form-control" placeholder="职位类型" v-model="type">
      </div>
      <div class="salary-group">
        <div class="input-group">
          <span class="input-group-addon">月薪</span>
          <input type="number" class="form-control" placeholder="Min" v-model.number="salaryMin">
        </div>
        &nbsp;-&nbsp;
        <input type="number" class="form-control" placeholder="Max" v-model.number="salaryMax">
          </div>
      	<div>
          <button type="button" class="btn btn-primary" @click='submit(-1)'>查询</button>
        </div>
    </form>
  </div>

	<searchResults :descType="descType"></searchResults>
	<page :pageCount="pageCount" @pageChanged="pageChanged"></page>
</div>
</template>

<script type="text/javascript">

import axios from 'axios'
import page from './pages'
import store from '../store/index'
import searchResults from './result'
import api from '../axios'

export default {
	data() {
		return {
      company: '',
      type: '',
      salaryMin: '',
      salaryMax: '',
      searchResult: [],
      page: 1,
      descType: 'DO_STAR'
	  }
	},
	components: {
		page,
		searchResults
	},
	props: {
		tab: {
			type: String,
			default: ''
		}
	},
	methods: {
		submit () {
			let searchData = {
				company: this.company,
				type: this.type,
				salaryMin: this.salaryMin,
				salaryMax: this.salaryMax,
				page: this.page
			}
			searchData.salaryMin = (searchData.salaryMin === '') ? -1 : searchData.salaryMin
			searchData.salaryMax = (searchData.salaryMax === '') ? 9999999 : searchData.salaryMax
			let result = {
				data: [],
				pageCount: 1
			}
			api.getJobList(searchData).then(({ results }) => {
        console.log(results)
				if (results.pageCount > 0) {
					result = {
						data: results.results,
						pageCount: results.pageCount
					}
          console.log(result.data, result.pageCount)
					store.dispatch('updateSearchJobs', result)

				} else {
					store.dispatch('updateSearchJobs', result)
				}
			})
			.catch(err => {
				console.log(err)
			})
		},
		pageChanged (page) {
			this.page = page
			this.submit()
		}
	},
	mounted() {
		this.$store.dispatch('changeHeadLine', '职业总览');
		// this.getList();
	},
	computed: {
		pageCount () {
			return this.$store.state.searchJobs.pageCount
		}
	}
}
</script>
<style scoped lang='less'>
.wrapper{
	display: flex;
	flex-direction: column;
}

.searchForm {
  background-color: #ddd;
  
  form {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 80px;
    padding: 10px;

    .input-group {
      width: 240px;
    }
    >div:nth-child(n+1) {
      margin-left: 24px;
    }
    .salary-group {
      display: flex;
      flex-direction: row;
      align-items: center;

      .input-group {
        width: 90px;
      }

      input {
        width: 90px;
      }
    }
  }
}
.searchResult {
  height: 650px;
  flex-grow: 1;
  overflow-y: auto;
}
table {

  tr {
    cursor: pointer;
  }

  th {
    text-align: center;
  }

  td {
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .jobList {
    overflow-y: scroll;
  }
}
.pageButtons {

  a:hover {
    cursor: pointer;
  }
}

</style>