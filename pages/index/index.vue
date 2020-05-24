<template>
	<view >
		<!-- 自定义导航位置 -->
		<!-- 页面需要的自定义导航 -->
		<!-- 页面 -->
		<home v-if="index === 0"/>
		<cate v-if="index === 1"/>
		<shop v-if="index === 2"/>
		<user v-if="index === 3"/>
		<!-- 底部导航 -->
		<foo-bar @toIndex="toIndex"></foo-bar>
	</view>
</template>

<script>
	import home from  '../home/home.vue'
	import cate from  '../cate/cate.vue'
	import shop from  '../enshrine/enshrine.vue'
	import user from  '../user/user.vue'
	import fooBar from  '@/components/fooBar/fooBar.vue'
	export default {
		components:{
			home,
			cate,
			shop,
			user,
			fooBar
		},
		data() {
			return {
				index: 0,
				title: '首页',
				skeletonOff: false,
			}
		},
		onLoad() {
			console.log(this.$baseUrl);
		},
		methods: {
			toIndex(index){
				// index 当前页面的索引
				this.index = index
				// 根据index判断页面
				// 修改自定义导航标题等
			},

		}
	}
</script>

<style>
	
</style>