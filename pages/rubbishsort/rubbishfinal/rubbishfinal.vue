<template>
	<view class="final-wrap">
		<view class="final-head">
			<image class="head-bg" src="../../../static/img/headerBg.407913dc.png" mode=""></image>
			<image v-if="rubbishtypenum == 0" class="lj-img" src="../../../static/img/glj.png" mode=""></image>
			<image v-if="rubbishtypenum == 1" class="lj-img" src="../../../static/img/slj.png" mode=""></image>
			<image v-if="rubbishtypenum == 2" class="lj-img" src="../../../static/img/yhlj.png" mode=""></image>
			<image v-if="rubbishtypenum == 3" class="lj-img" src="../../../static/img/khsw.png" mode=""></image>
		</view>
		<view class="rubbishname">{{finalobj.name}}</view>
		<view class="rubbishtype">{{type}}</view>
		<view class="rubbish-zd">
			<view class="zd-title">什么是{{type}}？</view>
			<view class="zd-item">{{finalobj.explain}}</view>
		</view>
		<view class="rubbish-zd">
			<view class="zd-title">这些都是典型的{{type}}</view>
			<view class="zd-item">{{finalobj.contain}}</view>
		</view>
		<view class="rubbish-zd" v-if="rubbishtypenum == 3">
			<view class="zd-title">干垃圾投放指导</view>
			<view class="zd-item">1.尽量沥干水分</view>
			<view class="zd-item">2.难以辨别的生活垃圾应投入干垃圾容器内</view>
			<view class="zd-item">3.餐巾纸、纸巾、纸尿裤、烟蒂等其他垃圾</view>
		</view>
		<view class="rubbish-zd" v-if="rubbishtypenum == 2">
			<view class="zd-title">湿垃圾投放指导</view>
			<view class="zd-item">1.餐厨垃圾应沥干水分后在投放，有包装物的应取出后分类投放</view>
			<view class="zd-item">2.大块骨头和椰子壳，榴莲壳等不宜生化降解，作为干垃圾进行投放</view>
			<view class="zd-item">3.纯液体（如牛奶等），可直接倒入下水口</view>
		</view>
		<view class="rubbish-zd" v-if="rubbishtypenum == 1">
			<view class="zd-title">有害垃圾投放指导</view>
			<view class="zd-item">1.充电电池、纽扣电池、蓄电池投放时应注意轻放</view>
			<view class="zd-item">2.油漆桶、杀虫剂如有残留请密闭后投放</view>
			<view class="zd-item">3.荧光灯、节能灯易破损连带包装或包裹后投放</view>
			<view class="zd-item">4.废药品及其包装一并投放</view>
		</view>
		<view class="rubbish-zd" v-if="rubbishtypenum == 0">
			<view class="zd-title">可回收垃圾投放指导</view>
			<view class="zd-item">1.清洁干燥，避免污染，轻拿轻放</view>
			<view class="zd-item">2.废纸尽量平整，立体包装请清空内容物，清洁后压扁投放</view>
			<view class="zd-item">3.有尖锐边角的，应包裹后投放</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				rubbishtypenum:'',
				type:''
			}
		},
		computed:{
			...mapState([
				'finalobj'
			])
		},
		onLoad(){
			var type = this.finalobj.type == 0 ? '可回收物' : this.finalobj.type == 1 ? '有害垃圾' : this.finalobj.type == 2 ? '厨余(湿)垃圾' : this.finalobj.type == 3 ? '其他(干)垃圾' : ''
			this.rubbishtypenum = this.finalobj.type
			this.type = type
		},
		methods: {
			
		}
	}
</script>

<style>

.head-bg{
	width:100%;
	height:320rpx;
	
}
.final-head{
	width:100%;
	height:400rpx;
	position:relative;
}
.lj-img{
	width:160rpx;
	height:160rpx;
	position: absolute;
	bottom:0rpx;
	left:50%;
	margin-left:-80rpx;
}
.rubbishname{
	text-align: center;
	font-size: 37rpx;
	color: #666;
	margin-top: 39rpx;
}
.rubbishtype{
	text-align: center;
	font-size: 50rpx;
	color:#333;
	margin-top: 30rpx;
}
.rubbish-zd{
	width:80%;
	padding:20rpx;
	font-size: 28rpx;
	color:#888;
	margin:0 auto;
	background:#f4f4f4;
	margin-top: 30rpx;
}
.zd-item{
	line-height: 38rpx;
	width:90%;
	margin:0 auto;
	margin-bottom: 20rpx;
}
.zd-title{
	margin-bottom: 20rpx;
	margin-top: 10rpx;
}
.final-wrap{
	padding-bottom: 50rpx;
}
</style>
