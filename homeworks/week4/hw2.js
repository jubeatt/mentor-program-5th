// 發送 request 的模組
const request = require('request');
// 取得指令參數的模組
const { argv } = require('process')
// API 網址
const baseUrl = 'https://lidemy-book-store.herokuapp.com/books/'
// 動作
const action = argv[2]
// 書本 id or 書本名稱
const idOrName = argv[3]
// 修改書本的新名稱
const newName = argv[4]


switch (action) {
  case 'list':
    // 送出請求
    request(baseUrl, function (error, response, body) {
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
    break
  case 'read':
    // 送出請求
    request(baseUrl + idOrName, function (error, response, body) {
      // 錯誤處理
      if(error) {
        console.log('oops!, some error just happened.')
        console.log(error)
      }
      // 檢查狀態碼
      if(response.statusCode>=200 && response.statusCode<400) {
        // 解析為 JavaScript 格式
        const book = JSON.parse(body)
        // 印出編號 + 書名
        console.log(book.id, book.name)
      } else {
        console.log('statusCode: ',response.statusCode)
        console.log('取得失敗')
      }
    })
    break
  case 'delete':
    // 送出 DELETE 請求
    request.delete(baseUrl + idOrName, function (error, response, body) {
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
    break
  case 'create':
    // 送出 POST 請求
    request.post(baseUrl,
      {
        form: {
          name: idOrName
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
    break
  case 'update':
    // 送出 PATCH 請求
    request.patch(baseUrl + idOrName,
      {
        form: {
          name: newName
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
    break
}