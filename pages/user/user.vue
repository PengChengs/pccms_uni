<template>
	<view>
		<view class="header">
			<view class="bg">
				<view class="box">
					<view class="box-hd">
						<view class="avator">
							<img :src="user.avatar">
						</view>
						<view class="phone-number">{{user.userName}}</view>
					</view>
					<view class="box-bd">
						<view class="item">
							<view class="icon"><img src="/static/other/wx.png"></view>
							<view class="text">我的通知</view>
						</view>
						<view class="item">
							<view class="icon"><img src="/static/other/wb.png"></view>
							<view class="text">我的收藏</view>
						</view>
						<view class="item">
							<view class="icon"><img src="/static/other/zfb.png"></view>
							<view class="text">我的客服</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="list-content">
			<view class="list">
				<view class="li noborder">
					<view class="icon">
						<image src="/static/other/1.png"></image>
					</view>
					<view class="text">我的名片</view>
					<image class="to" src="/static/other/youjiantou.png"></image>
				</view>
			</view>
			<view class="list">
				<view class="li " @click="changeSkin">
					<view class="icon">
						<image src="/static/other/2.png"></image>
					</view>
					<view class="text">主题切换</view>
					<image class="to" src="/static/other/youjiantou.png"></image>
				</view>
				<view class="li ">
					<view class="icon">
						<image src="/static/other/3.png"></image>
					</view>
					<view class="text">帮助中心</view>
					<image class="to" src="/static/other/youjiantou.png"></image>
				</view>
				<view class="li ">
					<view class="icon">
						<image src="/static/other/4.png"></image>
					</view>
					<view class="text">关于我们</view>
					<image class="to" src="/static/other/youjiantou.png"></image>
				</view>
				<view class="li ">
					<view class="icon">
						<image src="/static/other/5.png"></image>
					</view>
					<view class="text">意见反馈</view>
					<image class="to" src="/static/other/youjiantou.png"></image>
				</view>
			</view>
			<view class="list">
				<view class="li noborder">
					<view class="icon">
						<image src="/static/other/6.png"></image>
					</view>
					<view class="text">系统设置</view>
					<image class="to" src="/static/other/youjiantou.png"></image>
				</view>
			</view>
			<view class="exit" @click="logout()">
				<view class="exit-box">退出登录</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				user: {}, //用户信息
				vip:{}, //vip信息
				authorities:[] //权限信息
			};
		},
		created() {
			this.getUserInfo();
		},
		methods: {
			getUserInfo(){ //查看个人信息
				this.$api.getUserInfo().then(res => {
					console.log(res.data)
					if(res.data.status === 200){
						this.user=res.data.data.user
						this.vip=res.data.data.vip
						this.authorities=res.data.data.authorities
					}else{

					}

				}).catch(err => {

				});
			},
			logout(){ //退出登录
				this.$api.logout().then(res => {
					uni.clearStorage();
					console.log(res.data)
					if(res.data.status === 200){
						uni.clearStorage();
						uni.reLaunch({
							url: '../../pages/index/index'
						});
					}else{

					}

				}).catch(err => {

				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f1f1f1;
		font-size: 30upx;
	}

	.header {
		background: #fff;
		height: 390upx;
		padding-bottom: 110upx;

		.bg {
			width: 100%;
			height: 200upx;
			padding-top: 100upx;
			background-color: #4191ea;
		}
	}

	.box {
		width: 650upx;
		height: 280upx;
		border-radius: 20upx;
		margin: 0 auto;
		background: #fff;
		box-shadow: 0 5upx 20upx 0upx rgba(0, 0, 150, .2);

		.box-hd {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;

			.avator {
				width: 160upx;
				height: 160upx;
				background: #fff;
				border: 5upx solid #fff;
				border-radius: 50%;
				margin-top: -80upx;
				overflow: hidden;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.phone-number {
				width: 100%;
				text-align: center;
			}
		}

		.box-bd {
			display: flex;
			flex-wrap: nowrap;
			flex-direction: row;
			justify-content: center;

			.item {
				flex: 1 1 auto;
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: center;
				border-right: 1px solid #f1f1f1;
				margin: 15upx 0;

				&:last-child {
					border: none;
				}

				.icon {
					width: 60upx;
					height: 60upx;

					img {
						width: 100%;
						height: 100%;
					}
				}

				.text {
					width: 100%;
					text-align: center;
					margin-top: 10upx;
				}
			}
		}
	}

	.list-content {
		background: #fff;
	}

	.list {
		width: 100%;
		border-bottom: 15upx solid #f1f1f1;
		background: #fff;

		&:last-child {
			border: none;
		}

		.li {
			width: 92%;
			height: 100upx;
			padding: 0 4%;
			border-bottom: 1px solid rgb(243, 243, 243);
			display: flex;
			align-items: center;

			&.noborder {
				border-bottom: 0
			}

			.icon {
				flex-shrink: 0;
				width: 50upx;
				height: 50upx;

				image {
					width: 50upx;
					height: 50upx;
				}
			}

			.text {
				padding-left: 20upx;
				width: 100%;
				color: #666;
			}

			.to {
				flex-shrink: 0;
				width: 40upx;
				height: 40upx;
			}
		}
	}
	.exit {
		height: 100rpx;
		line-height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: red;
		font-size: 32rpx;
		// .exit-box {
		// 	display: flex;
		// 	justify-content: center;
		// 	align-items: center;
		// 	background: #ffaa7f;
		// 	font-size: 28rpx;
		// 	width: 200rpx;
		// 	padding: 10rpx 20rpx;
		// 	color: #FFFFFF;
		// 	height: 70rpx;
		// 	border-radius: 10rpx;
		// }
	}
</style>
