<template>
	<view>
		
		<home v-if="index === 0"/>
		<cate v-if="index === 1"/>
		<shop v-if="index === 3"/>
		<user v-if="index === 4"/>
		
		<foo-bar @toIndex="toIndex" :index="index"></foo-bar>
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
			}
		},
		onLoad: function (option) {
			if ( undefined != option.index) {
				var change=option.index;
				this.toIndex(parseInt(change))  //特别注意 option中的值为 String类型，在这里需要转为 int类型
			} else{
				this.toIndex(0)
			}
		},
		// onReachBottom() {
		// 	console.log('fasdfasdfa')
		// },
		methods: {
			toIndex(index){
				// index 当前页面的索引 当点击首页的时候 链接初始化
				// if(this.index!=0 && index===0){
				// 	uni.reLaunch({
				// 		url:'../index/index'
				// 	})
				// }else{
					this.index = index
				// }
				
				
				// 根据index判断页面
				// 修改自定义导航标题等
			},

		}
	}
</script>

<style>
	
</style>