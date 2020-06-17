<template>
	<view>
		<view
		v-for="(item,index) in rubbishSearchData"
		:key='index'
		class="rubbish-list"
		:data-index='index'
		@click="tofinal"
		>
		{{item.name}}</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import {SET_FINAL_DATA} from '../../../store/mutation-types.js'
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			...mapState([
				'rubbishSearchData'
			])
		},
		methods: {
			...mapMutations([
				SET_FINAL_DATA
			]),
			tofinal:function(e){
				var index = e.currentTarget.dataset.index;
				var obj = this.rubbishSearchData[index];
				this.SET_FINAL_DATA(obj)
				uni.navigateTo({
					url:'../rubbishfinal/rubbishfinal'
				})
			}
		}
	}
</script>

<style>
.rubbish-list{
	width:90%;
	margin:0 auto;
	line-height: 80rpx;
	color:#444;
	border-bottom: 1px solid #eaeaea;
}
</style>
