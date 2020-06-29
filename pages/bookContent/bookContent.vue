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
			<view class="three-enshrine" v-if="isBall">加书架</view>
			<view class="three-enshrine" v-else>已加入书架</view>
			<view class="clear-box"></view>
			
			<view class="three-title">
				<view class="three-title-left" @click="changeDown('reach')"><u-icon name="arrow-left" size="28" :custom-style="{display:'block',float:'left',width:'10%'}"></u-icon>上一章</view>
				<view class="three-title-center">{{chapterTiltle}}</view>
				<view class="three-title-right" @click="changeNext('reach')">下一章<u-icon name="arrow-right" size="28"></u-icon></view>
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
				<image src="https://s1.ax1x.com/2020/06/16/NF7ftf.png"></image>
				<view class="line-center">
					<slider value="30" @change="changeLine" min="20" max="70" block-size="30" show-value /> 
				</view>
				<image src="https://s1.ax1x.com/2020/06/16/NF7hh8.png"></image>
			</view>
			<view class="three-footer">
				<view class="footer-list"><image src="https://imgchr.com/i/NJYCUP"></image>返回首页</view>
				<view class="footer-list"><image src="https://imgchr.com/i/NJYSHI"></image>前往目录</view>
				<view class="footer-list"><image src="https://imgchr.com/i/NJYP4f"></image>前往封面</view>
				<view class="footer-list"><image src="https://imgchr.com/i/NJY9Et"></image>加入收藏夹</view>
			</view>
		</view> 

		<u-toast ref="uToast" />
		<!-- <u-back-top :scroll-top="scrollTop" top="500" :bottom="50"></u-back-top> -->
		<!-- <u-loadmore class="locadmore" :status="status" icon-type="iconType" :load-text="loadText" /> -->
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
				isBall: false, //是否加入书架,默认未加入
				src: 'https://s1.ax1x.com/2020/06/15/NP1jv8.jpg', //默认背景图
				fontColor: 'black', //默认字体颜色
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
			this.sysBookChapter();
			console.log('屏幕高度：' + uni.getSystemInfoSync().screenHeight)
			this.screenHeight = uni.getSystemInfoSync().screenHeight;
		},
		onPullDownRefresh() { //下拉刷新
			uni.startPullDownRefresh();
			console.log('下拉了')
			this.changeDown();
			uni.stopPullDownRefresh();
		},onReachBottom() { //上拉刷新
			console.log('上拉了')
			this.changeNext();
		},
		onPageScroll(e) {
			// this.scrollTop = e.scrollTop;
		},
		methods: {
			sysBookChapter() {
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
						this.list = bookList;
					} else {
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
				
			},isShowsConfig(chapterTiltle){ //是否显示配置栏
				this.isShow=!this.isShow;
				console.log(this.isShow)
				console.log(chapterTiltle)
				this.chapterTiltle=chapterTiltle;
			},changeDown(reach){ //上一章
				
				let that = this
				let data = {
					bookId: that.bookId,
					chapterId: that.chapterId
				}
				this.$api.downSysBookChapter(data).then(res => {
					if (res.data.status === 200) {
						if(null==res.data.data){
							this.$refs.uToast.show({
								title: '已是第一章',
								type: 'warning',
								position: 'top'
							})
						}else{
							that.chapterTiltle=res.data.data.chapterTiltle
							that.chapterId=res.data.data.chapterId
							let book = {};
							book.chapterTiltle = res.data.data.chapterTiltle
							book.bookContext = res.data.data.bookContext.replace(/\s/g, "<br>&emsp;&emsp;");
							let bookList = [];
							bookList.push(book);

							if(reach==='reach'){ //配置栏的上一章点击
								this.list = bookList;
							}else{ //页面上拉的上一章
								let bookDown = this.list;
								this.list = bookList.concat(bookDown)
							}
						}
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
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
				
			},changeNext(reach){ //下一章
				
				let that = this
				let data = {
					bookId: that.bookId,
					chapterId: that.chapterId
				}
				this.$api.nextSysBookChapter(data).then(res => {
					console.log(res.data)
					console.log(res.data.data)
					if (res.data.status === 200 ) {
						if(null==res.data.data){
							this.$refs.uToast.show({
								title: '已是最后一章',
								type: 'warning',
								position: 'top'
							})
						}else{
							that.chapterId=res.data.data.chapterId
							that.chapterTiltle=res.data.data.chapterTiltle
							let book = {};
							book.chapterTiltle = res.data.data.chapterTiltle
							book.bookContext = res.data.data.bookContext.replace(/\s/g, "<br>&emsp;&emsp;");
											
							let bookList = [];
							bookList.push(book);
							if(reach==='reach'){ //配置栏的下一章点击
								this.list = bookList;
							}else{ //页面下拉的下一章
								this.list = this.list.concat(bookList)
							}
						}
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'warning',
							position: 'top'
						})
					}
					
				}).catch(err => {
					console.log(err)
					this.$refs.uToast.show({
						title: '网络错误',
						type: 'error',
						position: 'top'
					})
				});
				
			},changeBg(index){ //改变背景图
				this.src=this.bgList[index].src;
				this.fontColor=this.bgList[index].fontColor;
				this.clickColor=index;
			},changeFont(e){ //改变字体
				console.log('value 发生变化：' + e.detail.value)
				this.fontSize=e.detail.value;
			},changeLine(e){ //改变字体间隔
				console.log('value 发生变化：' + e.detail.value)
				this.lineHeight=e.detail.value;
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
		height: 35%;
		background-color: white;
		// border: 1px solid red;
		.three-enshrine{
			display: block;
			width: 120upx;
			float: right;
			height: 120upx;
			border-radius: 50%;
			font-size: 10upx;
			color: white;
			line-height: 120upx;
			text-align: center;
			background: radial-gradient(circle at 100px 100px, #5cabff, #2979ff);
			// transform: rotateX(90deg) translateZ(-150px);
			margin: -160upx 40upx 0upx 0upx;
			box-shadow: 0 12px 24px rgba(0, 0.1, 0.2, 0.3); //; 5upx 2upx 8upx #656B79
			// border: 1px solid red;
		}
		.three-title{
			display: block;
			width: 100%;
			height: 60upx;
			line-height: 60upx;
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
				// border: 1px solid red;
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
		.three-line{
			display: inline-block;
			width: 100%;
			height: 80upx;
			margin-top: 5upx;
			border: 1px solid red;
			image{
				display: block;
				width: 8%;
				height: 70%;
				float: left;
				margin: 0upx auto;
				// bottom: 0upx;
				margin-left: 10upx;
				transform: translateY(10%);
				// border: 1px solid red;
			}
			.line-center{
				display: block;
				width: 80%;
				height: 100%;
				float: left;
				// border: 1px solid red;
			}
		}
		.three-footer{
			width: 100%;
			display: inline-block;
			height: 200upx;
			margin-top: 5upx;
			border: 1px solid red;
			.footer-list{
				display: block;
				width: 20%;
				height: 200upx;
			}
		}
	}

</style>
