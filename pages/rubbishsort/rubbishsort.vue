<template>
	<view class="wrap" >
		<view class="title">垃圾分类好帮手</view>
		<view class="input-wrap">
			<image src="../../static/img/search.png" mode=""></image>
			<input
			class='rubbish-input'
			type="text" 
			@input="getinputValue"
			:value="rubbishName" 
			placeholder="输入您不清楚分类的垃圾名称"/>
			<view @click="searchfn" class="search-btn">搜索</view>
		</view>
		<view class="hotsearch">热门搜索</view>
		<view class="hot-wrap">
			<view
			class="hot-item"
			v-for="(item,index) in hotsearch"
			:key='index'
			@click="getres"
			:data-name='item.name'
			:data-type='item.type'
			>
				{{item.name}}
			</view>
		</view>
		<view @click="allhotsearch" class="allhotsearch">查看全部热门搜索</view>
		<view class="super-fn">
			<!-- <view class="super-fn-item">
				<image src="../../static/img/wd.png" mode=""></image>
				分类问答
			</view> -->
			<view class="yuyinsort-view super-fn-item" v-if="openrecordSet">
				<image @click='openrecordSetting' src="../../static/img/yy.png" mode=""></image>
				语音识别分类
			</view>
			<view class="yuyinsort-view super-fn-item" v-else>
				<image @longpress='longpresssort' @click="yuyinsorttip" @touchend="touchendsort" src="../../static/img/yy.png" mode=""></image>
				语音识别分类
			</view>
			<view class="super-fn-item">
				<image @click="imagesort" src="../../static/img/tx.png" mode=""></image>
				图像识别分类
			</view>
			<!-- <view class="super-fn-item">
				<image @click="imagesort" src="../../static/img/tx.png" mode=""></image>
				更多小工具
			</view> -->
		</view>
		<view class="knowledge">
			<view @click="knowledgemore" class="">了解更多分类知识</view>
		</view>
		<view class="beizhu">查询结果仅供参考，具体分类以归属地相关部门规定为准</view>
		<image class="bg-img" src="../../static/img/homeBg.b60f21aa.png" mode=""></image>
		<view v-if="yuyinstart" class="yuyin-mask">
			<view>已开始录音，请尽量讲普通话</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import {SET_RUBBISH_SEARCH,SET_FINAL_DATA,SET_SHIBIE_OBJ} from '../../store/mutation-types.js'
	const recorderManager = uni.getRecorderManager();
	export default {
		data() {
			return {
				rubbishName:'',
				hotsearch:[],
				yuyinstart:false,
				openrecordSet:true
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
				SET_RUBBISH_SEARCH,
				SET_FINAL_DATA,
				SET_SHIBIE_OBJ
			]),
			getinputValue:function(e){
				this.rubbishName = e.detail.value
			},
			searchfn:function(){
				var _this = this
				if(this.rubbishName == ''){
					uni.showToast({
						title:'输入内容不能为空',
						icon:'none'
					})
					return
				}
				uni.showLoading()
				var name = encodeURI(this.rubbishName)
				uni.request({
					url:_this.requesturl + '/txapi/lajifenlei/index?key=' + _this.key + '&word=' + name,
					success:res => {
						if(res.data.newslist){
							uni.hideLoading()
							console.log(res)
							_this.SET_RUBBISH_SEARCH(res.data.newslist)
							uni.navigateTo({
								url:'./searchlist/searchlist'
							})
						}else{
							uni.showToast({
								title:'未找到相关内容',
								icon:'loading'
							})
						}
					}
				})
			},
			getres:function(e){
				var name = e.currentTarget.dataset.name;
				uni.request({
					url:this.requesturl + '/txapi/lajifenlei/index?key=' + this.key + '&word=' + name,
					success:(res)=>{
						this.SET_RUBBISH_SEARCH(res.data.newslist)
						uni.navigateTo({
							url:'./searchlist/searchlist'
						})
					}
				})
				
				
			},
			knowledgemore:function(){
				uni.navigateTo({
					url:'knowledge/knowledge'
				})
			},
			allhotsearch:function(){
				uni.navigateTo({
					url:'allhotsearch/allhotsearch'
				})
			},
			getHotsearch:function(){
				uni.showLoading({
					
				})
				var _this = this
				uni.request({
					url:_this.requesturl + '/txapi/hotlajifenlei/index?key=' + _this.key,
					success:function(res){
						uni.hideLoading()
						var hotarr = res.data.newslist.splice(0,10);
						_this.hotsearch = hotarr
					}
				})
			},
			imagesort:function(){
				console.log('图像识别分类')
				var _this = this
				 uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: res => {
					uni.showLoading({
						title:'图片识别中',
						mask:true
					})
					uni.getFileSystemManager().readFile({
							filePath: res.tempFilePaths[0], //选择图片返回的相对路径
							encoding: 'base64', //编码格式
							success: res => { //成功的回调
								console.log('data:image/png;base64,' + res.data)
								var imgurl = 'data:image/png;base64,' + res.data
								console.log(imgurl)
								uni.request({
									method:'POST',
									url:_this.requesturl + '/txapi/imglajifenlei/index',
									header: { 'Content-Type': 'application/x-www-form-urlencoded'},
									data:{
										key:_this.key,
										img:imgurl
									},
									success:function(res){
										console.log(res)
										var obj = res.data.newslist[0]
										var imgsortobj = {
											name:obj.name,
											type:obj.lajitype,
											imgurl:imgurl,
											lajitip:obj.lajitip
										}
										_this.SET_SHIBIE_OBJ(imgsortobj)
										uni.hideLoading()
										uni.navigateTo({
											url:'shibiepage/shibiepage'
										})
									}
								})
							}
						})
					}
				})
			},
			openrecordSetting:function(){
				var _this = this
				uni.authorize({
				    scope: 'scope.record',
				    success() {
							_this.openrecordSet = false
				    },
						fail(){
							uni.showModal({
								title:'需授权录音功能',
								content:'授权后可以正常使用语音识别',
								success:function(res){
									if (res.confirm) {
										console.log('用户点击确定');
										uni.openSetting({
										  success(res) {
										    console.log(res.authSetting)
										  }
										});
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
						}
				})
			},
			yuyinsorttip:function(){
				uni.showToast({
					title:'长按录音,松开结束',
					icon:'none'
				})
			},
			longpresssort:function(){
				console.log('开始录音');
				var _this = this
				_this.yuyinstart = true;
				recorderManager.start({
					duration:60000,
					sampleRate:16000,
					numberOfChannels:1,
					frameSize:1024
				});
			},
			touchendsort:function(){
				console.log('结束')
				this.yuyinstart = false;
				recorderManager.stop();
			},
			voicelajifenlei:function(voice){
				var _this = this
				console.log(voice)
				uni.showLoading({
					title:'语音识别中',
					mask:true
				})
				uni.uploadFile({
					url: _this.requesturl + '/txapi/voicelajifenlei/index', //语音垃圾分类接口
					filePath: voice,
					name: 'say',
					formData: {
						key: _this.key,
						format:'m4a'
					},
					success (res){
						
						var obj = JSON.parse(res.data).newslist[0]
						var voiceobj = {
							name:obj.name,
							type:obj.lajitype,
							imgurl:'',
							lajitip:obj.lajitip
						}
						_this.SET_SHIBIE_OBJ(voiceobj)
						uni.hideLoading()
						uni.navigateTo({
							url:'shibiepage/shibiepage'
						})
					}
				})
				
				
				// uni.request({
				// 	url:_this.requesturl + '/txapi/voicelajifenlei/index',
				// 	header: { 
				// 		'enctype':'application/x-www-form-urlencoded'
				// 	},
				// 	method:"POST",
				// 	data:{
				// 		key:_this.key,
				// 		say:voice,
				// 		format:'m4a'
				// 	},
				// 	success:function(res){
				// 		uni.hideLoading()
				// 		console.log(res)
				// 		var code = res.data.code
				// 		if(code == 200){
							
				// 		}else if(code == 290){
				// 			uni.showToast({
				// 				title:'录音时间过长',
				// 				icon:'none'
				// 			})
				// 		}
				// 	}
				// })
			}
		},
		onLoad(){
			this.getHotsearch()
			var _this = this
			uni.getSetting({
				success(res) {
					console.log(res.authSetting)
					if(res.authSetting['scope.record'] == true){
						_this.openrecordSet = false
					}else if(res.authSetting['scope.record'] == false){
						_this.openrecordSet = true
					}
				}
			})
			recorderManager.onStop(function (res) {
				console.log('获取录音文件')
				var voicefile = res.tempFilePath;
				_this.voicelajifenlei(voicefile)
			});
		},
		
	}
</script>

<style>
	page{
		width:100%;
		height:100%;
	}
	.knowledge{
		width:90%;
		margin:0 auto;
		font-size: 28rpx;
		color:#fff;
		margin-top:46rpx;
		text-decoration: underline;
		z-index: 998;
		display: flex;
		justify-content: space-between;
		position: relative;
	}
	.allhotsearch{
		width:90%;
		margin:0 auto;
		font-size: 28rpx;
		color:#fff;
		margin-top:40rpx;
		text-decoration: underline;
	}
	.beizhu{
		width:100%;
		text-align: center;
		font-size: 24rpx;
		color:#fff;
		position: fixed;
		bottom: 40rpx;
		z-index: 998;
	}
.wrap{
	width:100%;
	overflow: hidden;
	position: relative;
	height:100%;
	background: #2375f4;
	background: -webkit-gradient(linear,left bottom,left top,from(#00a2ff),to(#2a6cf2));
	background: linear-gradient(0deg,#00a2ff,#2a6cf2);
}
.title{
	font-size: 50rpx;
	color:#fff;
	text-align: center;
	letter-spacing: 1px;
	margin-top: 40rpx;
	/* font-family:'STKaiti' */
}
.input-wrap{
	width:90%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin:0 auto;
	border-radius: 10rpx;
	margin-top:40rpx;
	background:#fff;
	height:80rpx;
}
.hotsearch{
	width:90%;
	margin:0 auto;
	font-size: 30rpx;
	color:#fff;
	margin-top:50rpx;
	margin-bottom: 20rpx;
}
.input-wrap image{
	width:40rpx;
	height:40rpx;
	margin-left:20rpx;
}
.rubbish-input{
	width:calc(100% - 200rpx);
	height:100%;
	color:#444444;
	font-size: 30rpx;
}
.search-btn{
	width:100rpx;
	height:100%;
	text-align: center;
	line-height: 80rpx;
	border-left:1px solid skyblue;
	color:skyblue;
}
.bg-img{
	position: fixed;
	bottom:0;
	width:100%;
	height:250rpx;
	opacity: 0.4;
}
.hot-wrap{
	width:90%;
	margin:0 auto;
	display: flex;
	font-size: 30rpx;
	color:#fff;
	flex-wrap: wrap;
}
.hot-item{
	padding:10rpx 20rpx; 
	border:1px solid #fff;
	border-radius: 30rpx;
	margin-top: 20rpx;
	margin-left:20rpx;
}
.super-fn{
	width:90%;
	margin:0 auto;
	display: flex;
	align-items: center;
	justify-content: space-around;
	color: #fff;
	font-size: 14px;
	margin-top: 60rpx;
}
.super-fn image{
	width:70rpx;
	height:70rpx;
	display: block;
	margin:0 auto 20rpx;
}
.super-fn .super-fn-item{
	width:30%;
	border:1px solid #fff;
	border-radius: 20rpx;
	padding:30rpx 20rpx;
	
	text-align: center;
}
.super-fn .yuyinsort-view{
	position: relative;
	z-index: 1000;
}
.yuyin-mask{
	width:100%;
	height:100%;
	position: fixed;
	top:0;
	left:0;
	z-index: 999;
	background:rgba(0,0,0,0.5);
	text-align: center;
	color:#fff;
	font-size: 18px;
}
.yuyin-mask view{
	width:80%;
	padding:20rpx 0;
	border-radius: 20rpx;
	margin: 300rpx auto 0;
	background:#fff;
	color: #333;
	
}
</style>
