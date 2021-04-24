<template>
	<view class="container">
		<view class="bg bg-color-base margin-b20"></view>

		<view class="tab vs-row vs-align-center">
			<image class="tab-bg" src="https://6e69-niew6-1302638010.tcb.qcloud.la/denglu/%E7%99%BB%E5%BD%955/banner-icon.png?sign=d63f6b91aed3733b261cc0127d2cf702&t=1604049324"
			 mode=""></image>

			<view class="vs-row vs-align-center">
				<view class="vs-column vs-align-center margin-r40" @click="cur = 0">
					<text class="font-50 margin-b20" :class="[cur ? 'color-black-3': 'color-base']">登录</text>
					<view class="line bg-color-base" v-if="!cur"></view>
				</view>
				<view class="vs-column vs-align-center" @click="cur = 1">
					<text class="font-46 margin-b20" :class="[cur ? 'color-base': 'color-black-3']">注册</text>
					<view class="line bg-color-base" v-if="cur"></view>
				</view>
			</view>
		</view>

		<view class="login margin-b80" v-if="!cur">
			<view class="input vs-row vs-align-center margin-b40">
				<image class="input-icon margin-r20" src="https://6e69-niew6-1302638010.tcb.qcloud.la/denglu/%E7%99%BB%E5%BD%955/account.png?sign=599d8600e2d55f39ebd1cbc159a04729&t=1604049340"
				 mode=""></image>
				<input class="vs-flex-item color-base font-30" type="text" v-model="username" value="" :maxlength="11" placeholder="请输入您的手机号/邮箱"
				 placeholder-class="input-placeholder" />
			</view>
			<view class="input vs-row vs-align-center margin-b40">
				<image class="input-icon margin-r20" src="https://6e69-niew6-1302638010.tcb.qcloud.la/denglu/%E7%99%BB%E5%BD%955/password.png?sign=9f8fdd0ae0a1ae530a9226de8917ebbd&t=1604049354"
				 mode=""></image>
				<input class="vs-flex-item color-base font-30" type="text" v-model="password" password value="" placeholder="请输入您的登录密码"
				 placeholder-class="input-placeholder" />
			</view>
		</view>

		<view class="register margin-b80" v-if="cur">
			<view class="input vs-row vs-align-center margin-b40">
				<image class="input-icon margin-r20" src="https://6e69-niew6-1302638010.tcb.qcloud.la/denglu/%E7%99%BB%E5%BD%955/account.png?sign=599d8600e2d55f39ebd1cbc159a04729&t=1604049340"
				 mode=""></image>
				<input class="vs-flex-item color-base font-30" type="text"  :maxlength="11" placeholder="请输入您的手机号/邮箱"
				 placeholder-class="input-placeholder" />
			</view>
			<view class="input vs-row vs-align-center margin-b40">
				<image class="input-icon margin-r20" src="https://6e69-niew6-1302638010.tcb.qcloud.la/denglu/%E7%99%BB%E5%BD%955/password.png?sign=9f8fdd0ae0a1ae530a9226de8917ebbd&t=1604049354"
				 mode=""></image>
				<input class="vs-flex-item color-base font-30" type="text" password  placeholder="请输入您的登录密码"
				 placeholder-class="input-placeholder" />
			</view>
		</view>

		<view class="button bg-color-base vs-row vs-align-center vs-space-center margin-b20" v-if="cur">
			<text class="color-white font-34">立即{{ '注册' }}</text>
		</view>
		<view class="button bg-color-base vs-row vs-align-center vs-space-center margin-b20" v-else @click="login">
			<text class="color-white font-34">立即{{ '登录' }}</text>
		</view>

		<view class="vs-row vs-align-center vs-space-center margin-b100">
			<text class="color-base font-28">忘记密码？</text>
		</view>

		<view class="other">
			<view class="vs-row vs-align-center margin-b40">
				<view class="separator vs-flex-item"></view>
				<text class="color-black-3 font-28">更多登录方式</text>
				<view class="separator vs-flex-item"></view>
			</view>

			<view class="other-items vs-row vs-align-center vs-space-around">
				<image class="other-icon" src="/static/other/wx.png" mode=""></image>
				<image class="other-icon" src="/static/other/wb.png" mode=""></image>
				<image class="other-icon" src="/static/other/zfb.png" mode=""></image>
			</view>
		</view>
		<!-- 弹框消息 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cur: 0,
				username:'',
				password:'',
				grant_type:'password',
				scope:'write',
				client_id:'admin',
				client_secret:'123',
				auth_type:'username',
				message:''
			}
		},
		methods:{
			login(){
				let data={
					username: this.username,
					password: this.password,
					grant_type: this.grant_type,
					scope: this.scope,
					client_id: this.client_id,
					client_secret: this.client_secret,
					auth_type: this.auth_type
				}
				this.$api.token(data).then(res => {
					console.log(res.data)
					if(res.data.status === 200){
						let Authorization=res.data.token_type+" "+ res.data.access_token;
						console.log(Authorization)
						uni.setStorageSync('Authorization',Authorization);
						uni.setStorageSync('refresh_token',res.data.refresh_token);
						uni.reLaunch({
							url: '../../pages/index/index'
						});
					}else{
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error'
						})
					}

				}).catch(err => {

				});
			}
		}
	}
</script>

<style lang="scss">
	.container {
		position: relative;
	}

	.bg {
		position: relative;
		width: 750rpx;
		height: 400rpx;
	}

	.tab {
		position: absolute;
		top: 250rpx;
		left: 20rpx;
		right: 20rpx;
		height: 150rpx;
		padding: 0 50rpx;
		background-color: #fff;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;

		&-bg {
			position: absolute;
			top: -200rpx;
			right: -50rpx;
			width: 440rpx;
			height: 285rpx;
		}
	}

	.line {
		width: 25rpx;
		height: 7rpx;
	}

	.login,
	.register {
		padding: 0 60rpx;
	}

	.input {
		width: 580rpx;
		height: 90rpx;
		padding: 0 30rpx;
		background-color: rgba(80, 100, 235, 0.1);
		border-radius: 100rpx;

		&-icon {
			width: 30rpx;
			height: 38rpx;
		}

		&-placeholder {
			color: #5064eb;
		}
	}

	.button {
		width: 630rpx;
		height: 90rpx;
		margin-left: 60rpx;
		border-radius: 100rpx;
	}

	.separator {
		height: 2rpx;
		margin: 0 30rpx;
		background-color: #f5f5f5;
	}

	.other {
		&-items {
			padding: 0 200rpx;
		}

		&-icon {
			width: 50rpx;
			height: 50rpx;
		}
	}

	// 下边距
	.margin-b5 {
		margin-bottom: 5rpx;
	}

	.margin-b10 {
		margin-bottom: 10rpx;
	}

	.margin-b15 {
		margin-bottom: 15rpx;
	}

	.margin-b20 {
		margin-bottom: 20rpx;
	}

	.margin-b25 {
		margin-bottom: 25rpx;
	}

	.margin-b30 {
		margin-bottom: 30rpx;
	}

	.margin-b40 {
		margin-bottom: 40rpx;
	}

	.margin-b60 {
		margin-bottom: 60rpx;
	}

	.margin-b80 {
		margin-bottom: 80rpx;
	}

	.margin-b100 {
		margin-bottom: 100rpx;
	}

	// 右边距
	.margin-r5 {
		margin-right: 5rpx;
	}

	.margin-r10 {
		margin-right: 10rpx;
	}

	.margin-r15 {
		margin-right: 15rpx;
	}

	.margin-r20 {
		margin-right: 20rpx;
	}

	.margin-r25 {
		margin-right: 25rpx;
	}

	.margin-r30 {
		margin-right: 30rpx;
	}

	.margin-r40 {
		margin-right: 40rpx;
	}

	.margin-r60 {
		margin-right: 60rpx;
	}

	// 字体大小
	.font-18 {
		font-style: normal;
		font-size: 18rpx;
		font-family: Droid Sans Fallback;
	}

	.font-20 {
		font-style: normal;
		font-size: 20rpx;
		font-family: Droid Sans Fallback;
	}

	.font-22 {
		font-style: normal;
		font-size: 22rpx;
		font-family: Droid Sans Fallback;
	}

	.font-24 {
		font-style: normal;
		font-size: 24rpx;
		font-family: Droid Sans Fallback;
	}

	.font-26 {
		font-style: normal;
		font-size: 26rpx;
		font-family: Droid Sans Fallback;
	}

	.font-28 {
		font-style: normal;
		font-size: 28rpx;
		font-family: Droid Sans Fallback;
	}

	.font-30 {
		font-style: normal;
		font-size: 30rpx;
		font-family: Droid Sans Fallback;
	}

	.font-32 {
		font-style: normal;
		font-size: 32rpx;
		font-family: Droid Sans Fallback;
	}

	.font-34 {
		font-style: normal;
		font-size: 34rpx;
		font-family: Droid Sans Fallback;
	}

	.font-36 {
		font-style: normal;
		font-size: 36rpx;
		font-family: Droid Sans Fallback;
	}

	.font-38 {
		font-style: normal;
		font-size: 38rpx;
		font-family: Droid Sans Fallback;
	}

	.font-40 {
		font-style: normal;
		font-size: 40rpx;
		font-family: Droid Sans Fallback;
	}

	.font-46 {
		font-style: normal;
		font-size: 46rpx;
		font-family: Droid Sans Fallback;
	}

	.font-50 {
		font-style: normal;
		font-size: 50rpx;
		font-family: Droid Sans Fallback;
	}

	.font-60 {
		font-style: normal;
		font-size: 60rpx;
		font-family: Droid Sans Fallback;
	}

	.font-80 {
		font-style: normal;
		font-size: 80rpx;
		font-family: Droid Sans Fallback;
	}

	// 字体对齐
	.text-left {
		text-align: left;
	}

	.text-center {
		text-align: center;
	}

	.text-right {
		text-align: right;
	}

	// color相关
	.color-white {
		color: #FFFFFF;
	}

	.color-red {
		color: #dc0000;
	}

	// 黑色色阶向下
	.color-black {
		color: #000;
	}

	.color-black-3 {
		color: #333;
	}

	.color-black-6 {
		color: #666;
	}

	.color-black-9 {
		color: #999;
	}

	// 字体宽度
	.font-weight-400 {
		font-weight: 400;
	}

	.font-weight-500 {
		font-weight: bold;
	}

	// 间隔
	.spacing-20 {
		width: 750rpx;
		height: 20rpx;
		background-color: #f8f8f8;
	}

	// 圆角
	.radius-10 {
		border-radius: 10rpx;
	}

	.radius-20 {
		border-radius: 20rpx;
	}

	.radius-30 {
		border-radius: 30rpx;
	}

	.radius-circle {
		border-radius: 50%;
	}

	.radius-height {
		border-radius: 10000px;
	}

	// flex相关
	.vs-flex-item {
		flex: 1;
	}

	.vs-space-between {
		justify-content: space-between;
	}

	.vs-space-around {
		justify-content: space-around;
	}

	.vs-space-center {
		justify-content: center;
	}

	.vs-space-end {
		justify-content: flex-end;
	}

	.vs-row {
		flex-direction: row;
	}

	.vs-column {
		flex-direction: column;
	}

	.vs-align-end {
		align-items: flex-end;
	}

	.vs-align-center {
		display: flex;
		align-items: center;
	}

	.vs-align-start {
		align-items: flex-start;
	}

	.vs-item-hover {
		background-color: rgba(0, 0, 0, 0.05);
	}

	.vs-btn-hover {
		opacity: 0.8;
	}

	.color-base {
		color: #5064eb;
	}

	.bg-color-base {
		background-color: #5064eb;
	}
</style>
