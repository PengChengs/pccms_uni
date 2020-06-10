<template>
	<view class="bottom">
		<view class="nav-box">
			<view class="nav-tab" :class="{'nav-tab-active':home===0}" @click="toIndex(0)">
				<view class="nav-icon">
					<view class="circle">
						<i class="iconfont home" />
					</view>
				</view>
				<view class="nav-text">
					首页
				</view>
			</view>
			<view class="nav-tab" :class="{'nav-tab-active':home===1}" @click="toIndex(1)">
				<view class="nav-icon" >
					<view class="circle">
						<i class="iconfont cate" />
					</view>
				</view>
				<view class="nav-text">
					分类
				</view>
			</view>
			<!-- 跳转独立的搜索页 -->
			<view class="nav-tab" @click="toIndex(2)">
				<view class="nav-icon" >
					<view class="circle">
						<i class="iconfont search" />
					</view>
				</view>
				<view class="nav-text">
					搜索
				</view>
			</view>
			<view class="nav-tab" :class="{'nav-tab-active':home===3}" @click="toIndex(3)">
				<view class="nav-icon" >
					<view class="circle">
						<i class="iconfont enshrine" />
					</view>
				</view>
				<view class="nav-text">
					收藏夹
				</view>
			</view>
			<view class="nav-tab" :class="{'nav-tab-active':home===4}" @click="toIndex(4)">
				<view class="nav-icon" >
					<view class="circle">
						<i class="iconfont user" />
					</view>
				</view>
				<view class="nav-text">
					我的
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				home: 0,
			}
		},
		onLoad() {
				
		},
		methods: {
			toPage(url) {
				uni.navigateTo({
					url
				})
			},
			toIndex(index) {
				console.log(index);
				if (index === 2) {
					console.log(index);
					uni.navigateTo({
						url: '../../pages/search/search'
					});
					console.log(index);
				} else {
					this.$emit('toIndex', index)
					this.home = index
				}

			}
		}
	}
</script>

<style scoped lang="scss">
	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: $navHeight;
		box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.06);
		background: #fff;
		z-index: 10;
	}

	.nav-tab {
		fiex: 1;
		text-align: center;
		width: 100%;
		height: $navHeight;
	}

	.nav-icon {
		height: 30px;
		color: $mediumGrey;
		box-sizing:border-box;
		padding: 4px 0 2px 0;
	}

	.nav-icon .iconfont {
		font-size: 20px;
	}

	.nav-text {
		font-size: 11px;
		height: 19px;
		color: $mediumGrey;
		font-weight: 400;
	}

	.nav-tab-active .circle {
		height: 38px;
		width: 38px;
		line-height: 38px;
		position: relative;
		top: -14px;
		left: calc(50% - 19px);
		border-radius: 50%;
		background: $dominantHue;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
	}

	.nav-tab-active .iconfont {
		color: #fff;
	}

	.nav-tab-active .nav-text{
		color: $dominantHue;
	}
	.nav-box{
		/* position: absolute; */
		display: flex;
		width: 100%;
		box-sizing:border-box;
	}

	/*苹果x适配 H5APP*/
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		.bottom {
			height: $navHeight + $navBoxHeight;
		}
	}

	/*苹果xs适配 H5APP*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		.bottom {
			height: $navHeight + $navBoxHeight;
		}
	}

	/*苹果xr适配 H5APP*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		.bottom {
			height: $navHeight + $navBoxHeight;
		}
	}
	
</style>