import Vue from 'vue';
import Vuex from 'vuex'
import mutations from './mutations.js'
Vue.use(Vuex)


const state = {
	requesturl:'https://api.tianapi.com', //公共域名
	key:'b642c7a4d53987e2dac60b013ff8ce70',
	rubbishSearchData:'', 
	finalobj:'',
	shibieobj:'',
	shibieimg:'', //植物图片识别图片
	shibieobj:'', //植物识别返回数据
	shibietype:''
}

export default new Vuex.Store({
	state,
	mutations
})
