import { http } from '@/utils/service.js' // 局部引入

//------------------------------------------------------------系统模块 start----------------------------------------------------------------------//

exports.token = (data) => { //登录
    return http.post('/api/auth/oauth/token',data)
}
exports.logout = (data) => { //退出登录
    return http.get('/api/auth/user/logout',{params: data})
}
exports.getUserInfo = (data) => { //查看个人信息
    return http.get('/api/auth/user/getUserInfo',{params: data})
}

exports.mainSysMenuList = (data) => { //前台菜单列表 菜单类型（1.菜单 2.按钮 3.小说 4.视频 5.漫画）这里主要用在 3 4 5
    return http.get('/api/auth/sysMenu/mainSysMenuList',{params: data})
}

//------------------------------------------------------------系统模块 end----------------------------------------------------------------------//
//------------------------------------------------------------小说模块 start----------------------------------------------------------------------//

exports.bookRecommendList = (data) => { //强力推荐的小说
    return http.get('/api/book/bk/bookRecommendList',{params: data})
}
exports.bookHotList = (data) => { //热门的小说
    return http.get('/api/book/bk/bookHotList',{params: data})
}
exports.randBookList = (data) => { //热门的小说
    return http.get('/api/book/bk/randBookList',{params: data})
}
exports.selectSysBook = (data) => { //搜索小说名或作者
    return http.get('/api/book/bk/selectSysBook',{params: data})
}
exports.sysBookType = (data) => { //小说类型最近更新列表，全部,用在分类小说上
    return http.get('/api/book/bk/sysBookType',{params: data})
}
exports.sysBook = (data) => { //查询书籍详情
    return http.get('/api/book/bk/sysBook',{params: data})
}
exports.sysBookChapterList = (data) => { //根据书籍id查询章节
    return http.get('/api/book/chapter/sysBookChapterList',{params: data})
}
exports.sysBookChapter = (data) => { //根据章节获取章节内容
    return http.get('/api/book/chapter/sysBookChapter',{params: data})
}
exports.downSysBookChapter = (data) => { //查看上一章
    return http.get('/api/book/chapter/downSysBookChapter',{params: data})
}
exports.nextSysBookChapter = (data) => { //查看下一章
    return http.get('/api/book/chapter/nextSysBookChapter',{params: data})
}
//------------------------------------------------------------小说模块 end----------------------------------------------------------------------//
