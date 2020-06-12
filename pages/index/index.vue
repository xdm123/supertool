<template>
	<view class="content">
		<image class="bg-img" src="../../static/img/bg1.jpg" mode=""></image>
		<view class="btn-index wn"  data-type='wn'>
			<image src="../../static/img/cloud.png" mode=""></image>
			<text @click.stop="showtype">文案管</text>
			<view class="wenan-wrap" :class="showWenanType ? 'show-wenan-type' : 'hide-wenan-type'">
				<view @click.stop="goSecondPage"
				:data-id='item.id'
				class="wenan-second-type" v-for="item in wenanData" :key='item.id'>
					<image src="../../static/img/cloud.png" mode=""></image>
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
		<view class="btn-index gj" @click.stop="showtype" data-type='gj'>
			<image src="../../static/img/cloud.png" mode=""></image>
			<text>工具箱</text>
			<view class="wenan-wrap" :class="showToolType ? 'show-wenan-type' : 'hide-wenan-type'">
				<view @click.stop="goToolSecondPage"
				:data-id='item.id'
				class="wenan-second-type" v-for="item in toolData" :key='item.id'>
					<image src="../../static/img/cloud.png" mode=""></image>
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wenanData:[
					{
						text:'舔狗日记',
						id:1
					},{
						text:'网易云热评',
						id:2
					},{
						text:'土味情话',
						id:3
					},{
						text:'彩虹屁',
						id:4
					},{
						text:'经典台词',
						id:5
					}
				],
				toolData:[
					{
						text:'垃圾分类',
						id:1
					},{
						text:'宠物识别',
						id:2
					}
				],
				showWenanType:false,
				showToolType:false
			}
		},
		onLoad() {

		},
		methods: {
			showtype:function(e) {
				var type = e.currentTarget.dataset.type
				if(type == 'gj'){
					this.showToolType = !this.showToolType
				}else{
					this.showWenanType = !this.showWenanType
				}
				
			},
			goSecondPage:function(e){
				var id = e.currentTarget.dataset.id;
				var url;
				if(id == 1){
					url = '../tgrj/tgrj'
				}else if(id == 2 || id == 3 || id == 4){
					url = '../wyyrp/wyyrp?id=' + id
				}else if(id == 5){
					url = '../jdtc/jdtc'
				}
				uni.navigateTo({
					url:url
				})
			},
			goToolSecondPage:function(e){
				var id = e.currentTarget.dataset.id;
				var url;
				if(id == 1){
					url = '../rubbishsort/rubbishsort'
				}else if(id == 2){
					url = '../wyyrp/wyyrp?id=' + id
				}
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style>

	.content{
		position: relative;
		width:100%;
		height:100%;
	}
	.bg-img{
		width:100%;
		height:100%;
		position: absolute;
		z-index: 10;
	}
	.btn-index{
		width:250rpx;
		height:100rpx;
		position: absolute;
		z-index: 100;
		top:0;
		left:0;
		text-align: center;
		line-height: 140rpx;
		color:skyblue;
	}
	.btn-index image{
		width:100%;
		height:100rpx;
		position: absolute;
		top:0;
		left:0;
	}
	.btn-index text,.wenan-second-type text{
		position: absolute;
		z-index: 10;
		top:0;
		left:0;
		bottom:0;
		right:0;
		margin:auto;
		font-size: 14px;
	}
	.wenan-second-type text{
		color:orange;
	}
	.wn{
		top:30rpx;
		left:10%;
	}
	.gj{
		top:150rpx;
		left:60%;
	}
	.wenan-second-type{
		width:250rpx;
		height:100rpx;
		position: relative;
		margin-bottom: 20rpx;
		line-height: 140rpx;
	}
	.wenan-second-type image{
		width:100%;
		height:100%;
		position: absolute;
		top:0;
		left:0;
	}
	.wenan-wrap{
		margin-top: 140rpx;
		transition: all 0.3s linear;
	}
	.hide-wenan-type{
		opacity: 0;
	}
	.show-wenan-type{
		opacity: 1;
	}
</style>
