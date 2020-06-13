<template>
	<view>
		<view class="content-one">
			<view class="one-title">{{chapterTiltle}}</view>
			<view class="one-context" v-html="bookContext"></view>
			<view class="one-footer">
				<view class="one-footer-ider"></view>
				<view class="one-footer-divider">本章完</view>
				<view class="one-footer-ider"></view>
			</view>
		</view> <!-- 最底下内容层 -->
		<view class="content-two"></view> <!-- 中间点击层 -->
		<view class="content-three"></view> <!-- 最上层设置层 -->
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bookId:1,
				chapterId:1,
				chapterTiltle:'',
				bookContext: ''
			}
		},onLoad(option) {
			console.log("===============")
			this.bookId=option.bookId
			this.chapterId=option.chapterId
			console.log("bookId: "+this.bookId)
			console.log("chapterId: "+this.chapterId)
			this.sysBookChapter();
		},
		methods: {
			sysBookChapter(){
				uni.showLoading({
				    title: '加载中',
					mask: true
				});
				let that=this
				let data={
					bookId: that.bookId,
					chapterId: that.chapterId
				}
				this.$api.sysBookChapter(data).then(res => {
					console.log(res.data)
					if(res.data.status === 200){
						that.chapterTiltle=res.data.data.chapterTiltle
						that.bookContext=res.data.data.bookContext
						that.bookContext=that.bookContext.replace(/\s/g,"<br/>		");
						console.log(that.bookContext.replace(/\s/g,"<br/>"))
					}else{
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
			}
		}
	}
</script>

<style lang="scss" scoped>
.content-one{
	display: block;
	width: 100%;
	background:url('https://s1.ax1x.com/2020/06/14/txD560.jpg') center center/100% 100% no-repeat;
	border: 1px solid red;
	.one-title{
		display: block;
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 35upx;
		border-bottom: 1upx solid #d3d7d4;
	}
	.one-context{
		display: block;
		width: 100%;
		line-height: 60upx;
		text-indent:2em;
		white-space: pre-line;
		// border: 1px solid red;
	}
	.one-footer{
		display: block;
		width: 95%;
		height: 60upx;
		margin: 40upx 0upx 40upx;
		// border-top: 1upx dashed #999d9c;
		// border: 1px solid red;
		.one-footer-ider{
			display: block;
			width: 40%;
			height: 100%;
			float: left;
			border-top: 1upx dashed #999d9c;
			// border: 1px solid red;
		}
		.one-footer-divider{
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
.content-two{
	
}
.content-three{
	
}
</style>
