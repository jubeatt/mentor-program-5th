// 發送 request 的模組
const request = require('request');
// 取得指令參數的模組
const { argv } = require('process')
// API 網址
const API_ENDPOINT = 'https://restcountries.com/v2'
// 搜尋內容
const name =  argv[2]

if(!name) {
  return console.log('請輸入國家名稱')
}

// 發出 reuqest
request(`${API_ENDPOINT}/name/${name}` , (error, response, body) => {
  // 發生錯誤
  if(error) {
    return console.log('oops! some error just happened!')
  }
  try {
    // 取得的資料
    const data = JSON.parse(body)
    // 若回傳資料為 404，代表搜尋失敗 
    if(data.status === 404) {
      console.log(data.status + ' ' + data.message)
      console.log('找不到你搜尋的國家')
      return
    }
    // 搜尋成功，顯示內容
    data.forEach(elem => {
      console.log('國家：', elem.name)
      console.log('首都：', elem.capital)
      console.log('貨幣：', elem.currencies[0].code)
      console.log('國碼：', elem.callingCodes[0], '\n')
    })
  } catch (error) {
    console.log('出錯啦')
    console.log(error)
  }
})
/* 
1. name 國家名稱
2. capital 首都
3. currencies 貨幣名稱
4. callingCodes 電話國碼
*/