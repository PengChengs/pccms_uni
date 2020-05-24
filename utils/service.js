import Request from 'luch-request'

const http = new Request()
const getTokenStorage = () => {
	let token = ''
	try{
		token = uni.getStorageSync('token')
	}catch(e){
		//TODO handle the exception
	}
	return token
}
http.setConfig((config) => { /* 设置全局配置 */
  config.baseUrl = this.$baseUrl.baseUrl
  config.header = {
    ...config.header,
    'Content-Type': 'application/x-www-form-urlencoded'  //对于 GET 方法，会将数据转换为 query string。例如 { name: 'name', age: 18 } 转换后的结果是 name=name&age=18。
													//对于 POST 方法且 header['content-type'] 为 application/json 的数据，会进行 JSON 序列化。
													//对于 POST 方法且 header['content-type'] 为 application/x-www-form-urlencoded 的数据，会将数据转换为 query string。
  }
  return config
})

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
  config.header = {
    ...config.header
    // a: 3 // 演示
  }
  /*
  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
  }
  */
  return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
http.validateStatus = (statusCode) => {
  return statusCode === 200
}

http.interceptor.response((response) => { /* 请求之后拦截器 */
  if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
    return Promise.reject(response)
  }
  return response
}, (response) => { // 请求错误做点什么
  return response
})


// const http = new Request()
// http.setConfig((config) => { /* 设置全局配置 */
//   config.baseUrl = 'https://www.fastmock.site/mock/26243bdf9062eeae2848fc67603bda2d/luchrequest' /* 根域名不同 */
//   config.header = {
//     ...config.header,
//     a: 1, // 演示
//     b: 2 // 演示
//   }
//   return config
// })

// /**
//  * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
//  * @param { Number } statusCode - 请求响应体statusCode（只读）
//  * @return { Boolean } 如果为true,则 resolve, 否则 reject
//  */
// // 有默认，非必写
// http.validateStatus = (statusCode) => {
//   return statusCode === 200
// }

// http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
//   config.header = {
//     ...config.header,
//     token: getTokenStorage()
//   }
//   /*
//   if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
//     cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
//   }
//   */
//   return config
// })

// // 必须使用异步函数，注意
// http.interceptor.response(async (response) => { /* 请求之后拦截器 */
//   // if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
//   //   return Promise.reject(response)
//   // }
//   return response
// }, (response) => { // 请求错误做点什么
//   console.log(response);
//   return response
// })

export {
  http
  // test
}
