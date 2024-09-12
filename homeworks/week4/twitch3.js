/* 
  困難版（優化），可以自行設定要取得幾筆「最受歡迎的實況列表」
*/
// 載入 dotenv（取得環境變數）
require('dotenv').config()
// 發送 request 的模組
const request = require('request')
// API 網址
const BASE_URL = 'https://api.twitch.tv/helix'
// 一次要抓的數量
const BATCH_LIMIT = 50
// 全部要抓的數量
const TOTAL = 200

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
  const gameId = JSON.parse(body).data[0].id
  // 取得所有實況列表，拿到後印出資料
  getAllStreams(gameId, BATCH_LIMIT, TOTAL, handlerAllStream)
}


/*
  取得所有實況列表
  gameId: 遊戲 id
  limit: 一次抓幾筆資料
  total: 總共有幾筆資料
  callback: 成功的話會拿到所有實況列表的資料

  備註：
  這個 function 的用意其實是把 getStreams 跟 handlerStreams 給包裝起來，
  這樣就可以把需要用到的變數都綁在裡面，例如 gameId、allStreams，
  就不用再宣告成全域變數了
*/
function getAllStreams(gameId, limit, total, callback) {
  // 儲存所有實況列表資料
  let allStreams = []
  // 拿到部分實況資料的 callback，會重複使用所以才寫成命名函式
  function handlerStreams(err, res, body) {
    // 錯誤處理
    if (err) {
      return callback(err)
    }
    // 取出實況資料
    const streams = JSON.parse(body).data
    // 取得記錄點位置（分頁）
    const cursor = JSON.parse(body).pagination.cursor
    // 把資料拼起來
    allStreams = allStreams.concat(streams)
    // 還沒抓夠，在發一次請求，這次加上 cursor
    if (allStreams.length < total) {
      // 遞迴 handlerStreams，直到數量抓夠為止
      return getStreams(gameId, cursor, limit, handlerStreams)
    }
    // 夠了的話，切割成正確的數量在回傳，不然可能會有超過的問題
    // 第一個參數是代表 error，後面才是真正要傳回去的資料
    return callback(null, allStreams.slice(0, total))
  }
  // 抓第一次資料
  // 這個還沒有記憶點所以 cursor 傳入 null
  getStreams(gameId, null, limit, handlerStreams)
}

// 拿到所有實況列表後的 callback
function handlerAllStream(err, streams) {
  // 錯誤處理
  if (err) {
    return console.log(err)
  }
  // 印出實況資訊
  for (let stream of streams) {
    console.log('==============')
    console.log(`實況主名稱：${stream.user_name}`)
    console.log(`實況主 id：${stream.user_id}`)
    console.log(`觀看人數：${stream.viewer_count}`)
  }
}


// 取得部分實況列表的 request
function getStreams(gameId, cursor, limit, callback) {
  // 預設的 url
  let url = `${BASE_URL}/streams?first=${limit}&gamd_id=${gameId}`
  // 沒輸入遊戲 id
  if (!gameId){ 
    return console.log('請輸入遊戲 id')
  }
  // 如果有傳入記憶點，url 加上 after 參數 
  if (cursor) {
    url += `&after=${cursor}`
  }
  request({
    url: url,
    headers: {
      'Authorization': process.env.ACCESS_TOKEN,
      'Client-ID': process.env.CLIENT_ID
    }
  }, callback)
}



/*
  執行流程：
  1. 發出請求，取得遊戲 id => searchGame
  2. 拿到遊戲 id 後 => handlerGameId (callback)
  3. 利用遊戲 id 發出請求，取得所有的實況列表 => getAllStreams
  4. 拿到所有實況列表後，印出實況資訊 => handlerAllStreams (callback)
*/
searchGame(process.argv[2], handlerGameId)