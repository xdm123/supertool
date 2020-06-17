<template>
	<view>
		<view class="tool-wrap">
			<view class="title">功能应用类</view>
			<view class="tool-ctn">
				<!-- <view @click='toolsecondpage' data-type='qushuiyin'>视频去水印</view> -->
				<!-- <view>抽取网页图片</view> -->
				<view @click='toolsecondpage' data-type='zhiwu'>植物图像识别</view>
				<view @click='toolsecondpage' data-type='chongwu'>宠物图像识别</view>
			</view>
		</view>
		<!-- <view class="tool-wrap">
			<view class="title">生活服务类</view>
			<view class="tool-ctn">
				<view>宠物大全</view>
				<view>菜谱查询</view>
				<view>天气预报</view>
				<view>实时油价</view>
			</view>
		</view> -->
		<view class="tool-wrap">
			<view class="title">趣味娱乐类</view>
			<view class="tool-ctn">
				<view @click="toolsecondpage" data-type='tgrj'>舔狗日记</view>
				<!-- <view @click="toolsecondpage" data-type='xzpd'>星座配对</view> -->
				<!-- <view>谜语大全</view> -->
				<!-- <view>毒鸡汤</view> -->
			</view>
		</view>
		<view class="tool-wrap">
			<view class="title">知识问答类</view>
			<view class="tool-ctn">
				<view @click="toolsecondpage" data-type='historytoday'>历史上的今天</view>
				<!-- <view @click="toolsecondpage" data-type='xzpd'>星座配对</view> -->
				<!-- <view>谜语大全</view> -->
				<!-- <view>毒鸡汤</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import {SHIBIE_IMG,SHIBIE_OBJ,SHIBIE_TYPE} from '../../store/mutation-types.js'
	export default {
		data() {
			return {
				
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
				SHIBIE_IMG,
				SHIBIE_OBJ,
				SHIBIE_TYPE
			]),
			toolsecondpage:function(e){
				var type = e.currentTarget.dataset.type;
				var _this = this
				console.log(type);
				var url = ''
				if(type == 'qushuiyin'){
					url = 'qushuiyin/qushuiyin'
					uni.navigateTo({
						url:url
					})
				}else if(type == 'zhiwu' || type == 'chongwu'){
					_this.SHIBIE_TYPE(type)
					uni.chooseImage({
						count: 1, //默认9
						sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album','camera'], //从相册选择
						success: res => {
						uni.showLoading({
							title:'图片识别中',
							mask:true
						})
						_this.SHIBIE_IMG(res.tempFiles[0].path)
						console.log('dasdsasadada',res)
						uni.getFileSystemManager().readFile({
								filePath: res.tempFiles[0].path, //选择图片返回的相对路径
								encoding: 'base64', //编码格式
								success: res => { //成功的回调
									console.log('data:image/png;base64,' + res.data)
									var imgurl = 'data:image/png;base64,' + res.data
									console.log(imgurl)
									var url = (type == 'zhiwu' ? '/txapi/scanplant/index' : '/txapi/scanpet/index')
									uni.request({
										method:'POST',
										url:_this.requesturl + url,
										header: { 'Content-Type': 'application/x-www-form-urlencoded'},
										data:{
											key:_this.key,
											img:imgurl
										},
										success:function(res){
											console.log(res)
											if(res.data.newslist){
												if(type == 'zhiwu'){
													var zhiwuobj = res.data.newslist[0]
													_this.SHIBIE_OBJ(zhiwuobj)
													uni.hideLoading()
													uni.navigateTo({
														url:'zhiwu/zhiwu'
													})
												}else{
													var chongwuobj = res.data.newslist[0]
													_this.SHIBIE_OBJ(chongwuobj)
													
													uni.navigateTo({
														url:'zhiwu/zhiwu'
													})
												}
											}else{
												uni.hideLoading()
												uni.showToast({
													title:'失败了，请近距离拍摄',
													icon:'none'
												})
											}
										}
									})
								}
							})
						}
					})
				}else if(type == 'tgrj'){
					uni.navigateTo({
						url:'../tgrj/tgrj'
					})
				}else if(type == 'xzpd'){
					uni.navigateTo({
						url:'xzpd/xzpd'
					})
				}else if(type == 'historytoday'){
					uni.navigateTo({
						url:'historytoday/historytoday'
					})
				}
			}
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
