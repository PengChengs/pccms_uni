import { http } from '@/utils/service.js' // 局部引入

exports.bookRecommendList = (data) => { //强力推荐的小说
    return http.get('/api/book/bk/bookRecommendList',{params: data})
}
exports.bookHotList = (data) => { //热门的小说
    return http.get('/api/book/bk/bookHotList',{params: data})
}