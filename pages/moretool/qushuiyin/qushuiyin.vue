<template>
	<view>
		<view class="item">
			<view class="title">功能描述：</view>
			<view class="ctn">用于去除自己作品在抖音、快手、火山、皮皮虾、微博、美拍、微视等常见短视频平台上的视频水印。</view>
		</view>
		<view class="shipinurl">
			<input :value="url" @input="inputurl" type="text" placeholder="输入短视频网络地址">
			<image @click="clearinputfn" v-if="!disabled" src="../../../static/img/close.png" class="clearinput" mode=""></image>
		</view>
		<button type='primary' :disabled="disabled" class="qushuiyinfn" @click="qushuiyinfn">点击去水印</button>
		<view v-if="coverimg" class="getdatavideo">
			<image class="cover-img" :src="coverimg" mode="aspectFill"></image>
			<view class="video-shadow"></view>
			<image @click="playvideofn" src="../../../static/img/play.png" class="video-play" mode=""></image>
			<view class="video-explain">{{explain}}</view>
		</view>
		<view class="video-play-wrap" v-if="playvideo">
			<image @click="closevideofn" class="close-video" src="../../../static/img/guanbi.png" mode=""></image>
			<video 
			:src="videourl" 
			controls
			autoplay='true'
			show-fullscreen-btn='false'
			></video>
		</view>
		<button v-if="showsavebutton" @click="savevideofn" class="save-video" type="primary">保存视频到本地</button>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				disabled:true,
				url:'',
				coverimg:'',
				explain:'',
				videourl:'',
				playvideo:false,
				showsavebutton:false
			}
		},
		computed:{
			...mapState([
				'requesturl',
				'key'
			])
		},
		methods: {
			inputurl:function(e){
				var url = e.detail.value
				if(url != ''){
					this.disabled = false
				}else{
					this.disabled = true
				}
				this.url = url
				console.log(url)
			},
			clearinputfn:function(){
				this.url = ''
				this.disabled = true
			},
			qushuiyinfn:function(){
				uni.showLoading({
					title:'正在去除水印',
					mask:true,
				})
				var _this = this;
				var url = encodeURI(_this.url)
				console.log(url)
				uni.request({
					url:_this.requesturl + '/txapi/shortvideo/index?key=' + _this.key + '&url=' + url,
					success:function(res){
						console.log(res)
						uni.hideLoading()
						_this.url = ''
						_this.disabled = true
						if(res.data.newslist[0].coverimg){
							_this.coverimg = res.data.newslist[0].coverimg
							_this.explain = res.data.newslist[0].explain
							_this.videourl = res.data.newslist[0].videourl
							_this.showsavebutton = true
						}else{
							_this.coverimg = ''
							_this.explain = ''
							_this.videourl = ''
							_this.showsavebutton = false
							uni.showToast({
								title:'操作失败，请检查链接地址是否正确',
								icon:'none'
							})
						}
						
					}
				})
			},
			playvideofn:function(){
				this.playvideo = true
			},
			closevideofn:function(){
				this.playvideo = false
			},
			savevideofn:function(){
				console.log('保存视频')
				var _this = this
				var url = _this.videourl
				if(url.indexOf('https') == -1){
					url.replace(/http/, "https")
				}
				console.log(url)
				uni.downloadFile({
					url: url,
					success: (res) => {
						console.log(res)
						if (res.statusCode === 200) {
							console.log('下载成功');
							uni.showToast({
								title:'下载成功'
							})
						}
					},
					fail:(data)=>{
						console.log(data)
						uni.showToast({
							title:'下载失败'
						})
					}
				});
			}
		}
	}
</script>

<style>

.item{
	font-size: 14px;
	color:#292b33;
	line-height: 40rpx;
	padding:40rpx;
	display: flex;
	justify-content: space-around;
}
.title{
	width:150rpx;
	font-size: 14px;
	font-weight: bold;
}
.ctn{
	width:calc(100% - 150rpx);
}
.shipinurl{
	width:90%;
	height:80rpx;
	border:1px solid skyblue;
	display: block;
	margin:0 auto;
	margin-top: 40rpx;
	border-radius: 20rpx;
	line-height: 80rpx;
	font-size: 14px;
	overflow: hidden;
}
.shipinurl input{
	width:83%;
	display: block;
	border:none;
	height:80rpx;
	line-height: 80rpx;
	float:left;
	margin-left:20rpx;
}
.qushuiyinfn{
	width:90%;
	height:80rpx;
	line-height: 80rpx;
	text-align: center;
	font-size: 15px;
	letter-spacing: 1px;
	color:#fff;
	background:skyblue;
	border-radius: 20rpx;
	margin:0 auto;
	margin-top: 40rpx;
}
.clearinput{
	width:30rpx;
	height:30rpx;
	float:right;
	margin-right: 30rpx;
	margin-top:25rpx;
}
.getdatavideo{
	width:90%;
	margin:0 auto;
	height:400rpx;
	position: relative;
	margin-top:50rpx;
}
.cover-img{
	position: absolute;
	top:0;
	left:0;
	width:100%;
	height:100%;
	z-index: 5;
}
.video-explain{
	width:90%;
	margin:0 auto;
	position: absolute;
	bottom:0;
	left:5%;
	font-size: 14px;
	color:#fff;
	line-height: 71rpx;
	z-index: 10;
	height:71rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.video-shadow{
	width:100%;
	height:100%;
	position: absolute;
	top:0;
	left:0;
	z-index: 9;
	background:rgba(0,0,0,0.4);
}
.video-play{
	width:100rpx;
	height:100rpx;
	position: absolute;
	top:50%;
	left:50%;
	margin-top: -50rpx;
	margin-left:-50rpx;
	z-index: 11;
}
.video-play-wrap{
	width:100%;
	height:100%;
	background:#000;
	position: fixed;
	z-index:10000;
	top:0;
	left:0;
}
.close-video{
	width:40rpx;
	height:40rpx;
	margin-top: 40rpx;
	margin-left:40rpx;
}
video{
	width:100%;
	margin-top: 100rpx;
}
.save-video{
	bottom: 20rpx;
	width:90%;
	margin:0 auto;
	margin-top: 50rpx;
}
</style>
