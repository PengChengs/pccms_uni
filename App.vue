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
</style>

