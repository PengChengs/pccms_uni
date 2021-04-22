<template>
	<view class="page">
		<view class="home-header">
			<!-- 通知 -->
			<view class="cont">
				<u-notice-bar mode="horizontal" type="primary" :speed="80" :is-circular="true" :more-icon="true" :list="list" @click="notice"></u-notice-bar>
			</view>
			<!-- 搜索框 -->
			<view class="search-page">
				<u-search placeholder="请输入关键字" :show-action="false" :clearabled="true" @focus="toSearch()"></u-search>
			</view>
			<!-- 轮播图 -->
			<view class="wrap">
					<u-swiper mode="round" :interval="3000" :effect3d="false" :title="true" :list="list2" @click="swiperClick"></u-swiper>
			</view>
		</view>


		<view class="integal-mall-menu">
			<view class="col2" @click="toChangePage('book')">
				<view>
					<image style="width: 60rpx; height: 60rpx;" :src="'https://s2.ax1x.com/2020/02/23/3lVgTP.png'"></image>
				</view>
				<view class="ft14">精品小说</view>
			</view>
			<view class="col2 bd-left" @click="toChangePage('video')" >
				<view>
					<image style="width: 60rpx; height: 60rpx;" :src="'https://s2.ax1x.com/2020/02/23/3lVgTP.png'"></image>
				</view>
				<view class="ft14 ftw600 mt6">热门视频</view>
			</view>
			<view class="col2 bd-left" @click="toChangePage('comic')" >
				<view>
					<image style="width: 60rpx; height: 60rpx;" :src="'https://s2.ax1x.com/2020/02/23/3lVgTP.png'"></image>
				</view>
				<view class="ft14 ftw600 mt6">精彩漫画</view>
			</view>
			<view class="col2 bd-left" @click="toChangePage('music')" >
				<view>
					<image style="width: 60rpx; height: 60rpx;" :src="'https://s2.ax1x.com/2020/02/23/3lVgTP.png'"></image>
				</view>
				<view class="ft14 ftw600 mt6">动感音乐</view>
			</view>

		</view>
		<!-- 首页导航 -->
		<!-- <view class="function">
			<view class="select" v-for="(selectDatas,selectKey) in selectData" :key="selectKey">
				<view @click="selectBtn(selectKey)">
					<view class="select-img" :class="{}">
						<image :src="selectDatas.url"></image>
					</view>
					<text>{{selectDatas.text}}</text>
				</view>
			</view>
		</view> -->

		<!-- 推荐 -->
		<view class="hot">
			<u-section title="推荐小说" sub-title="查看更多" @click="toBookList()" :show-line="true" :right="true" :bold="true" :color="color"></u-section>
			<booklist2 :booklist='list3' />
		</view>
		<!-- 热门 -->
		<view class="hot">
			<u-section title="热门小说" sub-title="查看更多" @click="toBookList()" :show-line="true" :right="true" :bold="true" :color="color"></u-section>
			<booklist2 :booklist='list4' />
		</view>

		<!-- 猜你喜欢 -->
		<view class="hot">
			<u-section title="猜你喜欢" sub-title="查看更多" :show-line="true" :right="false" :bold="true" :color="color"></u-section>
			<booklist :booklist='list5' />
		</view>
		<u-divider bg-color="#f2f2f2" color="#a1a3a6" margin-top="20" margin-bottom="40" half-width="200">我也是有底线的</u-divider>
	</view>
</template>

<script>
	import booklist from '@/components/booklist/booklist.vue'
	import booklist2 from '@/components/booklist2/booklist2.vue'
	import api from '@/utils/api.js'
	export default {
		components:{
			booklist,
			booklist2
		},
		data() {
			return {
				list: [
						'寒雨连江夜入吴',
						'平明送客楚山孤',
						'洛阳亲友如相问',
						'一片冰心在玉壶'
					],
				list2: [{
							image: 'https://s1.ax1x.com/2020/04/24/JD9GJH.jpg',
							title: '蒹葭苍苍，白露为霜。所谓伊人，在水一方',
							url: 'https://cms'
						},{
							image: 'https://s1.ax1x.com/2020/04/24/JD9GJH.jpg',
							title: '蒹葭苍苍，白露为霜。所谓伊人，在水一方',
							url: 'https://cms'
						},
						{
							image: 'https://s1.ax1x.com/2020/04/24/JD9GJH.jpg',
							title: '蒹葭苍苍，白露为霜。所谓伊人，在水一方',
							url: 'https://cms'
						}
					],
					selectData: [{
							url: "https://s2.ax1x.com/2020/02/23/3lVgTP.png",
							text: "榜单"
						},
						{
							url: "https://s2.ax1x.com/2020/02/23/3lVRFf.png",
							text: "完结"
						},
						{
							url: "https://s2.ax1x.com/2020/02/23/3lVcwt.png",
							text: "新书"
						},
						{
							url: "https://s2.ax1x.com/2020/02/23/3lV6eI.png",
							text: "精选"
						},
						{
							url: "https://s2.ax1x.com/2020/02/23/3lVsOA.png",
							text: "免费"
						},
					],
					color: this.$u.color['tipsColor'],
					list3:[],
					list4:[],
					list5:[]

			}
		},
		//页面生命周期
		onReady(){
			console.log("home 显示 onReady")
		},onLoad(){
			console.log("home 显示 onLoad")
		},onShow(){
			console.log("home 显示 onShow")
		},onHide(){
			console.log("home 显示 onHide")
		},onUnload(){
			console.log("home 显示 onUnload")
		},
		//组件生命周期
		created(){
			console.log("home 显示 created")
			uni.showLoading({ //开启加载框
			    title: '加载中'
			});
			this.bookRecommendList();
			this.bookHotList();
			this.randBookList();

			console.log('屏幕高度：'+uni.getSystemInfoSync().screenHeight)
		},mounted(){
			console.log("home 显示 mounted")

		},
		methods: {
			toSearch() { //跳转搜索页
				console.log("fasdfadfadfadsfadfasdfsdfsdfdfsfsaf");
				uni.navigateTo({
					url: '../../pages/search/search'
				});
			},
			notice(){ //通知栏点击事件
				console.log(this.data.list2)
			},
			swiperClick(index){ //
				console.log(index)
				console.log(this.list2[index])
				console.log(this.list2[index].url)
			},
			toChangePage(type){ //选项跳转
				if(type=='book'){
					uni.navigateTo({
						url: '../../pages/book/book'
					});
				}else if (type=='video'){

				}else if(type=='comic'){

				}else if(type=='music'){

				}
			},
			selectBtn(selectKey) { // 首页导航按钮
				console.log('你点了第' + selectKey + '个选项')
			},toBookList(){ //查看更多
				uni.navigateTo({
					url:'../book/book'
				});
			},
			bookRecommendList(){ //推荐小说
				let that=this
				let data={
					pageSize:6
				}
				api.bookRecommendList(data).then(res => {
					console.log(res.data.data)
					that.list3=res.data.data
				}).catch(err => {

				});
			},bookHotList(){ //热门小说
				let that=this
				that.status='loading'
				let data={
					pageSize:6
				}
				api.bookHotList(data).then(res => {
					console.log(res.data.data)
					that.list4=res.data.data
					that.status='nomore'
				}).catch(err => {

				});
			},randBookList(){ //猜你喜欢
				let that=this
				let data={
					pageSize:10
				}
				api.randBookList(data).then(res => {
					console.log(res.data.data)
					that.list5=that.list5.concat(res.data.data)
					uni.hideLoading(); //隐藏加载框
				}).catch(err => {

				});

			}
		}
	}
</script>

<style lang="scss" scoped>

.home-header{
	display: block;
	height: 320upx;
	width: 100%;
	margin-bottom: 200upx;
	-webkit-border-radius: 0px 0px 26px 26px;
	border-radius: 0px 0px 26px 26px;
	background: #0086E7;

}

.cont{
	/*padding: 20upx 40upx 0upx 40upx;*/
	/* width: 100vw; */
	/* height: 100vh; */
	/* display: flex; */
	/* justify-content: center;
	align-items: center; */
}
.search-page{
	padding: 11px 22px 0px 22px;
}
.wrap {
	padding: 20upx 40upx 20upx 40upx;
}

.function {
	padding: 20upx 0 36upx 0;
	display: flex;
}

.integal-mall-menu{
		width: 90%;
		margin-left: 5%;
		margin-bottom: 20px;
		height: 176rpx;
		background: #FFFFFF;
		border-radius: 48rpx;

		display: flex;
		padding-bottom: 17px;
		padding-top: 17px;
	}
	.col2{
		width: 50%;
		text-align: center;
	}
	.bd-left{
		border-left: 1px solid rgba(230, 230, 230, 0.8);
	}
	.ft14{
		font-size: 15px;
		font-weight: 600;
		margin-top: 6px;
	}

.select {
	flex: 1;
	width: 100%;
	text-align: center;
}

.select-img {
	padding: 0 0 4upx 0;
}

.select-img image {
	height: 66upx;
	width: 66upx;
}

.select text {
	font-size: 26upx;
	line-height: 26upx;
}
.hot{
	padding: 0upx 40upx 20upx 40upx;
	// border: 1px solid red;
}
</style>
