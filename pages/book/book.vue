<template>
	<view class="Subject">
		<view class="booklist-type">
<!--			<view class="book-type">-->
<!--				<view class="types" :class="{'change-menu': bookType == 0}" @click="bookList(0)">全部</view>-->
<!--			</view>-->
<!--			<view class="book-type" v-for="(info,Key) in menuList" :key="Key">-->
<!--				<view class="types" :class="{'change-menu': bookType == info.menuId}" @click="bookList(info.menuId)">{{info.menuName}}</view>-->
<!--			</view>-->
			<u-tabs name="menuName" :list="menuList" :is-scroll="true" :font-size="26" :current="bookType" @change="bookList"></u-tabs>
			<u-tabs name="clickName" :list="clickList" :is-scroll="true" :font-size="26" :current="clickListType" @change="clickChange"></u-tabs>
<!--			<view class="clear-box"></view>-->
		</view>
		<view class="booklist-content">
			<booklist :booklist="list"></booklist>
		</view>
		<u-back-top :scroll-top="scrollTop" top="500" :bottom="120"></u-back-top>
		<u-toast ref="uToast" />
<!--		<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" bg-color="#f2f2f2" @loadmore="loadmore"/>-->
		<view class="pagination">
			<wyb-pagination :showTotalItem="true" :current="pageNum" :pageItems="pageSize" :totalItems="total" @change="onPageChange" />
		</view>
	</view>

</template>

<script>
	import booklist from '../../components/booklist/booklist.vue'
	import wybPagination from '@/components/wyb-pagination/wyb-pagination.vue'
	export default {
		components:{
			booklist,
			wybPagination
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
				pageSize: 50,
				pages: 1,
				total: 0,
				isshow: false,
				//加载更多 start
				// status: 'loadmore',
				// iconType: 'flower',
				// loadText: {
				// 	loadmore: '上拉或点击加载更多',
				// 	loading: '努力加载中',
				// 	nomore: '实在没有了'
				// },
				//加载更多 end
				clickList:[{
					clickListType:0,
					clickName:'总点击榜'
				},{
					clickListType:1,
					clickName:'月点击榜'
				},{
					clickListType:2,
					clickName:'周点击榜'
				},{
					clickListType:3,
					clickName:'总搜索榜'
				},{
					clickListType:4,
					clickName:'月搜索榜'
				},{
					clickListType:5,
					clickName:'周搜索榜'
				},{
					clickListType:6,
					clickName:'收藏榜'
				}],
				clickListType:0
			}
		},
		onLoad: function (option) {
			console.log(option)
			if(Object.keys(option).length != 0){
				this.bookType=option.bookType
				this.$nextTick(() => {
					this.bookList();
					this.mainSysMenuList(option.bookType);
				});
			}else{
				this.bookType=0
				this.$nextTick(() => {
					this.bookList();
					this.mainSysMenuList(0);
				});
			}

			

		},
		onPageScroll(e) { //回到顶部
			this.scrollTop = e.scrollTop;
		},onReachBottom(){
			console.log("到底了")
			// this.loadmore();

		},watch: {
			bookType(val) {
				this.pageNum=1
			}
		},
		methods: {
			async mainSysMenuList(index){ //分类列表
				let that=this
				let data={
					menuType: that.menuType
				}
				let oldType=index
				console.log("old:"+oldType)
				await this.$api.mainSysMenuList(data).then(res => {
					console.log(res.data)
					if(res.data.status === 200){
						that.menuList=[];
						let menuAll= {
							menuId: 0,
							menuLevel: 0,
							menuName: "全部",
							menuSort: 0,
						};
						let menus=[];
						menus.push(menuAll)
						menus.push.apply(menus,res.data.data);
						console.log(menus)
						that.menuList=menus
						this.$nextTick(() => {
							console.log("n:"+this.bookType)
							console.log("o:"+oldType)
							this.bookType=oldType
						});
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
			bookList(index){ //图书列表
				let that=this
				that.bookType=index
				let data={
					bookType: that.bookType,
					pageNum: that.pageNum,
					pageSize: that.pageSize
				}

				this.$api.sysBookType(data).then(res => {
					if(res.data.status === 200){
						that.pages=res.data.data.pages;
						that.total=res.data.data.total;
						that.list=res.data.data.list
					}else{
						this.$refs.uToast.show({
							title: '网络错误',
							type: 'error',
							position: 'top'
						})
					}
					// this.status = 'loadmore'

				}).catch(err => {
					this.$refs.uToast.show({
						title: '网络错误',
						type: 'error',
						position: 'top'
					})
				});
				uni.hideLoading(); //隐藏加载框
			},
			clickChange(index){
				let that=this
				that.clickListType=index
				let data={
					bookType: that.bookType,
					pageNum: that.pageNum,
					pageSize: that.pageSize
				}
				
				this.$api.sysBookType(data).then(res => {
					if(res.data.status === 200){
						that.pages=res.data.data.pages;
						that.total=res.data.data.total;
						that.list=res.data.data.list
					}else{
					}
				}).catch(err => {
				});
			},
			onPageChange(e) { //分页
				let pageNum = e.current // 页码
				let type = e.type // 类型
				console.log(e)
				this.pageNum = e.current
				this.bookList();
			}
			// changeType(bookType){
			// 	this.bookType=bookType
			// 	this.bookList(bookType)
			// },
			// loadmore() { //加载更多
			// 	this.status = 'loadmore'
			// 	if(this.pageNum<=this.pages){
			// 		this.bookList(this.bookType);
			// 		this.status = 'loading'
			// 	}else{
			// 		this.status = 'nomore'
			// 	}
			// }
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
	position: -webkit-sticky;
	position: sticky;
	top: var(--window-top);
	z-index: 999;
	width: 100%;
}
.change-menu{
	color: #71d5a1;
	border-radius: 30upx;
	border: 1px solid #71d5a1;
}
// .types:active{
// 	color: white;
// 	border-radius: 30upx;
// 	background-color: #71d5a1;
// 	border: 1px solid #71d5a1;
// }
.booklist-content{
	padding: 20upx 40upx 30upx 40upx;

	// border: 1px solid red;
}
	  .pagination{
		  height: 80rpx;
		  width: 100%;
		  padding: 5px 0rpx 50px 0rpx;
	  }
</style>
