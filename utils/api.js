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
