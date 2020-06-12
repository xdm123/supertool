<template>
	<view class="allhot-wrap">
		<scroll-view scroll-y="true">
			<view class="hot-wrap">
				<view
				class="hot-item"
				v-for="(item,index) in list"
				:key='index'
				@click="getres"
				:data-name='item.name'
				:data-type='item.type'
				>
					{{item.name}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import {SET_FINAL_DATA,SET_RUBBISH_SEARCH} from '../../../store/mutation-types.js'
	export default {
		data() {
			return {
				list:''
			}
		},
		computed:{
			...mapState([
				'requesturl',
				'key'
			])
		},
		methods: {
			...mapMutations([
				SET_FINAL_DATA,
				SET_RUBBISH_SEARCH
			]),
			getAllhot:function(){
				uni.request({
					url:this.requesturl + '/txapi/hotlajifenlei/index?key=' + this.key,
					success:res=>{
						console.log(res)
						this.list = res.data.newslist
					}
				})
			},
			getres:function(e){
				console.log(1)
				var name = e.currentTarget.dataset.name;
				uni.request({
					url:this.requesturl + '/txapi/lajifenlei/index?key=' + this.key + '&word=' + name,
					success:(res)=>{
						console.log(2)
						console.log(res)
						this.SET_RUBBISH_SEARCH(res.data.newslist)
						uni.navigateTo({
							url:'../searchlist/searchlist'
						})
					}
				})
			}
		},
		onLoad() {
			this.getAllhot()
		}
	}
</script>

<style>
.allhot-wrap{
	width:100%;
	overflow: hidden;
	position: relative;
	height:100%;
	background: #2375f4;
	background: -webkit-gradient(linear,left bottom,left top,from(#00a2ff),to(#2a6cf2));
	background: linear-gradient(0deg,#00a2ff,#2a6cf2);
}

.hot-item{
	padding:10rpx 20rpx; 
	border:1px solid #fff;
	border-radius: 30rpx;
	margin-top: 20rpx;
	text-align: center;
	color:#fff;
	margin-left:20rpx;
	width:auto;
}
.hot-wrap{
	margin:0 auto;
	display: flex;
	font-size: 30rpx;
	color:#fff;
	flex-wrap: wrap;
	padding:40rpx 0;
}
scroll-view{
	width:auto;
	padding:0 40rpx;
	height:100%;
	flex-wrap: wrap;
	display: flex;
}
</style>
