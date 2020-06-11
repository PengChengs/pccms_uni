<template>
	<view class="Subject">
		<!-- #ifndef H5 -->
		<view class="status_bar">
		          <!-- 这里是状态栏 -->
		</view>
		<!-- #endif -->
		<view class="booklist-title">
			<view class="head but-left">
				<button size="mini" @click="toHome()" >首页</button>
			</view>
			<view class="head but-right">
				<view class="head-right"><button size="mini"  @click="toCate()">分类</button></view>
				<view class="head-right"><button size="mini"  @click="toEnshrine()">收藏夹</button></view>
			</view>
		</view>
		<view class="booklist-type">
			<view class="book-type">
				<view class="types" :class="{'change-menu': bookType === 0}" @click="bookList(0)">全部</view>
			</view>
			<view class="book-type" v-for="(info,Key) in menuList" :key="Key">
				<view class="types" :class="{'change-menu': bookType === info.menuId}" @click="bookList(info.menuId)">{{info.menuName}}</view>
			</view>
		</view>
		<view class="booklist-content">
			<booklist :booklist="list"></booklist>
		</view>
		<u-back-top :scroll-top="scrollTop" top="500" :bottom="50"></u-back-top>
		<u-toast ref="uToast" />
		<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" bg-color="#f2f2f2"/>
	</view>
	
</template>

<script>
	import booklist from '../../components/booklist/booklist.vue'
	export default {
		components:{
			booklist
		},
		data() {
			return {
				scrollTop: 0,
				menuType: 3, //3代表小说类 
				bookType: 0, 
				bookTypeName: '全部',
				menuColor: 'red',
				menuList:[],
				list:[],
				pageNum: 1,
				pageSize: 10,
				pages: 1,
				isshow: false,
				//加载更多 start
				status: 'loadmore', 
				iconType: 'flower',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				//加载更多 end
			}
		},onLoad: function (option) {
			this.bookList(this.bookType);
			this.mainSysMenuList();
		},onPageScroll(e) { //回到顶部
			this.scrollTop = e.scrollTop;
		},onReachBottom(){
			console.log("到底了")
			this.status = 'loading'
			if(this.pages>this.pageNum){
				this.bookList(this.bookType);
			}else{
				this.status = 'nomore'
			}
			
		},
		methods: {
			toHome(){ //回到首页
				uni.reLaunch({
					url:'../index/index'
				})
			},
			toCate(){ //去分类
				uni.reLaunch({
					url:'../index/index?index=1'
				})
			},
			toEnshrine(){ //去收藏夹
				uni.reLaunch({
					url:'../index/index?index=3'
				})
			},mainSysMenuList(){ //分类列表
				let that=this
				let data={
					menuType: that.menuType
				}
				this.$api.mainSysMenuList(data).then(res => {
					console.log(res.data)
					if(res.data.status === 200){
						that.menuList=res.data.data
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
			},
			bookList(bookType){ //图书列表
				let that=this
				if (that.bookType!==bookType) {
					that.pageNum=1
				}
				let data={
					bookType: bookType,
					pageNum: that.pageNum,
					pageSize: that.pageSize
				}
				this.$api.sysBookType(data).then(res => {
					if(res.data.status === 200){
						that.pages=res.data.data.pages;
						if (that.bookType===bookType) {
							that.list=that.list.concat(res.data.data.list)
						} else{
							that.list=res.data.data.list
							that.bookType=bookType
						}
						
					}else{
						this.$refs.uToast.show({
							title: '网络错误',
							type: 'error',
							position: 'top'
						})
					}
					this.status = 'loadmore'
				}).catch(err => {
					this.$refs.uToast.show({
						title: '网络错误',
						type: 'error',
						position: 'top'
					})
				});
				that.pageNum++;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.Subject{
		background-color: #f2f2f2;
	}
	  .status_bar {
		  position: fixed;
		  top: 0upx;
	      height: var(--status-bar-height);
	      width: 100%;
	  }
	.booklist-title{
		display: block;
		position: fixed;
		/* #ifdef H5 */
		top: 0px;
		/* #endif */
		/* #ifndef H5 */
		float: top;
		/* #endif */
		z-index: 1;
		width: 100%;
		// height: 100upx;
		background-color: #71d5a1;
		.head{
			display: block;
			padding: 20upx 0upx 10upx 15upx;
			button{
				padding-left: 14px;
				padding-right: 14px;
			}
		}
		.but-left{
			float: left;
		}
		.but-right{
			float: right;
			.head-right{
				float: left;
				margin-right: 10upx;
			}
		}
	}
.booklist-type{
	display: block;
	width: 100%;
	height: 300upx;
	/* #ifndef H5 */
	padding-top: var(--status-bar-height);
	margin-top: 120upx;
	/* #endif */
	/* #ifdef H5 */
	margin-top: 96upx;
	/* #endif */
	
	// border: 1px solid red;
	.book-type{
		display: block;
		float: left;
		height: 60upx;
		
		margin: 20upx 0upx 0upx 20upx;
		// border: 1px solid red;
		.types{
			// background-color: red;
			padding: 6upx 20upx 6upx 20upx;
			font-size: 27upx;
			transform: translateY(5%);/* 元素往下位移自身高度5%的距离 */
			
		}
	}
	
}
.change-menu{
	color: #71d5a1;
	border-radius: 30upx;
	border: 1px solid #71d5a1;
}
.booklist-content{
	padding: 20upx 40upx 30upx 40upx;
	
	// border: 1px solid red;
}
</style>
