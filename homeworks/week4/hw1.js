// 引入 request 模組
const request = require('request');
// 上限為 20
const MAX = '10'
// API 網址 + 上限數量 
const url = 'https://lidemy-book-store.herokuapp.com/books?_limit=' + MAX


request(url, function (error, response, body) {
  // 錯誤時顯示訊息
  if(error) {
    console.log('oops!, some error just happened.')
  }
  let books

  try {
    // 解析為 JavaScript 格式
    books = JSON.parse(body)
  } catch (error) {
    console.log(error)
    return
  }
  // 印出編號 + 書名
  books.forEach(elem => console.log(elem.id, elem.name))
})