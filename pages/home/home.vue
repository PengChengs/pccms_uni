<template>
	<view>
		<view class="cont">
			<u-notice-bar mode="horizontal" :is-circular="true" :list="list"></u-notice-bar>
		</view>
		<view class="wrap">
				<u-swiper mode="round" :effect3d="true" :list="list2"></u-swiper>
		</view>
		<view class="search">
			<u-search placeholder="请输入关键字" input-align="center" :animation="true" v-model="search"></u-search>
		</view>
		<view class="hot">
			
		</view>
	</view>
</template>

<script>
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
							image: this.$baseUrl.baseUrl+'/localPic/2020/05/225be446fe-eb38-4391-b2ba-10c4e1c0d2c2.jpg',
							title: '蒹葭苍苍，白露为霜。所谓伊人，在水一方'
						},
						{
							image: this.$baseUrl.baseUrl+'/localPic/2020/05/22a4079d01-4223-4083-9249-09de84088d15.jpg',
							title: '溯洄从之，道阻且长。溯游从之，宛在水中央'
						},
						{
							image: this.$baseUrl.baseUrl+'/localPic/2020/05/22374c8266-7ee5-4966-9ccb-b664291b49b3.jpg',
							title: '蒹葭萋萋，白露未晞。所谓伊人，在水之湄'
						}
					],
					
			}
		},
		methods: {
			test(){
				console.log(this.data.list2)
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
</style>
