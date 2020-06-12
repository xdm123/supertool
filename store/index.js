import Vue from 'vue';
import Vuex from 'vuex'
import mutations from './mutations.js'
Vue.use(Vuex)


const state = {
	requesturl:'https://api.tianapi.com',
	key:'b642c7a4d53987e2dac60b013ff8ce70',
	rubbishSearchData:'',
	finalobj:'',
	shibieobj:''
}

export default new Vuex.Store({
	state,
	mutations
})
