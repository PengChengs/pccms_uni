<template>
	<view>
		<!-- 图文列表 -->
		<view class="books" v-for="(information,dataKey) in booklist" :key="dataKey" @click="bookTextBtn(information.bookId)">
			<view class="books-img">
				<image :src="information.bookLogo" />
			</view>
			<view class="books-text">
				<p class="head">{{information.bookTitle}}</p>
				<view class="title-box">
					<p class="title">作者: {{ information.bookAuthor}}</p>
					<p class="title">最新章节: {{ information.bookNewChaptersTitle}}</p>
					<p class="title">章节数: {{ information.bookNewChapters}}章 | {{information.bookStatus == 0 ? '连载中' : '已完结'}}</p>
					<p class="title">更新时间: {{ information.bookUpdateTime}}</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props: ['booklist'],
		data() {
			return {
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				}
			}
		},
		methods: {
			bookTextBtn(bookId) {
			 	console.log('你点击了第' + bookId + '个')
				uni.navigateTo({
				    url: '../bookInfo/bookInfo?bookId='+bookId
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.books {
		display: flex;
		margin: 20upx 0upx 0upx 0upx;
		padding: 10upx 10upx 0upx 10upx;
		background-color: #ffffff;
		border-radius: 10upx;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2); //; 5upx 2upx 8upx #656B79
		animation: fade-in;/*动画名称*/  
		animation-duration: 1.5s;/*动画持续时间*/  
		-webkit-animation:fade-in 1.5s;/*针对webkit内核*/ 
	}
	@keyframes fade-in {  
	    0% {opacity: 0;}/*初始状态 透明度为0*/  
	    40% {opacity: 0;}/*过渡状态 透明度为0*/  
	    100% {opacity: 1;}/*结束状态 透明度为1*/  
	}  
	@-webkit-keyframes fade-in {/*针对webkit内核*/  
	    0% {opacity: 0;}  
	    40% {opacity: 0;}  
	    100% {opacity: 1;}  
	} 

	.books-img image {
		width: 160upx;
		height: 212upx;
		background-color: $skeletonColor;
		border-radius: 10upx;
	}
	.books-text{
		flex-direction:row;
		margin-left: 50upx;
		width: 450upx;
	}
	.books-text .head{
		color: #2979ff;
		font:30upx Microsoft Yahei; //Microsoft Yahei KaiTi
		font-weight:bold;
	}
	.books-text .title-box{
		margin-top: 10upx;
		.title{
			margin-top: 5upx;
			width: 440upx;
			font:20upx Microsoft Yahei;
			color: #909399;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
</style>
