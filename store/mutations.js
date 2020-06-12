
import {
	SET_RUBBISH_SEARCH,
	SET_FINAL_DATA,
	SET_SHIBIE_OBJ
} from './mutation-types.js'
const mutations = {
	[SET_RUBBISH_SEARCH](state,data){
		state.rubbishSearchData = data
	},
	[SET_FINAL_DATA](state,data){
		state.finalobj = data
	},
	[SET_SHIBIE_OBJ](state,data){
		state.shibieobj = data
	}
}

export default mutations