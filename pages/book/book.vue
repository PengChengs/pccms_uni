<template>
	<view class="Subject">
	
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
			<view class="clear-box"></view>
		</view>
		<view class="booklist-content">
			<booklist :booklist="list"></booklist>
		</view>
		<u-back-top :scroll-top="scrollTop" top="500" :bottom="50"></u-back-top>
		<u-toast ref="uToast" />
		<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" bg-color="#f2f2f2" @loadmore="loadmore"/>
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
					loadmore: '上拉或点击加载更多',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				//加载更多 end
			}
		},onLoad: function (option) {
			
			uni.showLoading({ //开启加载框
			    title: '加载中'
			});
			this.bookList(this.bookType);
			this.mainSysMenuList();
			
		},
		onPageScroll(e) { //回到顶部
			this.scrollTop = e.scrollTop;
		},onReachBottom(){
			console.log("到底了")
			this.loadmore();
			
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
				uni.showLoading({
				    title: '加载中',
					mask: true
				});
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
					uni.hideLoading(); //隐藏加载框
				}).catch(err => {
					this.$refs.uToast.show({
						title: '网络错误',
						type: 'error',
						position: 'top'
					})
				});
				that.pageNum++;
			},
			loadmore() { //加载更多
				this.status = 'loadmore'
				if(this.pageNum<=this.pages){
					this.bookList(this.bookType);
					this.status = 'loading'
				}else{
					this.status = 'nomore'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	  .status_bar {
		  position: fixed;
		  top: 0upx;
	      height: var(--status-bar-height);
	      width: 100%;
	  }
	.booklist-title{
		display: block;
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		float: top;
		z-index: 1;
		width: 100%;
		height: 100upx;
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
	// border: 1px solid red;
	.book-type{
		display: block;
		float: left;
		height: 60upx;
		margin: 20upx 0upx 0upx 20upx;
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
.types:active{
	color: white;
	border-radius: 30upx;
	background-color: #71d5a1;
	border: 1px solid #71d5a1;
}
.booklist-content{
	padding: 20upx 40upx 30upx 40upx;
	
	// border: 1px solid red;
}
</style>
