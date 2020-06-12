<template>
	<view>
		<view class="title-text">《{{dataobj.source}}》</view>
		<view class="chi">{{dataobj.dialogue}}</view>
		<view class="eng">{{dataobj.english}}</view>
		<view class="next" @click="nextfn">下一条</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				url:'/txapi/dialogue/index?key=',
				dataobj:''
			}
		},
		computed:{
			...mapState([
				'requesturl',
				'key'
			])
		},
		methods: {
			getdata:function(){
				var _this = this
				uni.request({
					url:_this.requesturl + _this.url + _this.key,
					success:function(data){
						console.log(data)
						_this.dataobj = data.data.newslist[0]
						console.log(_this.dataobj)
					}
				})
			},
			nextfn:function(){
				this.getdata()
			}
		},
		onLoad(){
			this.getdata()
		}
	}
</script>

<style>
	.title-text{
		text-align: center;
		color:"#333";
		font-size: 18px;
		font-weight: 600;
		line-height: 100rpx;
	}
	.chi{
		padding:40rpx;
		color:#333;
		font-size: 16px;
		line-height: 50rpx;
		text-indent: 40rpx;
	}
	.eng{
		padding:40rpx;
		color:#333;
		font-size: 16px;
		line-height: 50rpx;
		text-indent: 40rpx;
	}
	.next{
		position: fixed;
		bottom: 100rpx;
		width:100%;
		text-align: center;
		text-decoration: underline;
		font-size: 14px;
		color:skyblue;
	}
</style>
