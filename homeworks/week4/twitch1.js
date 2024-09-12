/* 
  陽春版，可以取得 100 筆「最受歡迎的實況列表」
*/

// 載入 dotenv（取得環境變數）
require('dotenv').config()
// 發送 request 的模組
const request = require('request')
// API 網址
const BASE_URL = 'https://api.twitch.tv/helix'


// 取得遊戲 id 的 request
function searchGame(name, callback) {
  // 沒輸入遊戲名稱
  if (!name) {
    return console.log('請輸入遊戲名稱')
  }
  request({
    url: `${BASE_URL}/games?name=${name}`,
    headers: {
      'Authorization': process.env.ACCESS_TOKEN,
      'Client-ID': process.env.CLIENT_ID
    }
  }, callback)
}
// 拿到遊戲 id 的 callback
function handlerGameId(err, res, body) {
  // 錯誤處理
  if (err) {
    return console.log(err)
  }
  // 拿到遊戲 id 後
  const gameId = JSON.parse(body).data[0].id
  // 再發 request 取得實況列表
  getStreams(gameId, handlerStreams)
}

// 取得實況列表的 request
function getStreams(gameId, callback) {
  // 沒輸入遊戲 id
  if (!gameId){ 
    return console.log('請輸入遊戲 id')
  }
  request({
    // 一次抓 100 筆
    url: `${BASE_URL}/streams?first=100&gamd_id=${gameId}`,
    headers: {
      'Authorization': process.env.ACCESS_TOKEN,
      'Client-ID': process.env.CLIENT_ID
    }
  }, callback)
}
// 拿到實況列表的 callback
function handlerStreams(err, res, body) {
  // 錯誤處理
  if (err) {
    return console.log(err)
  }
  // 取出實況資料
  const streams = JSON.parse(body).data 
  // 印出實況主名稱、id
  for(let stream of streams) {
    console.log('==============')
    console.log(`實況主名稱：${stream.user_name}`)
    console.log(`實況主 id：${stream.user_id}`)
    console.log(`觀看人數：${stream.viewer_count}`)
  }
}

/*
  node twitch1.js 'League of Legends'
  執行流程：
  1. 送出請求，取得遊戲 id => searchGame
  2. 拿到遊戲 id  => handlerGameId (callback)
  3. 利用遊戲 id 送出請求，取得實況列表 => getStreams
  4. 拿到實況列表，並印出實況主名稱、id => handlerStreams (callback)
*/
searchGame(process.argv[2], handlerGameId)
