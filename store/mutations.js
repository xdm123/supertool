
import {
	SET_RUBBISH_SEARCH,
	SET_FINAL_DATA,
	SET_SHIBIE_OBJ,
	SHIBIE_OBJ,
	SHIBIE_IMG,
	SHIBIE_TYPE
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
	},
	[SHIBIE_IMG](state,data){
		state.shibieimg = data
	},
	[SHIBIE_OBJ](state,data){
		state.shibieobj = data
	},
	[SHIBIE_TYPE](state,data){
		state.shibietype = data
	}
}

export default mutations