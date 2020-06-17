<template>
	<view>
		<view 
		v-for="(item,index) in historydata" 
		class="item"
		:key='index'>
			<view class="time">{{item.lsdate}}</view>
			<view class="ctn">{{item.title}}</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				historydata:''
			}
		},
		computed:{
			...mapState([
				'requesturl',
				'key'
			])
		},
		methods: {
			gettime:function(){
				var timestamp = Date.parse(new Date());  
				timestamp = timestamp / 1000;  
				console.log("当前时间戳为：" + timestamp);
				var n = timestamp * 1000;  
				var date = new Date(n);  
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);  
				var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
				var time = M + D
				this.getdata(time)
			},
			getdata:function(time){
				var _this = this;
				uni.request({
					url:_this.requesturl + '/txapi/lishi/index?key=' + _this.key + '&date=' + time,
					success:function(res){
						console.log(res)
						_this.historydata = res.data.newslist
					}
				})
			}
		},
		onLoad() {
			this.gettime();
		}
	}
</script>

<style>
.time{
	width:90%;
	margin:0 auto;
	font-size: 16px;
	font-weight: bold;
	color:#292b33;
	line-height: 60rpx;
}
.ctn{
	width:90%;
	margin:0 auto;
	font-size: 15px;
	color:#777;
	line-height: 60rpx;
	margin-bottom: 50rpx;
}
</style>
