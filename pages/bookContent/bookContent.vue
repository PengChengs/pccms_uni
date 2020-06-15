<template>
	<view>
		<view class="content-one" v-for="(dataInfo,dataKey) in list" :key="dataKey" @click="isShowsConfig(dataInfo.chapterTiltle)"> <!-- 最底下内容层 -->
			<view class="one-title">{{dataInfo.chapterTiltle}}</view>
			<view class="one-context" v-html="dataInfo.bookContext" :style="{color:fontColor,fontSize:fontSize+'px',lineHeight:lineHeight+'px'}"></view>
			<view class="one-footer">
				<view class="one-footer-ider"></view>
				<view class="one-footer-divider">本章完</view>
				<view class="one-footer-ider"></view>
			</view>
		</view> 
		
		<view class="content-two" v-bind:style="{height: screenHeight+'px',background: 'url('+src+') center center/100% 100% no-repeat'}">  <!-- 中间点击层 --> <!-- :style="[{height: screenHeight+'px'}]" -->
			<view class="two-down"></view>
			<view class="two-content" ></view>
			<view class="two-bottom"></view>
		</view>
		
		<view class="content-three" v-if="isShow===true"><!-- 最上层设置层 -->
			<view class="three-title">
				<view class="three-title-left" @click="changeChapter('down')"><u-icon name="arrow-left" size="28"></u-icon>上一章</view>
				<view class="three-title-center">{{chapterTiltle}}</view>
				<view class="three-title-right" @click="changeChapter('bottom')">下一章<u-icon name="arrow-right" size="28"></u-icon></view>
			</view>
			
			<scroll-view scroll-x="true" class="three-bg" >
				<view class="three-bg-list" v-for="(dataInfo,dataKey) in bgList" :key="dataKey" :class="{'click-color': clickColor===dataKey}" @tap="changeBg(dataKey)">
					<image class="bg-list" :src="dataInfo.src" mode="scaleToFill" :lazy-load="true" ></image>
				</view>
			</scroll-view>
			
			<view class="three-font">
				<view class="font-left">A-</view>
				<view class="font-center">
					<slider value="20" @change="changeFont" min="10" max="30" block-size="30" show-value /> 
				</view>
				<view class="font-right">A+</view>
			</view>
			<view class="three-line">
				<u-icon class="line-list" size="80" name="list"></u-icon>
				<u-icon class="line-list" size="60" name="list"></u-icon>
				<u-icon class="line-list" size="50" name="list"></u-icon>
				<u-icon class="line-list" size="40" name="list"></u-icon>
			</view>
			<view class="three-footer"></view>
		</view> 

		<u-toast ref="uToast" />
		<!-- <u-back-top :scroll-top="scrollTop" top="500" :bottom="50"></u-back-top> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight: 0, //屏幕高度

				bookId: 1,
				chapterId: 1,
				chapterTiltle: '',
				list: [],

				//阅读配置
				// scrollTop: 0,
				isShow: false, //是否显示底部操作栏
				src: 'https://s1.ax1x.com/2020/06/15/NP1jv8.jpg',
				fontColor: 'black',
				clickColor: 0, //背景list下标
				bgList:[{
							src: 'https://s1.ax1x.com/2020/06/15/NP1jv8.jpg', //背景图
							fontColor: 'black' //字体颜色
						},
						{
							src: 'https://s1.ax1x.com/2020/06/14/txD560.jpg',
							fontColor: 'blue'
						},
						{
							src: 'https://s1.ax1x.com/2020/06/16/NPUkTS.jpg',
							fontColor: 'red'
						},
						{
							src: 'https://s1.ax1x.com/2020/06/14/txD560.jpg',
							fontColor: 'white'
						},
						{
							src: 'https://s1.ax1x.com/2020/06/16/NPUkTS.jpg',
							fontColor: 'black'
						},
						{
							src: 'https://s1.ax1x.com/2020/06/14/txD560.jpg',
							fontColor: 'black'
						},
						{
							src: 'https://s1.ax1x.com/2020/06/16/NPUkTS.jpg',
							fontColor: 'black'
						},
						{
							src: 'https://s1.ax1x.com/2020/06/14/txD560.jpg',
							fontColor: 'black'
						},
						{
							src: 'https://s1.ax1x.com/2020/06/16/NPUkTS.jpg',
							fontColor: 'black'
						}],
				fontSize: 20, //字体大小
				lineHeight: 40
				
				
				
			}
		},
		onLoad(option) {
			console.log("===============")
			this.bookId = option.bookId
			this.chapterId = option.chapterId
			console.log("bookId: " + this.bookId)
			console.log("chapterId: " + this.chapterId)
			this.sysBookChapter('bottom');
			console.log('屏幕高度：' + uni.getSystemInfoSync().screenHeight)
			this.screenHeight = uni.getSystemInfoSync().screenHeight;
		},
		onPullDownRefresh() { //下拉刷新
			uni.startPullDownRefresh();
			this.chapterId--;
			console.log('下拉了')
			this.sysBookChapter('down');
			uni.stopPullDownRefresh();
		},onReachBottom() { //上拉刷新

			this.chapterId++;
			console.log('上拉了')
			this.sysBookChapter('bottom');
		},
		onPageScroll(e) {
			// this.scrollTop = e.scrollTop;
		},
		methods: {
			sysBookChapter(short) { //Down 为拼接上一章 ，bottom为拼接下一章
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				let that = this
				let data = {
					bookId: that.bookId,
					chapterId: that.chapterId
				}
				this.$api.sysBookChapter(data).then(res => {
					if (res.data.status === 200) {
						
						that.chapterTiltle=res.data.data.chapterTiltle
						let book = {};
						book.chapterTiltle = res.data.data.chapterTiltle
						book.bookContext = res.data.data.bookContext.replace(/\s/g, "<br>&emsp;&emsp;");

						let bookList = [];
						bookList.push(book);

						if (short === 'down') { //拼接上一章
							let bookDown = this.list;
							this.list = bookList.concat(bookDown)
						} else if(short === 'bottom') { //拼接下一章
							this.list = this.list.concat(bookList)
						}else{ //reach 重新给list赋值   
							this.list = bookList;
							console.log(this.list)
						}
						console.log(book)
					} else {
						this.$refs.uToast.show({
							title: '网络错误1',
							type: 'error',
							position: 'top'
						})
					}
					uni.hideLoading(); //隐藏加载框
				}).catch(err => {
					this.$refs.uToast.show({
						title: '网络错误2',
						type: 'error',
						position: 'top'
					})
				});
			},isShowsConfig(chapterTiltle){ //是否显示配置栏
				this.isShow=!this.isShow;
				console.log(this.isShow)
				console.log(chapterTiltle)
				this.chapterTiltle=chapterTiltle;
			},changeChapter(reach){ //切换上下章节
				if(reach==='down'){ //上一章
					this.chapterId--;
					this.sysBookChapter('reach');
				}else{ //下一章
					this.chapterId++;
					this.sysBookChapter('reach');
				}
			},changeBg(index){
				this.src=this.bgList[index].src;
				this.fontColor=this.bgList[index].fontColor;
				this.clickColor=index;
			},changeFont(e){
				console.log('value 发生变化：' + e.detail.value)
				this.fontSize=e.detail.value;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content-one {
		display: block;
		width: 100%;
		// opacity: 0.7;
		// filter: alpha(opacity=70);
		/* 针对 IE8 以及更早的版本 */
		// -moz-opacity: 0.7;
		// pointer-events: none;
		// z-index: 999;
		// background:url('https://s1.ax1x.com/2020/06/14/txD560.jpg') center center/100% 100% no-repeat;

		border: 1px solid red;
		.one-title {
			display: block;
			width: 100%;
			height: 80upx;
			line-height: 80upx;
			text-align: center;
			font-size: 35upx;
			border-bottom: 1upx solid #d3d7d4;
		}

		.one-context {
			display: block;
			width: 100%;
			text-indent: 2em;
			white-space: pre-line;
			// border: 1px solid red;
		}

		.one-footer {
			display: block;
			width: 95%;
			height: 60upx;
			margin: 0upx auto;

			// border-top: 1upx dashed #999d9c;
			// border: 1px solid red;
			.one-footer-ider {
				display: block;
				width: 40%;
				height: 100%;
				float: left;
				border-top: 1upx dashed #999d9c;
				// border: 1px solid red;
			}

			.one-footer-divider {
				display: block;
				width: 120upx;
				height: 100%;
				float: left;
				margin: 0upx auto;
				margin-top: -30upx;
				line-height: 60upx;
				text-align: center;
				// border: 1px solid red;
				// border-left: 50px solid #ddd;
				// border-right: 150px solid #ddd;
			}
		}
	}

	.content-two {
		display: block;
		position: fixed;
		top: 0upx;
		width: 100%;
		// height: 600upx;
		z-index: -1;
		// opacity:0.6;
		// filter:alpha(opacity=60); /* 针对 IE8 以及更早的版本 */
		// background:url('https://s1.ax1x.com/2020/06/14/txD560.jpg') center center/100% 100% no-repeat;
		// pointer-events: auto;

		// height: 600px;
		border: 1px solid red;
		// .two-down{
		// 	width: 100%;
		// 	height: 30%;
		// 	border: 1px solid red;
		// }
		// .two-content{
		// 	width: 100%;
		// 	height: 40%;
		// 	border: 1px solid red;
		// }
		// .two-bottom{
		// 	width: 100%;
		// 	height: 30%;
		// 	border: 1px solid red;
		// }
	}

	.content-three {
		display: block;
		position: fixed;
		bottom: 0upx;
		width: 100%;
		height: 40%;
		background-color: white;
		// border: 1px solid red;
		.three-title{
			display: block;
			width: 100%;
			height: 60upx;
			// border: 1px solid red;
			border-top: 1px solid #d3d7d4;
			border-bottom: 1px solid #d3d7d4;
			margin-bottom: 10upx;
			.three-title-left{
				float: left;
				width: 25%;
				height: 100%;
				line-height: 60upx;
				text-align: center;
				// border: 1px solid red;
			}
			.three-title-center{
				float: left;
				width: 50%;
				height: 100%;
				text-align: center;
				line-height: 60upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				
				// text-overflow:ellipsis;
				// border: 1px solid red;
			}
			.three-title-right{
				float: right;
				width: 25%;
				height: 100%;
				text-align: center;
				line-height: 60upx;
				// border: 1px solid red;
			}
		}
		.three-bg{
			display: block;
			white-space: nowrap; // 滚动必须加的属性
			border: 1px solid red;
			.three-bg-list{
				display: inline-block;
				width: 80upx;
				height: 80upx;
				border-radius:50%;
				margin: 0upx 0upx 0upx 30upx;
				// border: 1px solid red;
				.bg-list{
					display: block;
					width: 90%;
					height: 90%;
					border-radius:50%;
					margin: 0px auto;
					// border: 1px solid red;
					transform: translateY(5%);
				}
				
			}
			.click-color{
				border: 2px solid #009ad6;
			}
		}
		.three-font{
			display: block;
			height: 80upx;
			margin-top: 5upx;
			border: 1px solid red;
			.font-left{
				display: block;
				width: 10%;
				height: 100%;
				float: left;
				text-align: center;
				line-height: 80upx;
				font-size: 10px;
				// border: 1px solid red;
			}
			.font-center{
				display: block;
				width: 80%;
				height: 100%;
				float: left;
				border: 1px solid red;
			}
			.font-right{
				display: block;
				width: 10%;
				height: 100%;
				float: left;
				text-align: center;
				line-height: 80upx;
				font-size: 30px;
				// border: 1px solid red;
			}
		}
		.three-line{}
		.three-footer{}
	}
</style>
