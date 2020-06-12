<template>
	<view class="wrap">
		<image src="../../static/img/ng4.jpg" mode=""></image>
		<view class="ctn">
			<view class="title">卑微爱情的独白记录：</view>
			<view class="tg-ctn">{{tgText}}</view>
			<image v-if="!loaddown" class="load-img" src="../../static/img/dog3.png" mode=""></image>
			<view class="refresh-btn" v-if="loaddown">
				<view>点击狗头更新下一条</view>
				<image @click="refreshitem" src="../../static/img/dog2.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				tgText:'',
				loaddown:false
			}
		},
		computed:{
			...mapState([
				'requesturl',
				'key',
				'name'
			])
		},
		methods: {
			getText:function(){
				var _this = this
				this.loaddown = false
				console.log(this.requesturl)
				uni.request({
					url:_this.requesturl + '/txapi/tiangou/index?key=' + _this.key,
					success:(data) => {
						console.log(data)
						var tgText = data.data.newslist[0].content;
						_this.tgText = tgText
						_this.loaddown = true
					}
				})
			},
			refreshitem:function(){
				this.tgText = '';
				this.getText()
			}
		},
		mounted(){
			this.getText()
		}
	}
</script>

<style>
	.wrap{
		position: relative;
		
	}
	.wrap image{
		width:100%;
		height:100%;
		position: absolute;
		top:0;
		left:0;
		z-index: 10;
	}
	.ctn{
		padding:0 40rpx;
		height:100%;
		position: absolute;
		z-index: 100;
		top:0;
		font-size: 16px;
		color:#fff;
	}
	.title{
		margin-top:50rpx;
		
	}
	.tg-ctn{
		text-indent: 40rpx;
		line-height: 57rpx;
		margin-top: 40rpx;
		
	}
	.wrap .load-img{
		display: block;
		width:100rpx;
		height:100rpx;
		position: fixed;
		top:50%;
		left:50%;
		margin-top: -200rpx;
		margin-left:-50rpx;
		animation: move 5s linear 0s infinite;
	}
	@keyframes move{
		from{transform: rotate(0);}
		to{transform: rotate(360deg);}
	}
	.refresh-btn{
		position: fixed;
		bottom: 0;
		line-height: 200rpx;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.refresh-btn image{
		width:100rpx;
		height:100rpx;
		position: static;
		margin-left: 50rpx;
	}
</style>
