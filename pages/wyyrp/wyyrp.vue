<template>
	<view>
		<image class="wyy-img" :class="id == 4 ? 'addwidth' : ''" :src="src" mode=""></image>
		<view class="ctn">{{obj.content || ''}}</view>
		<view v-if="id == '2'" class="source">——{{obj.source || ''}}</view>
		<view class="next" @click="nextfn">下一条</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				obj:'',
				url:'',
				id:'',
				src:''
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
						_this.obj = data.data.newslist[0]
					}
				})
			},
			nextfn:function(){
				this.getdata()
			}
		},
		onLoad(options){
			console.log(options)
			var id = options.id;
			if(id == 2){
				this.id = 2
				this.url = '/txapi/hotreview/index?key='
				this.src = '../../static/img/wyy.png'
			}else if(id == 3){
				this.id = 3
				this.url = '/txapi/saylove/index?key='
				this.src = '../../static/img/qh.png'
			}else if(id == 4){
				this.id = 4
				this.url = '/txapi/caihongpi/index?key='
				this.src = '../../static/img/ch.png'
			}
			this.getdata()
		}
	}
</script>

<style>
.wyy-img{
	width:200rpx;
	height:200rpx;
	display: block;
	margin:100rpx auto;
}
.ctn{
	padding:40rpx;
	font-size: 16px;
	color:#333;
	line-height:50rpx;
	text-indent: 40rpx;
}
.source{
	padding:40rpx 80rpx;
	font-size: 14px;
	color:#888;
	text-align: right;
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
.addwidth{
	width:250rpx;
}
</style>
