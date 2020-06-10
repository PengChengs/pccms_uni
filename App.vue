<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss"; /*此乃uview-ui样式*/
	/*每个页面公共css */
	@import url("static/icon/iconfont.css"); /*此乃底部导航图标样式*/
	
	.page{
		background-color: #f2f2f2; //#f2f2f2
		/* 视图窗口 */
		position: absolute;
		top: 0upx;
		left: 0upx;
		right: 0upx;
		bottom: $navHeight; //$navHeight
		overflow: auto;
	}
	.page::-webkit-scrollbar {
		display: none
	}
	/*苹果x适配 H5APP*/
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		.subject {
			bottom: $navHeight + $navBoxHeight;
			top: $barHeight + $barTopHeight;
		}
	}
	
	/*苹果xs适配 H5APP*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		.subject {
			bottom: $navHeight + $navBoxHeight;
			top: $barHeight + $barTopHeight;
		}
	}
	
	
	/*苹果xr适配 H5APP*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		.subject {
			bottom: $navHeight + $navBoxHeight;
			top: $barHeight + $barTopHeight;
		}
	}
</style>

