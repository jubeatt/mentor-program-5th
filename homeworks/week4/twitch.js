// 載入 dotenv（取得環境變數）
require('dotenv').config()
// 發送 request 的模組
const request = require('request')
// API 網址
const BASE_URL = 'https://api.twitch.tv/helix'
// 一次的上限
const BATCH_LIMIT = 100
// 全部實況的數量
const TOTAL_STREAMS = 200


/* 
  搜尋遊戲
*/
function searchGame(name, callback) {
  if (!name) return console.log('請輸入遊戲名稱') 
  request({
    url: `${BASE_URL}/games?name=${name}`,
    headers: {
      'Authorization': process.env.ACCESS_TOKEN, 
      'Client-ID': process.env.CLIENT_ID,
    }
  }, callback)
}

// 取得部分實況列表
/* 
  21779
  gameID: 遊戲 id
  first: 一次要抓的數量
  after: 上一筆資料的紀錄點 => 輸入上一筆資料的 cursor，來略過告訴伺服器從哪裡開始搜尋資料 
  callback: 拿到回傳結果
*/
function getStreams(gameId, first, after, callback) {
  let url = `${BASE_URL}/streams?game_id=${gameId}&first=${first}`
  // 如果是第二次抓資料，加上 after 參數
  if (after) {
    url += `&after=${after}`
  }
  request({
    url: url,
    headers: {
      'Authorization': process.env.ACCESS_TOKEN, 
      'Client-ID': process.env.CLIENT_ID,
    }
  }, callback)
}

function getAllStreams(gameId, limit, total, callback) {
  let streams = []
  // 用來處理部分實況資料的 handler
  function handlerStream(err, res, body) {
    // 取得時出現錯誤，就把錯誤帶回 callback
    if (err) {
      callback(err)
    }
    // { data: [...], pagination: cursor: 'xxx'}
    const { data, pagination } = JSON.parse(body)
    const cursor = pagination.cursor
    // 成功的話，把資料拚回去
    streams = streams.concat(data)
    // 如果數量不夠，再抓一次
    if (streams.length < total) {
      return getStreams(gameId, limit, cursor, handlerStream)
    }
    // 最後會拿到所有的實況資料
    callback(null, streams.slice(0, total))
  }
  // 第一次抓資料
  getStreams(gameId, limit, null, handlerStream)
}


searchGame(process.argv[2], (err, res, body) => {
  if(err) {
    return console.log(err)
  }
  // 拿到遊戲 id
  const gameId = JSON.parse(body).data[0].id
  // 取得所有實況列表
  getAllStreams(gameId, BATCH_LIMIT, TOTAL_STREAMS, (err, streams) => {
    if (err) {
      return console.log(err)
    }
    for(let stream of streams) {
      console.log('=========================')
      console.log(`實況主名稱：${stream.user_name}`)
      console.log(`實況主 id：${stream.user_id}`)
      console.log(`觀看人數：${stream.viewer_count}`)
    }
  })
})


