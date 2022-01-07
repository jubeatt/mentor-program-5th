// 載入 dotenv（取得環境變數）
require('dotenv').config()
// 發送 request 的模組
const request = require('request')
// 資料數量
const BASE_URL = 'https://api.twitch.tv/helix'

request({
  method: 'GET',
  url: `${BASE_URL}/games/top`,
  // 授權跟驗證 header
  headers: {
    "Authorization": process.env.ACCESS_TOKEN,
    "Client-ID": process.env.CLIENT_ID
  }
}, (error, response, body) => {
  if(error) {
    console.log('oops! 發生了一些錯誤！')
    console.log(error)
    return
  }
  if(response.statusCode >= 200 && response.statusCode < 400) {
    console.log('statusCode:', response.statusCode)
    // 解析資料
    const res = JSON.parse(body)
    // 印出內容
    res.data.forEach((item, index) => {
      console.log(index + 1, item.name)
    })
  } else {
    console.log('請求失敗')
    console.log(JSON.parse(body))
  }
})