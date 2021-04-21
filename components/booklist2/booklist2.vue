<template>
	<view class="list2">
		<!-- 图文列表 -->
		<view class="books" v-for="(information,dataKey) in booklist" :key="dataKey" @tap="bookTextBtn(information.bookId)">
			<view class="books-img">
				<view class="books-btn">小说</view>
				<image :src="'https://z3.ax1x.com/2021/04/21/cbPBX4.jpg'" mode="scaleToFill" />
			</view>
			<!-- <view class="books-text"> -->
				<!-- <p class="head">{{information.bookTitle}}</p> -->
				<!--<view class="title-box">
					<p class="title">作者: {{ information.bookAuthor}}</p>
					 <p class="title">最新章节: {{ information.bookAuthor}}</p>
					<p class="title">章节数: {{ information.bookNewChapters}}章 | {{information.bookStatus == 0 ? '连载中' : '已完结'}}</p>
					<p class="title">更新时间: {{ information.bookUpdateTime}}</p>
				</view>-->
			<!-- </view> -->
		</view>

	</view>
</template>

<script>
	export default {
		components: {},
		props: ['booklist'],
		data() {
			return {
			};
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
	height: 250upx;
	margin: 20upx 0upx 10upx 10upx;
	padding: 10upx;
	background-color: #ffffff;
	border-radius: 10upx;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2); //; 5upx 2upx 8upx #656B79
	animation: fade-in;/*动画名称*/
	animation-duration: 1.5s;/*动画持续时间*/
	-webkit-animation:fade-in 1.5s;/*针对webkit内核*/
	// border: 1px solid red;

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
.books{
		position: relative;
	}
	.books-btn{
		position: absolute;
		top: 12px;
		left: 12px;
		border-radius: 5px;
		font-size: 9px;
		width: 33px;
		height: 19px;
		line-height: 19px;
		text-align: center;
		z-index: 99;
		background: rgb(0, 198, 87);
		color: rgb(255, 255, 255);
		// box-shadow: rgb(0 198 87 / 30%) 0px 4px 17px -4px;
	}
.books-img image {
	width: 100%;
	height: 235upx;
	// transform: translateY(2%);/* 元素往下位移自身高度5%的距离 */
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
