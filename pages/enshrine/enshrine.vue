<template>
	<view class="page">
		<!-- 搜索框 -->
		<view class="search-page">
			<u-search placeholder="请输入关键字" :show-action="false" :clearabled="true" @focus="toSearch()"></u-search>
		</view>
		<!-- 切换选项卡 -->
		<view>
			<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<booklist :booklist="listBook"></booklist>
					<view class="pagination">
						<wyb-pagination :showTotalItem="true"  @change="onPageChange" />
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import booklist from '../../components/booklist/booklist.vue'
	import api from '@/utils/api.js'
	import wybPagination from '@/components/wyb-pagination/wyb-pagination.vue'
	export default {
		components:{
			booklist,
			wybPagination
		},
		data() {
			return {
				listBook: [],
				list: [{
						name: '小说'
					}, {
						name: '视频'
					}, {
						name: '漫画'
					}, {
						name: '音乐'
					}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的

			}
		},
		created(){
			console.log("home 显示 created")
			uni.showLoading({ //开启加载框
			    title: '加载中'
			});
			this.randBookList();
			console.log("home 显示 created2")
		},
		methods: {
			
			toSearch() { //跳转搜索页
				console.log("fasdfadfadfadsfadfasdfsdfsdfdfsfsaf");
				// uni.navigateTo({
				// 	url: '../../pages/search/search'
				// });
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				
			},
			randBookList(){ //猜你喜欢
				let that=this
				let data={
					pageSize:10
				}
				api.randBookList(data).then(res => {
					console.log(res.data.data)
					that.listBook=that.listBook.concat(res.data.data)
					uni.hideLoading(); //隐藏加载框
				}).catch(err => {
					
				});
				
			},
			onPageChange(e) { //分页
				let pageNum = e.current // 页码
				let type = e.type // 类型
			}
		}
	}
</script>

<style lang="scss" scoped>
.page{
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.search-page{
	background-color: white;
	padding: 11px 22px 0px 22px;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
.pagination{
	height: 80rpx;
	width: 100%;
	padding: 5px 0rpx 50px 0rpx;
}
</style>
