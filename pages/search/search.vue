<template>
	<view class="page">
		<!-- 搜索框 -->
		<view class="search-page">
			<u-search placeholder="请输入关键字" :show-action="true" :clearabled="true" v-model="likeName" @search="bookList" @custom="bookList"></u-search>
		</view>
		<!-- 切换选项卡 -->
		<view>
			<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<booklist :booklist="listBook"></booklist>
					<view class="pagination">
						<wyb-pagination :showTotalItem="true" :current="pageBookNum" :pageItems="pageBookSize" :totalItems="totalBook" @change="value => onPageChange(value, 'book')" />
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<booklist :booklist="listVideo"></booklist>
					<view class="pagination">
						<wyb-pagination :showTotalItem="true" :current="pageVideoNum" :pageItems="pageVideoSize" :totalItems="totalVideo" @change="value => onPageChange(value, 'video')" />
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<booklist :booklist="listComic"></booklist>
					<view class="pagination">
						<wyb-pagination :showTotalItem="true" :current="pageComicNum" :pageItems="pageComicSize" :totalItems="totalComic" @change="value => onPageChange(value, 'comic')" />
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<booklist :booklist="listMusic"></booklist>
					<view class="pagination">
						<wyb-pagination :showTotalItem="true" :current="pageMusicNum" :pageItems="pageMusicSize" :totalItems="totalMusic" @change="value => onPageChange(value, 'music')" />
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
				likeName:'', //搜索 小说名或作者关键字
				listBook: [],
				listVideo: [],
				listComic: [],
				listMusic: [],
				pageBookNum: 1,pageBookSize: 10,pagesBook: 1,totalBook: 0,
				pageVideoNum: 1,pageVideoSize: 10,pagesVideo: 1,totalVideo: 0,
				pageComicNum: 1,pageComicSize: 10,pagesComic: 1,totalComic: 0,
				pageMusicNum: 1,pageMusicSize: 10,pagesMusic: 1,totalMusic: 0,
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
			this.bookList();
			console.log("home 显示 created2")
		},
		methods: {
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
			bookList(){ //小说列表
				let that=this
				let data={
					likeName: that.likeName, //查询全部
					pageNum: that.pageBookNum,
					pageSize: that.pageBookSize
				}
				this.$api.selectSysBook(data).then(res => {
					if(res.data.status === 200){
						that.pagesBook=res.data.data.pages;
						that.totalBook=res.data.data.total;
						that.listBook=res.data.data.list
					}else{

					}
				}).catch(err => {
				});

			},
			onPageChange(e,type) { //分页
				let pageNum = e.current // 页码
				console.log(type)
				console.log(e)
				if(type=='book'){
					this.pageBookNum = e.current
					this.bookList(this.bookType);
				}else if (type=='video'){
					this.pageVideoNum = e.current
				}else if(type=='comic'){
					this.pageComicNum = e.current
				}else if(type=='music'){
					this.pageMusicNum = e.current
				}

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
		padding-bottom: 0px;
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
