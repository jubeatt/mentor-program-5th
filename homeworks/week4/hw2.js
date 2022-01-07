// 發送 request 的模組
const request = require('request');
// 取得指令參數的模組
const { argv } = require('process')
// API 網址
const API_ENDPOINT = 'https://lidemy-book-store.herokuapp.com'
// 動作
const action = argv[2]
// 書本 id or 書本名稱
const params = argv[3]


switch (action) {
  case 'list':
    listBooks()
    break
  case 'read':
    readBook(params)
    break
  case 'delete':
    deleteBook(params)
    break
  case 'create':
    createBook(params)
    break
  case 'update':
    updateBook(params, argv[4])
    break
  default:
    console.log('Available command: list, read, delete, create and update')
}
function listBooks() {
  request(`${API_ENDPOINT}/books`, function (error, response, body) {
    // 錯誤處理
    if(error) {
      console.log('oops!, some error just happened.')
      console.log(error)
    }
    // 檢查狀態碼
    if(response.statusCode>=200 && response.statusCode<400) {
      // 解析為 JavaScript 格式
      const books = JSON.parse(body)
      // 印出編號 + 書名
      books.forEach(elem => console.log(elem.id, elem.name))
    } else {
      console.log('statusCode: ',response.statusCode)
      console.log('取得失敗')
    }
  })
}
function readBook(id) {
  request(`${API_ENDPOINT}/books/${id}`, function (error, response, body) {
    // 錯誤處理
    if(error) {
      console.log('oops!, some error just happened.')
      console.log(error)
    }
    // 檢查狀態碼
    if(response.statusCode>=200 && response.statusCode<400) {
      // 解析為 JavaScript 格式
      const {id, name} = JSON.parse(body)
      // 印出編號 + 書名
      console.log(id, name)
    } else {
      console.log('statusCode: ',response.statusCode)
      console.log('取得失敗')
    }
  })
}
function deleteBook(id) {
  request.delete(`${API_ENDPOINT}/books/${id}`, function (error, response, body) {
    // 錯誤處理
    if(error) {
      console.log('oops!, some error just happened.')
      console.log(error)
    }
    // 檢查狀態碼
    if(response.statusCode>=200 && response.statusCode<400) {
      // 成功訊息
      console.log('刪除成功')
      // 狀態碼
      console.log('statusCode:', response.statusCode)
      // 回傳內容
      console.log('body:', body)
    } else {
      console.log('statusCode: ',response.statusCode)
      console.log('刪除失敗')
    }
  })
}
function createBook(name) {
  request.post({
    url: `${API_ENDPOINT}/books`,
    form: {
      name: name
    }
  },
  function (error, response, body) {
    // 錯誤處理
    if(error) {
      console.log('oops!, some error just happened.')
      console.log(error)
    }
    // 檢查狀態碼
    if(response.statusCode>=200 && response.statusCode<400) {
      // 成功訊息
      console.log('新增成功！')
      // 顯示狀態碼
      console.log('statusCode:' ,response.statusCode)
      // 印出回傳訊息
      console.log('body:', body)
    } else {
      console.log('statusCode: ',response.statusCode)
      console.log('刪除失敗')
    }
  })
}
function updateBook(id, name) {
  // 送出 PATCH 請求
  request.patch({
    url: `${API_ENDPOINT}/books/${id}`,
    form: {
      name: name
    }
  },
  function (error, response, body) {
    // 錯誤處理
    if(error) {
      console.log('oops!, some error just happened.')
      console.log(error)
    }
    // 檢查狀態碼
    if(response.statusCode>=200 && response.statusCode<400) {
      // 成功訊息
      console.log('修改成功！')
      // 顯示狀態碼
      console.log('statusCode:' ,response.statusCode)
      // 印出回傳訊息
      console.log('body:', body)
    } else {
      console.log('statusCode: ',response.statusCode)
      console.log('刪除失敗')
    }
  })
}