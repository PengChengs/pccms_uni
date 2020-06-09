<template>
	<view>
		<view class="cont">
			<u-notice-bar mode="horizontal" :speed="80" :is-circular="true" :more-icon="true" :list="list"></u-notice-bar>
		</view>
		<view class="wrap">
				<u-swiper mode="round" :effect3d="true" :list="list2" name="bookLogo" @click="testClick"></u-swiper>
		</view>
		<view class="search">
			<u-search placeholder="请输入关键字" input-align="center" :animation="true" v-model="search"></u-search>
		</view>
		<view class="hot">
			<u-section :title="title" :right="right" :bold="bold" :color="color"></u-section>
		</view>
	</view>
</template>

<script>
	import api from '@/utils/api.js'
	export default {
		data() {
			return {
				search:"",
				list: [
						'寒雨连江夜入吴',
						'平明送客楚山孤',
						'洛阳亲友如相问',
						'一片冰心在玉壶'
					],
				list2: [{
							bookLogo: this.$baseUrl+'/localPic/2020/05/225be446fe-eb38-4391-b2ba-10c4e1c0d2c2.jpg',
							title: '蒹葭苍苍，白露为霜。所谓伊人，在水一方',
							url: 'https://cms'
						}
					],
					title: '猜你喜欢',
					bold: true,
					right: true,
					color: this.$u.color['tipsColor']
					
			}
		},
		//uni-app 生命周期
		onReady(){
			console.log("home 显示 onReady")
		},onLoad(){
			console.log("home 显示 onLoad")
		},onShow(){
			console.log("home 显示 onShow")
		},onHide(){
			console.log("home 显示 onHide")
		},onUnload(){
			console.log("home 显示 onUnload")
		},
		
		//vue生命周期
		created(){
			console.log("home 显示 created")
			this.bookHotList();
		},mounted(){
			console.log("home 显示 mounted")
		},
		
		methods: {
			swiper(){
				console.log(this.data.list2)
			},
			testClick(index){
				console.log(index)
				console.log(this.list2[index])
				
			},
			bookHotList(){
				let that=this
				console.log("test 方法");
				let data={
					pageSize:10
				}
				api.bookHotList(data).then(res => {
					// console.log(res.data.data)
					that.list2=res.data.data
					 console.log(that.list2)
					that.list2.forEach((date)=>{
						console.log(date);
						let logo=this.$baseUrl+date.bookLogo;
						console.log(logo)
						date.bookLogo=logo
					})
					console.log(that.list2)
				}).catch(err => {
					
				});
			}
		}
	}
</script>

<style>
.cont{
	padding: 40upx;
	/* width: 100vw; */
	/* height: 100vh; */
	/* display: flex; */
	/* justify-content: center;
	align-items: center; */
}
.wrap {
		padding: 40upx;
}
.search{
	/* margin-top: 1upx; */
	padding: 40upx;
}
.hot{
	padding: 40upx;
}
</style>
