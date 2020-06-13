import { http } from '@/utils/service.js' // 局部引入

exports.bookRecommendList = (data) => { //强力推荐的小说
    return http.get('/api/book/bk/bookRecommendList',{params: data})
}
exports.bookHotList = (data) => { //热门的小说
    return http.get('/api/book/bk/bookHotList',{params: data})
}
exports.randBookList = (data) => { //热门的小说
    return http.get('/api/book/bk/randBookList',{params: data})
}
exports.mainSysMenuList = (data) => { //小说前台菜单列表
    return http.get('/api/book/bk/mainSysMenuList',{params: data})
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