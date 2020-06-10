<template>
	<view>
		<!-- <u-navbar :title="bookTypeTitle" :is-fixed="true"></u-navbar> -->
		<view class="booklist-title">
			<view class="head but-left">
				<button size="mini" >首页</button>
			</view>
			<view class="head but-right">
				<view class="head-right"><button size="mini" >分类</button></view>
				<view class="head-right"><button size="mini" >书架</button></view>
			</view>
			
			
		</view>
		<view class="booklist-type">
			
		</view>
		<view class="booklist-content">
			<booklist :booklist="list"></booklist>
		</view>
		<u-back-top :scroll-top="scrollTop" top="500" :bottom="50"></u-back-top>
		<u-toast ref="uToast" />
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
				bookTypeTitle:'', 
				scrollTop: 0,
				bookType: 1,
				bookTypeName: '玄幻小说',
				list:[],
				pageNum: 1,
				pageSize: 30
			}
		},onLoad: function (option) {
			let that=this
			that.bookTypeTitle= option.bookTypeTitle
			this.bookList();
		},onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			bookList(){
				
				let that=this
				console.log("test 方法");
				let data={
					bookType: that.bookType,
					pageNum: that.pageNum,
					pageSize: that.pageSize
				}
				this.$api.sysBookType(data).then(res => {
					console.log(res.data)
					if(res.data.status === 200){
						that.list=res.data.data.list
					}else{
						this.$refs.uToast.show({
							title: '网络错误',
							type: 'error',
							position: 'top'
						})
					}
				}).catch(err => {
					
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.booklist-title{
		display: block;
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
		.type{
			display: flex;
			width: 100%;
			height: 60upx;
			line-height: 60upx;
			font-size: 40upx;
			align-items: center;
			justify-content: center;
		}
	}
.booklist-type{
	display: flex;
	width: 100%;
	height: 800upx;
	border: 1px solid red;
}
.booklist-content{
	padding: 40upx;
	border: 1px solid red;
}
</style>
