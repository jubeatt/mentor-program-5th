/* loading 動畫 */
$.LoadingOverlaySetup({
  background: "rgba(0, 0, 0, 0.6)",
  imageAnimation: false,
  image: 'img/spinner.svg',
  imageColor: '#FFD369',
  size: '50'
});


// API token
const CLIENT_ID = 'lg3ca106lmhdp9t5kx7fyfo7r60d43'
const ACCESS_TOKEN= 'Bearer ow91p5ckfmdxj948g8kcv5quodt5id'
const BASE_URL = 'https://api.twitch.tv/helix'
// DOM 元素
const navList = document.querySelector('.nav__list')
const listItemElement = document.querySelectorAll('.nav__item')
const streamsElement = document.querySelector('.streams')
const topTitleElement = document.querySelector('.top__title')





// Delegation 切換實況列表
navList.addEventListener('click', function(e) {
  const { target } = e
  // 有 id 的按鈕
  const id = target.getAttribute('data-game-id')
  if (id) {
    // 開啟 loading 畫面
    $.LoadingOverlay("show")
    /* 取得實況列表 */
    getStreams(id, function(err, response) {
      const usersId = []
      const json = JSON.parse(response)
      const streams = json.data
      // 更新標題文字
      topTitleElement.innerText = streams[0].game_name
      // 取出所有實況主 id 
      for (let stream of streams) {
        usersId.push(stream.user_id)
      }
      /* 取得實況主資訊 */
      getUser(usersId, function(err, response) {
        const json = JSON.parse(response)
        const users = json.data
        // 清除原本的內容
        removeAllChild(streamsElement)
        // 渲染實況列表
        renderStreams(streams, users)
      })
    })
  }
})


// 第一次進入頁面
init()


function init() {
  // 開啟 loading 畫面
  $.LoadingOverlay("show")
  /* 取得前五名熱門遊戲資料 */
  getTopFiveGames(function(err, response) {
    const json = JSON.parse(response)
    const games = json.data
    // 設定標題文字
    topTitleElement.innerText = games[0].name
    // 設定按鈕資訊
    for(let i=0; i<listItemElement.length; i++) {
      const button = listItemElement[i].querySelector('.nav__button')
      // 文字內容
      button.innerText = games[i].name
      // 遊戲 id
      button.setAttribute('data-game-id', games[i].id)
    }
    /* 取得實況列表 */
    getStreams(games[0].id, function(err, response) {
      // 儲存實況主 id
      const usersId = []
      const json = JSON.parse(response)
      const streams = json.data
      console.log('streams', streams)
      // 取出所有實況主 id
      for (let stream of streams) {
        usersId.push(stream.user_id)
      }
      console.log('userID:', usersId)
      /* 取得實況主資訊 */
      getUser(usersId, function(err, response) {
        const json = JSON.parse(response)
        const users = json.data
        console.log('response users', users)
        // 渲染實況列表
        renderStreams(streams, users)
      })
    })
  })
}


// 渲染實況列表
function renderStreams(streams, users) {
  for (let i=0; i<streams.length; i++) {
    // 設定內容
    const content = `
    <div class="card__preview">
      <img src="${setImageSize(streams[i].thumbnail_url, 800)}">
    </div>
    <div class="card__info">
      <img class="card__avatar" src="${users[i].profile_image_url}">
      <div class="card__detail">
        <div class="card__title">${streams[i].title}</div>
        <div class="card__anchor ">${streams[i].user_name}</div>
      </div>
      <div>
      </div>
    </div>
    `
    // 新元素
    const card = document.createElement('a')
    // 加上 class
    card.classList.add('card')
    // 設定連結
    card.setAttribute('href', `https://www.twitch.tv/${streams[i].user_login}`)
    card.setAttribute('target', '_blank')
    // 插入內容
    card.innerHTML = content
    // 插入父元素
    streamsElement.append(card)
  }
  // 關閉 loading 畫面
  $.LoadingOverlay("hide")
}


// 取得前五名熱門遊戲
function getTopFiveGames(callback) {
  const request = new XMLHttpRequest()
  request.addEventListener('load', function() {
    if (request.status >= 200 && request.status < 400) {
      callback(null, request.responseText)
    } else {
      callback('error')
    }
  })
  request.open('GET', `${BASE_URL}/games/top?first=5`, true)
  request.setRequestHeader('Client-ID', CLIENT_ID)
  request.setRequestHeader('Authorization', ACCESS_TOKEN)
  request.send()
}



// 用遊戲 id 搜尋實況列表
function getStreams(id, callback) {
  const request = new XMLHttpRequest()
  request.addEventListener('load', function() {
    if (request.status >= 200 && request.status < 400) {
      callback(null, request.responseText)
    } else {
      callback('error')
    }
  })
  request.open('GET', `${BASE_URL}/streams?game_id=${id}`, true)
  request.setRequestHeader('Client-ID', CLIENT_ID)
  request.setRequestHeader('Authorization', ACCESS_TOKEN)
  request.send()
}


// 取得實況主資料
function getUser(id, callback) {
  let queryString = id.join('&id=')
  console.log('queryString', queryString)
  const request = new XMLHttpRequest()
  request.addEventListener('load', function() {
    callback(null, request.responseText)
  })
  request.open('GET', `${BASE_URL}/users?id=${queryString}`, true)
  request.setRequestHeader('Client-ID', CLIENT_ID)
  request.setRequestHeader('Authorization', ACCESS_TOKEN)
  request.send()
}







// 設定圖片尺寸 
function setImageSize(url) {
  const regexp = /\{[a-zA-z]+\}x\{[a-zA-Z]+\}/
  return url.replace(regexp, '640x360')
}
// 移除所有子節點
function removeAllChild(node) {
  while(node.firstChild) {
    node.removeChild(node.firstChild)
  }
}


