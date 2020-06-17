<template>
	<view>
		<image class="shibieimg" :src="shibieimg" mode="aspectFill"></image>
		<view v-if="shibietype == 'zhiwu'">
			<view class="item">
				<view class="title">植物名字：</view>
				<view class="ctn">{{shibieobj.name}}</view>
			</view>
			<view class="item" v-if="shibieobj.engName">
				<view class="title">植物英文名：</view>
				<view class="ctn">{{shibieobj.engName}}</view>
			</view>
			<view class="item" v-if="shibieobj.botanicalName">
				<view class="title">植物学名：</view>
				<view class="ctn">{{shibieobj.botanicalName}}</view>
			</view>
			<view class="item" v-if="shibieobj.alias">
				<view class="title">植物别名：</view>
				<view class="ctn">{{shibieobj.alias}}</view>
			</view>
			<view class="item" v-if="shibieobj.life">
				<view class="title">寿命：</view>
				<view class="ctn">{{shibieobj.life}}</view>
			</view>
			<view class="item" v-if="shibieobj.area">
				<view class="title">产地：</view>
				<view class="ctn">{{shibieobj.area}}</view>
			</view>
			<view class="item" v-if="shibieobj.kingdom">
				<view class="title">界别：</view>
				<view class="ctn">{{shibieobj.kingdom}}</view>
			</view>
			<view class="item" v-if="shibieobj.phylum">
				<view class="title">植物门：</view>
				<view class="ctn">{{shibieobj.phylum}}</view>
			</view>
			<view class="item" v-if="shibieobj.class">
				<view class="title">植物纲：</view>
				<view class="ctn">{{shibieobj.class}}</view>
			</view>
			<view class="item" v-if="shibieobj.orders">
				<view class="title">植物目：</view>
				<view class="ctn">{{shibieobj.orders}}</view>
			</view>
			<view class="item" v-if="shibieobj.family">
				<view class="title">植物科：</view>
				<view class="ctn">{{shibieobj.family}}</view>
			</view>
			<view class="item" v-if="shibieobj.genus">
				<view class="title">植物属：</view>
				<view class="ctn">{{shibieobj.genus}}</view>
			</view>
			<view class="item" v-if="shibieobj.species">
				<view class="title">植物种：</view>
				<view class="ctn">{{shibieobj.species}}</view>
			</view>
			<view class="item-bottom">
				<view v-if="shibieobj.desc" class="item-title">植物简介</view>
				<view v-if="shibieobj.desc" class="item-ctn">{{shibieobj.desc}}</view>
				<view v-if="shibieobj.feature" class="item-title">种植特点</view>
				<view v-if="shibieobj.feature" class="item-ctn">{{shibieobj.feature}}</view>
				<view v-if="shibieobj.careKnowledge" class="item-title">养护方式</view>
				<view v-if="shibieobj.careKnowledge" class="item-ctn">{{shibieobj.careKnowledge}}</view>
			</view>
			
		</view>
		<view v-if='shibietype == "chongwu"'>
			<view class="item">
				<view class="title">宠物名字：</view>
				<view class="ctn">{{shibieobj.name}}</view>
			</view>
			<view class="item" v-if="shibieobj.engName">
				<view class="title">宠物英文名：</view>
				<view class="ctn">{{shibieobj.engName}}</view>
			</view>
			<view class="item" v-if="shibieobj.characters">
				<view class="title">性格特点：</view>
				<view class="ctn">{{shibieobj.characters}}</view>
			</view>
			<view class="item" v-if="shibieobj.nation">
				<view class="title">祖籍：</view>
				<view class="ctn">{{shibieobj.nation}}</view>
			</view>
			<view class="item" v-if="shibieobj.easyOfDisease">
				<view class="title">易患病：</view>
				<view class="ctn">{{shibieobj.easyOfDisease}}</view>
			</view>
			<view class="item" v-if="shibieobj.life">
				<view class="title">寿命：</view>
				<view class="ctn">{{shibieobj.life}}</view>
			</view>
			<view class="item" v-if="shibieobj.price">
				<view class="title">价格：</view>
				<view class="ctn">{{shibieobj.price}}</view>
			</view>
			<view class="item-bottom">
				<view v-if="shibieobj.feature" class="item-title">体态特征</view>
				<view v-if="shibieobj.feature" class="item-ctn">{{shibieobj.feature}}</view>
				<view v-if="shibieobj.characterFeature" class="item-title">特点</view>
				<view v-if="shibieobj.characterFeature" class="item-ctn">{{shibieobj.characterFeature}}</view>
				<view v-if="shibieobj.careKnowledge" class="item-title">照顾须知</view>
				<view v-if="shibieobj.careKnowledge" class="item-ctn">{{shibieobj.careKnowledge}}</view>
				<view v-if="shibieobj.feedPoints" class="item-title">喂养注意</view>
				<view v-if="shibieobj.feedPoints" class="item-ctn">{{shibieobj.feedPoints}}</view>
			</view>
	</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			...mapState([
				'shibieimg',
				'shibieobj',
				'shibietype'
			])
		},
		methods: {
			
		}
	}
</script>

<style>
.shibieimg{
	width:400rpx;
	height:400rpx;
	display: block;
	margin:40rpx auto;
	border-radius: 40rpx;
}
.item{
	width:90%;
	margin:0 auto;
	font-size: 14px;
	display: flex;
	justify-content: space-between;
	line-height: 50rpx;
}
.title{
	width:30%;
	color:#292b33;
	text-align: right;
	font-weight: bold;
}
.ctn{
	width:70%;
	color:#8d8d8d;
	text-align: left;
}
.item-title{
	width:90%;
	margin:0 auto;
	font-size: 14px;
	color:#292b33;
	font-weight: bold;
	line-height: 50rpx;
	margin:20rpx 0;
	text-align: center;
}
.item-ctn{
	width:90%;
	margin:0 auto;
	font-size: 14px;
	color:#8d8d8d;
	line-height: 50rpx;
}
.item-bottom{
	margin: 50rpx 0;
}
</style>
