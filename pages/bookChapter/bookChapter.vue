<template>
	<view class="Subject">
		<view class="chapter-head" v-if="short==='asc'">
			<view class="head head-left">正序</view>
			<view class="head head-right" @click="changeSort()"><image src="https://s1.ax1x.com/2020/06/14/txtQkq.png"></image></view>
		</view>
		<view class="chapter-head" v-if="short==='desc'">
			<view class="head head-left">降序</view>
			<view class="head head-right" @click="changeSort()"><image src="https://s1.ax1x.com/2020/06/14/txtlt0.png"></image></view>
		</view>

		<view class="chapter-list" >
			<view class="chapter-list-p" v-for="(information,dataKey) in chapterList" :key="dataKey" @click="toContent(information.chapterId)">
				{{information.chapterTiltle}}
			</view>
		</view>

		<u-back-top :scroll-top="scrollTop" top="500" :bottom="50"></u-back-top>
		<u-loadmore :style="{display:'block'}" :status="status" :icon-type="iconType" :load-text="loadText" bg-color="#f2f2f2" @loadmore="loadmore"/>
		<u-toast ref="uToast" />

		<view class="clear-box"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bookId: 1,
				bookTitle:"",
				short: 'asc', //asc为正序,desc 为倒叙
				chapterList:[],
				pageNum: 1,
				pageSize: 50,
				pages: 1,
				total: 0,
				//底部加载更多
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '上拉或点击加载更多',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				//返回顶部
				scrollTop: 0
			}
		},onLoad(option) {
			console.log('-------------')
			console.log(option.bookId)
			this.bookId= Number(option.bookId)
			console.log(this.bookId)
			this.bookTitle=option.bookTitle
			uni.setNavigationBarTitle({
			    title: this.bookTitle
			});
			// uni.showToast({
			//     title: '标题',
			//     duration: 2000
			// });
			this.sysBookChapterList();
		},onReachBottom(){
			this.loadmore();

		},onPageScroll(e) {
		this.scrollTop = e.scrollTop;
		},
		methods: {
			changeSort(){ //切换正倒序
				this.short==='asc' ? this.short='desc' : this.short='asc',
				this.pageNum=1;
				this.chapterList=[];
				this.sysBookChapterList();
			},
			sysBookChapterList(){
				uni.showLoading({
				    title: '加载中',
					mask: true
				});
				let that=this
				let data={
					bookId: that.bookId,
					pageNum: that.pageNum,
					pageSize: that.pageSize,
					sort: that.short
				}
				this.$api.sysBookChapterList(data).then(res => {
					if(res.data.status === 200){
						that.chapterList=that.chapterList.concat(res.data.data.list)
						that.pages=res.data.data.pages
						that.total=res.data.data.total
					}else{
						this.$refs.uToast.show({
							title: '网络错误',
							type: 'error',
							position: 'top'
						})
					}

				}).catch(err => {
					this.$refs.uToast.show({
						title: '网络错误',
						type: 'error',
						position: 'top'
					})
				});
				this.pageNum++;
				uni.hideLoading(); //隐藏加载框
			},toContent(chapterId){ //去内容页
				let data={
					bookId:this.bookId,
					chapterId: chapterId
				}
				uni.navigateTo({
					// url:"../bookContent/bookContent?"+this.$u.queryParams(data)
					url:"../bookContent/bookContext?id="+this.bookId+"&mid="+chapterId
				})
			},
			loadmore() { //加载更多
				this.status = 'loadmore'
				if(this.pageNum<=this.pages){
					this.sysBookChapterList();
					this.status = 'loading'
				}else{
					this.status = 'nomore'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.chapter-head{
	display: block;
	float: left;
	width: 100%;
	height: 100upx;
	margin-top: 30upx;
	background-color: white;
	border-bottom: 1upx solid #d3d7d4;
	// border: 1px solid red;
	.head{
		display: block;
		width: 20%;
		height: 100%;
		line-height: 100upx;
		// border: 1px solid red;
	}
	.head-left{
		padding-left: 40upx;
		font-size: 30upx;
		float: left;
	}
	.head-right{
		float: right;
	}
	.head-right image{
		display: block;
		width: 60upx;
		height: 60upx;
		margin-left: 50upx;
		transform: translateY(30%);
		// border: 1px solid red;
	}
}
.chapter-list{
	display: block;
	float: left;
	width: 100%;
	background-color: white;
	// border: 1px solid red;
	.chapter-list-p{
		display: block;
		float: left;
		width: 90%;
		height: 90upx;
		line-height: 90upx;
		margin-left: 10%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		border-bottom: 1upx solid #f2f2f2;
	}
}
</style>
