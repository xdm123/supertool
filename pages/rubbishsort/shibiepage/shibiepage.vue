<template>
	<view>
		<image v-if='shibieobj.imgurl' class="big-img" :src="shibieobj.imgurl" mode="aspectFill"></image>
		<image v-else src="../../../static/img/yy3.png" class="big-img-voice" mode=""></image>
		<view class="name">{{shibieobj.name}}</view>
		<view class="tip">{{shibieobj.lajitip}}</view>
	</view>
</template>

<!-- name:obj.name,
											type:obj.lajitype,
											imgurl:imgurl,
											lajitip:obj.lajitip -->

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			...mapState([
				'shibieobj'
			])
		},
		methods: {
			
		},
		onLoad() {
			var type = this.shibieobj.type;
			console.log(type)
		}
	}
</script>

<style>
.big-img,.big-img-voice{
	width:400rpx;
	height:400rpx;
	border-radius: 20rpx;
	display: block;
	margin:0 auto;
	margin-top: 40rpx;
}
.big-img-voice{
	width:360rpx;
	height:360rpx;
}
.name{
	font-size: 18px;
	color:#333;
	text-align: center;
	margin-top: 40rpx;
}
	
.tip{
	padding:0 40rpx;
	font-size: 16px;
	color:#333;
	text-indent: 40rpx;
	margin-top: 40rpx;
}
</style>
