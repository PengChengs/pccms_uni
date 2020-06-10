<template>
	<view class="list2">
		<!-- 图文列表 -->
		<view class="books" v-for="(information,dataKey) in booklist" :key="dataKey" @click="bookTextBtn(information.bookId)">
			<view class="books-img">
				<image :src="information.bookLogo" :mode="mode" />
			</view>
			<view class="books-text">
				<!-- <p class="head">{{information.bookTitle}}</p> -->
				<!--<view class="title-box">
					<p class="title">作者: {{ information.bookAuthor}}</p>
					 <p class="title">最新章节: {{ information.bookAuthor}}</p>
					<p class="title">章节数: {{ information.bookNewChapters}}章 | {{information.bookStatus == 0 ? '连载中' : '已完结'}}</p>
					<p class="title">更新时间: {{ information.bookUpdateTime}}</p> 
				</view>-->
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
				mode:'aspectFit'
			};
		},
		methods: {
			bookTextBtn(bookTextBtn) {
			 	console.log('你点击了第' + bookTextBtn + '个')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list2{
		display: flexbox;
		width: 100%;
		height: 600upx;
		// border: 1px solid red;
	}
.books {
	display: block;
	float: left;
	width: 31%;
	height: 270upx;
	margin: 20upx 0upx 10upx 10upx;
	padding: 10upx;
	background-color: #ffffff;
	border-radius: 10upx;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2); //; 5upx 2upx 8upx #656B79

}

.books-img image {
	width: 100%;
	height: 250upx;
	background-color: $skeletonColor;
	border-radius: 10upx;
}
.books-text{
	flex-direction:row;
	margin-left: 20upx;
}
.books-text .head{
	color: #2979ff;
	font:32upx KaiTi;
	font-weight:bold;
}
.books-text .title-box{
	margin-top: 10upx;
	.title{
		margin-top: 5upx;
		font:20upx Microsoft Yahei;
		color: #909399;
	}
}
</style>
