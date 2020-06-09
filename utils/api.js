import { http } from '@/utils/service.js' // 局部引入

exports.bookHotList = (data) => {
    return http.get('/api/book/bk/bookHotList',{params: data})
}