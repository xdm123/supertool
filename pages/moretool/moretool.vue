<template>
	<view>
		<view class="tool-wrap">
			<view class="title">功能应用类</view>
			<view class="tool-ctn">
				<view>视频去水印</view>
				<view>抽取网页图片</view>
				<view>植物图像识别</view>
				<view>宠物图像识别</view>
			</view>
		</view>
		<view class="tool-wrap">
			<view class="title">生活服务类</view>
			<view class="tool-ctn">
				<view>宠物大全</view>
				<view>菜谱查询</view>
				<view>天气预报</view>
				<view>实时油价</view>
			</view>
		</view>
		<view class="tool-wrap">
			<view class="title">趣味娱乐类</view>
			<view class="tool-ctn">
				<view>舔狗日记</view>
				<view>星座配对</view>
				<view>谜语大全</view>
				<view>毒鸡汤</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.tool-wrap{
	width:90%;
	margin:40rpx auto;
	box-shadow: 0px 0px 4px 4px #eaeaea;
	border-radius: 20rpx;
}
.title{
	width:90%;
	margin:0 auto;
	border-bottom: 1px solid #f2f2f2;
	text-align: center;
	color:#292b33;
	font-size: 16px;
	line-height: 100rpx;
}
.tool-ctn{
	width:90%;
	margin:0 auto;
	font-size: 14px;
	color:skyblue;
	font-weight: 600;
	overflow: hidden;
	padding:20rpx 0;
}
.tool-ctn view{
	width:40%;
	box-sizing: border-box;
	text-align: center;
	float:left;
	padding:15rpx 0;
	border:1px solid skyblue;
	border-radius: 10rpx;
	margin-top:20rpx;
	margin:20rpx 5%;
}
</style>
