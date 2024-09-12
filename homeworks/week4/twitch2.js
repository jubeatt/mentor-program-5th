/* 
  困難版，可以取得 200 筆「最受歡迎的實況列表」
*/

// 載入 dotenv（取得環境變數）
require('dotenv').config()
// 發送 request 的模組
const request = require('request')
// API 網址
const BASE_URL = 'https://api.twitch.tv/helix'
// 儲存遊戲 id 
let gameId = null
// 儲存所有實況列表資料
let allStreams = []

// 取得遊戲 id 的 request
function searchGame(name, callback) {
  // 沒輸入遊戲名稱
  if (!name) return console.log('請輸入遊戲名稱')
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
  // 拿到遊戲 id 後，把 id 儲存起來。
  gameId = JSON.parse(body).data[0].id
  // 接著發 request 取得第一筆實況列表
  getFirstStreams(gameId, handlerFirstStreams)
}

// 取得第一筆實況列表的 request
function getFirstStreams(gameId, callback) {
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
// 拿到第一筆實況列表的 callback
function handlerFirstStreams(err, res, body) {
  // 錯誤處理
  if (err) {
    return console.log(err)
  }
  // 取出實況資料
  const streams = JSON.parse(body).data
  // 取得記錄點位置（分頁）
  const cursor = JSON.parse(body).pagination.cursor
  // 把資料拼起來
  allStreams = allStreams.concat(streams)
  // 再發一次請求，取得第二筆實況列表
  getSecondStreams(gameId, cursor, handlerSecondStreams)
}
// 取得第二筆實況列表的 request
function getSecondStreams(gameId, cursor, callback) {
  // 沒有輸入 id 或 記錄點
  if (!gameId || !cursor) return console.log('請輸入 id 及 記錄點')
  request({
    url: `${BASE_URL}/streams?after=${cursor}&first=100&gamd_id=${gameId}`,
    headers: {
      'Authorization': process.env.ACCESS_TOKEN,
      'Client-ID': process.env.CLIENT_ID
    }
  }, callback)
}
// 取得第二筆實況列表的 callback
function handlerSecondStreams(err, res, body) {
  // 錯誤處理
  if (err) {
    return console.log(err)
  }
  // 取出實況資料
  const streams = JSON.parse(body).data
  // 把資料拼起來（這時候就有 200 筆資料了）
  allStreams = allStreams.concat(streams)
  // 印出實況主名稱、id 和觀看人數
  for(let stream of allStreams) {
    console.log('=============')
    console.log(`實況主：${stream.user_name}`)
    console.log(`id：${stream.user_id}`)
    console.log(`觀看人數：${stream.viewer_count}`)
  }
}



/*
  執行流程：
  1. 發出請求，取得遊戲 id => searchGame
  2. 拿到遊戲 id 後 => handlerGameId (callback)
  3. 利用遊戲 id 發出請求，取得第一筆實況列表 => getFirstStreams
  4. 拿到第一筆實況列表，把資料跟記憶點儲存起來 => handlerFirstStreams (callback)
  5. 發出請求，取得第二筆實況列表 => getSecondStreams
  6. 拿到第二筆實況列表，把資料儲存起來，最後印出內容 => handlerSecondStreams (callback)
*/
searchGame(process.argv[2], handlerGameId)