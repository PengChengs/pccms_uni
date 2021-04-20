<template>
	<view class="Subject">
		
		<view class="book-info">
			<view class="img-bg" :style="{background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url('+bookInfo.bookLogo+') center  center/100% 180% no-repeat '}">
				<view class="book book-img"><image :src="bookInfo.bookLogo" mode="scaleToFill"></image></view>
				<view class="book book-title">
					<view class="head">{{bookInfo.bookTitle}}</view>
					<view class="title-box">
						<view class="title">作者: {{ bookInfo.bookAuthor}}</view>
						<view class="title">热度值: {{ bookInfo.bookClick}}</view>
						<view class="title">最新章节: {{ bookInfo.bookNewChaptersTitle}}</view>
						<view class="title">章节数: {{ bookInfo.bookNewChapters}}章 | {{bookInfo.bookStatus == 0 ? '连载中' : '已完结'}}</view>
						<view class="title">更新时间: {{ bookInfo.bookUpdateTime}}</view>
					</view>
				</view>
			</view>
			<view class="book-desc">
				<view class="desc-title">作品简介</view>
				<view class="desc-info">{{ bookInfo.bookDesc}}</view>
			</view>
		</view>
		<view class="book-new">
			<view class="new-title">
				<view class="new-title-p new-title-p-left"><u-icon class="icon" label-pos="left" name="list-dot"></u-icon></view>
				<view class="new-title-p new-title-p-left">目录</view>
				<view class="new-title-p new-title-p-right" @click="toChapter()">查看更多<u-icon class="icon" label-pos="right" name="arrow-right"></u-icon></view>
			</view>
			<view class="new-sub">
				<view class="new-sub-list"  v-for="(information,dataKey) in chapterList" :key="dataKey" @click="toContent(information.chapterId)"> 
				<!-- v-bind:class="[ (dataKey+1)%2==0 ?'b':'a']" -->
					{{information.chapterTiltle}}
				</view>
			</view>
			<view class="clear-box"></view>
		</view>
		<view class="book-rand">
			<view class="rand-title"><image src="https://s1.ax1x.com/2020/06/13/tjZVzT.png"></image>猜你喜欢</view>
			<booklist2 :booklist='randList' />
			<view class="clear-box"></view>
		</view>
		<view class="book-sticky">
			<view class="sticky-box sticky-left">加入书架</view>
			<view class="sticky-box sticky-right" @click="toChapter()">开始阅读</view>
		</view>
		
		<u-toast ref="uToast" />
		<view class="clear-box"></view>
	</view>
</template>

<script>
	import booklist2 from '../../components/booklist2/booklist2.vue'
	export default {
		components:{
			booklist2
		},
		data() {
			return {
				bookId: 1,
				bookInfo:{},
				chapterList: [],
				randList: []
			}
		},onLoad(option) {
			console.log('-----------');
			console.log(option);
			this.bookId=option.bookId;
			uni.showLoading({ //开启加载框
			    title: '加载中'
			});
			this.bookinfo();
			this.sysBookChapterList();
			this.randBookList();
		},
		methods: {
			bookinfo(){ //查询书籍详情
				let that=this
				let data={
					bookId: that.bookId
				}
				this.$api.sysBook(data).then(res => {
					console.log(res.data)
					if(res.data.status === 200){
						that.bookInfo=res.data.data
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
			sysBookChapterList(bookId){ //查询最新章节
				let that=this
				let data={
					bookId: that.bookId,
					pageSize: 10,
					sort: 'desc'
				}
				this.$api.sysBookChapterList(data).then(res => {
					console.log(res.data)
					if(res.data.status === 200){
						that.chapterList=res.data.data.list
					}else{
						this.$refs.uToast.show({
							title: '网络错误',
							type: 'error',
							position: 'top'
						})
					}
					uni.hideLoading(); //隐藏加载框
				}).catch(err => {
					this.$refs.uToast.show({
						title: '网络错误',
						type: 'error',
						position: 'top'
					})
				});
				
			},randBookList(){ //猜你喜欢
				let that=this
				let data={
					pageSize:9
				}
				this.$api.randBookList(data).then(res => {
					console.log(res.data.data)
					if(res.data.status === 200){
						that.randList=res.data.data
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
			},toChapter(){ //去章节页
				let data={
					bookId:this.bookInfo.bookId,
					bookTitle: this.bookInfo.bookTitle
				}
				uni.navigateTo({
					url:"../bookChapter/bookChapter"+this.$u.queryParams(data)
				})
			},toContent(chapterId){ //去内容页
				console.log('--------------')
				console.log(chapterId)
				let data={
					bookId:this.bookInfo.bookId,
					chapterId: chapterId
				}
				uni.navigateTo({
					url:"../bookContent/bookContent"+this.$u.queryParams(data)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.book-info{
	display: block;
	width: 100%;
	float: top;
	// border: 1px solid black;
	.img-bg{
		display: block;
		width: 100%;
		height: 500upx;
		float: top;
		//注意：如果同时设置了“position”和“size”两个属性，应该用左斜杠“/”，而不是用空格把两个参数值隔开：“position/size”。
		//background: color position size repeat origin clip attachment image;
		//background: url("img.jpg") center center/100% 100% no-repeat;
		// border: 1px solid red;
		.book{
			display: block;
			float: left;
			color: white;
			// border: 1px solid red;
		}
		.book-img{
			width: 210upx;
			height: 290upx;
			margin: 90upx 0upx 50upx 60upx;
			background-color: white;
			border-radius: 8%;
			// box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
			box-shadow: 3px 3px 2px 1px rgba(0, 0, 0, 0.6);
			// box-shadow: inset -3px -3px 1px rgba(0, 0, 0, 0.5);
			// border: 1px solid red;
			
		}
		.book-title {
			margin: 90upx 0upx 50upx 30upx;
			width: 420upx;
			.head{
				font:33upx Microsoft Yahei; //Microsoft Yahei KaiTi
				font-weight:bold;
			}
			.title-box{
				margin-top: 30upx;
				.title{
					margin-top: 20upx;
					font:20upx Microsoft Yahei;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2; //行数
					-webkit-box-orient: vertical;
				}
				
			}
		}
		
	}
	
}
.book-img image{
	display: block;
	margin: 0upx auto;
	width: 98%;
	height: 98%;
	border-radius: 8%;
	transform: translateY(1%);
}

.book-desc{
	display: block;
	width: 100%;
	// height: 536upx;
	margin-top: -36upx;
	z-index: 1;
	background-color: white;
	border-radius: 8% 8% 0 0;
	// border: 1px solid red;
	.desc-title{
		display: block;
		width: 90%;
		height: 100upx;
		margin-left: 40upx;
		// float: left;
		// margin: 0upx 40upx 0upx 40upx;
		// text-align: center;
		line-height: 100upx;
		
		font:50upx Microsoft Yahei;
		// font-weight:bold;
		color: #8a8c8e;
		// border: 1px solid red;
	}
	.desc-info{
		width: 90%;
		margin: 0upx 0upx 0upx 40upx;
		padding-bottom: 40upx;
		// margin-left: 40upx;
		// margin-top: 30upx;
		font:30upx Microsoft Yahei;
		line-height: 50upx;
		text-indent: 2em;
		letter-spacing:3upx;
		// border: 1px solid red;
	}
}
.book-new{
	display: block;
	width: 100%;
	// height: 200upx;
	margin-top: 20upx;
	background-color: white;
	font:32upx Microsoft Yahei;
	
	// border: 1px solid red;
	.new-title{
		display: block;
		width: 100%;
		// padding: 0upx 25upx 0upx 40upx;
		// float: left;
		height: 80upx;
		border-bottom: 1px solid #f2f2f2;
		// margin-left: 40upx;
		.new-title-p{
			display: block;
			height: 100%;
			line-height: 80upx;
			// border: 1px solid red;
		}
		.new-title-p-left{
			float: left;
			font-weight: bold;
			margin-left: 10upx;
			.icon{
				float: left;
				display: block;
				// transform: translateY(75%);
				// border: 1px solid red;
			}
		}
		.new-title-p-right{
			float: right;
			color: #999d9c;
			margin-right: 20upx;
			.icon{
				float: right;
				display: block;
				// transform: translateY(10%);
				// border: 1px solid red;
			}
		}
		.new-title-p-right:active{
			color: $uni-bg-color-hover;
		}
		

		
	}
	
	.new-sub{
		display: block;
		width: 90%;
		float: left;
		margin-left: 8%;
		
		.new-sub-list{
			display: block;
			width: 100%;
			float: left;
			margin: 5upx 0upx 5upx;
			font:30upx Microsoft Yahei;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			border-bottom: 1px solid #f2f2f2;
		}
		.new-sub-list:active{
			color: $uni-bg-color-hover;
		}
		// .a{
		// 	background-color: #d3d7d4;
		// }
		// .b{
		// 	background-color: #fffffb;
		// }
	}
}
.book-rand{
	margin-top: 20upx;
	padding: 0upx 30upx 30upx 30upx;
	background-color: white;
	font:32upx Microsoft Yahei;
	font-weight: bold;
	// line-height: 50upx;
	// border: 1px solid red;
	.rand-title{
		display: block;
		width: 100%;
		float: left;
		margin: 20upx 0upx 0upx 10upx;
		// border: 1px solid red;
	}
	.rand-title image{
		display: block;
		width: 50upx;
		height: 50upx;
		float: left;
		margin-right: 15upx;
		// border: 1px solid red;
	}
}
.book-sticky{
	display: block;
	width: 100%;
	height: 100upx;
	// margin-top: 20upx;
	position: sticky;
	bottom: 0upx;
	// border: 1px solid red;
	.sticky-box {
		display: block;
		width: 50%;
		height: 100%;
		float: left;
		line-height: 100upx;
		text-align: center;
	}
	.sticky-left{
		background-color: #f2f2f2; //f2f2f2 d3d7d4
		color: #888;
	}
	.sticky-left:active{
		background-color: #888; //f2f2f2 d3d7d4
		color: #f2f2f2;
	}
	.sticky-right{
		background-color: #FF9966;
		color: white;
	}
	.sticky-right:active{
		background-color: white;
		color: #FF9966;
	}
}
</style>
