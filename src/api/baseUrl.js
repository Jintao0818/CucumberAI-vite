let baseUrl = ''
switch (import.meta.env.MODE) {
  case 'development':
    baseUrl = 'http://192.168.1.100:3333' //开发环境
    break
  case 'production':
    baseUrl = 'http://47.100.80.240:9568/' //生产环境
    break
}

export default baseUrl
