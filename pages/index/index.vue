<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view class="cu-load load-modal" v-if="loadModal">
			<!-- <view class="cuIcon-emojifill text-orange"></view> -->
			<image src="/static/logo.png" mode="aspectFit"></image>
			<view class="gray-text">登录中...</view>
		</view>
	</view>
	
</template>

<script>
	// import {http} from '@/utils/luch-request/index.js'
	export default {
		data() {
			return {
				title: 'Hello',
				loadModal: false
			}
		},
		onLoad() {
			this.Login();
		},
		methods: {
			Login: function(e){
				this.loadModal = true;
				console.log(this.$http);
				this.$http.post('/api/auth/oauth/token', {username: '15972736805', 
				password: '123456a',
				grant_type: 'password',
				scope: 'all',
				client_id: 'admin',
				client_secret: '123456',
				auth_type: 'username'}).then(res => {
					if(res.statusCode === 200 && res.data.status === 200){
						let OauthToken=res.data.token_type+" "+res.data.access_token;
						// this.loadModal = false;
						setTimeout(() => {
							this.loadModal = false;
						}, 2000)
					}else{
						
					}
					console.log(res)
					console.log(res.data)
					console.log(res.data.token_type)
					console.log(res.data.access_token)
					console.log(res.data.token_type+" "+res.data.access_token)
					// uni.setStorageSync('OauthToken', 'hello');
				}).catch(err => {
				
				})
				// 局部修改配置，局部配置优先级高于全局配置
				// http.post('/api/company/oauth/token',{}, {
				// params: {username: '15972736805', 
				// password: '123456a',
				// grant_type: 'password',
				// scope: 'all',
				// client_id: 'admin',
				// client_secret: '123456',
				// auth_type: 'username'}, /* 会加在url上 */
				//     header: {}, /* 会覆盖全局header */
				//     dataType: 'json',
				//     // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
				//     custom: {auth: true}, // 可以加一些自定义参数，在拦截器等地方使用。比如这里我加了一个auth，可在拦截器里拿到，如果true就传token
				//     // #ifndef MP-ALIPAY || APP-PLUS
				//     responseType: 'text',
				//     // #endif
				//     // #ifdef MP-ALIPAY
				//     timeout: 30000, // 仅支付宝小程序支持
				//     // #endif
				//     // #ifdef APP-PLUS
				//     sslVerify: true // 验证 ssl 证书 仅5+App安卓端支持（HBuilderX 2.3.3+）
				//     // #endif
				// }).then(res => {
				
				// }).catch(err => {
				
				// })
				// http.get('/api/company/oauth/token', {params: {username: '15972736805', 
				// password: '123456a',
				// grant_type: 'password',
				// scope: 'all',
				// client_id: 'admin',
				// client_secret: '123456',
				// auth_type: 'username'}}).then(res => {
				// 	console.log(res)
				// 	console.log(res.data)
				// }).catch(err => {
					
				// })
				// 局部修改配置，局部配置优先级高于全局配置
				// http.get('/api/company/oauth/token', {
				//     params: {username: '15972736805', 
				// password: '123456a',
				// grant_type: 'password',
				// scope: 'all',
				// client_id: 'admin',
				// client_secret: '123456',
				// auth_type: 'username'
				// }, 
				// /* 会加在url上 */
				//     header: {}, /* 会覆盖全局header */
				//     dataType: 'json',
				//     // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
				//     custom: {auth: true}, // 可以加一些自定义参数，在拦截器等地方使用。比如这里我加了一个auth，可在拦截器里拿到，如果true就传token
				//     // #ifndef MP-ALIPAY || APP-PLUS
				//     responseType: 'text',
				//     // #endif
				//     // #ifdef MP-ALIPAY
				//     timeout: 30000, // 仅支付宝小程序支持
				//     // #endif
				//     // #ifdef APP-PLUS
				//     sslVerify: true // 验证 ssl 证书 仅5+App安卓端支持（HBuilderX 2.3.3+）
				//     // #endif
				// }).then(res => {
				// 	console.log(res)
				// }).catch(err => {
				
				// })
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
