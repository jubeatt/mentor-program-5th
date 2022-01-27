/* loading 動畫 */
$.LoadingOverlaySetup({
  background: "rgba(0, 0, 0, 0.6)",
  imageAnimation: false,
  image: 'img/spinner.svg',
  imageColor: '#FFD369',
  size: '13'
});


// API token
const CLIENT_ID = 'lg3ca106lmhdp9t5kx7fyfo7r60d43'
const ACCESS_TOKEN= 'Bearer ow91p5ckfmdxj948g8kcv5quodt5id'
const BASE_URL = 'https://api.twitch.tv/helix'
// DOM 元素
const navList = document.querySelector('.nav__list')
const listItem = document.querySelectorAll('.nav__item')
const streams = document.querySelector('.streams')
const topTitle = document.querySelector('.top__title')



// 第一次進入頁面
init()

// Delegation 切換實況列表
navList.addEventListener('click', function(e) {
  const { target } = e
  // 有 id 的按鈕
  const id = target.getAttribute('data-game-id')
  if (id) {
    $.LoadingOverlay("show")
    /* 取得實況列表 */
    getStreams(id, function(response) {
      console.log(response)
      const { data } = response
      // 清除原本的內容
      removeAllChild(streams)
      // 更新標題文字
      topTitle.innerText = data[0].game_name
      // 重新渲染
      renderStreams(data)
    })
  }
})




function init() {
  $.LoadingOverlay("show")
  /* 取得前五名熱門遊戲資料 */
  getTopFiveGames(function(response) {
    const { data } = response
    // 設定標題文字
    topTitle.innerText = data[0].name
    console.log(data)
    // 設定按鈕資訊
    for(let i=0; i<listItem.length; i++) {
      const button = listItem[i].querySelector('.nav__button')
      // 文字內容
      button.innerText = data[i].name
      // 遊戲 id
      button.setAttribute('data-game-id', data[i].id)
    }
    /* 取得實況列表 */
    getStreams(data[0].id, function(response) {
      const { data } = response
      renderStreams(data)
    })
  })
}


// 渲染實況列表
function renderStreams(streamsList) {
  for (let i=0; i<streamsList.length; i++) {
    // 設定內容
    const content = `
    <div class="card__preview">
      <img src="${setImageSize(streamsList[i].thumbnail_url, 800)}">
    </div>
    <div class="card__info">
      <img class="card__avatar" src="img/logo.png">
      <div class="card__detail">
        <div class="card__title">${streamsList[i].title}</div>
        <div class="card__anchor ">${streamsList[i].user_name}</div>
      </div>
    </div>
    `
    // 新元素
    const card = document.createElement('div')
    // 加上 class
    card.classList.add('card')
    // 插入內容
    card.innerHTML = content
    // 插入父元素
    streams.append(card)
  }
  $.LoadingOverlay("hide")
}


// 取得前五名熱門遊戲
function getTopFiveGames(callback) {
  const request = new XMLHttpRequest()
  request.addEventListener('load', function() {
    if (request.status >= 200 && request.status < 400) {
      callback(JSON.parse(request.responseText))
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
      callback(JSON.parse(request.responseText))
    } else {
      callback('error')
    }
  })
  request.open('GET', `${BASE_URL}/streams?game_id=${id}`, true)
  request.setRequestHeader('Client-ID', CLIENT_ID)
  request.setRequestHeader('Authorization', ACCESS_TOKEN)
  request.send()
}

// 設定圖片尺寸 
function setImageSize(url) {
  const regexp = /\{[a-zA-z]+\}x\{[a-zA-Z]+\}/
  return url.replace(regexp, '640x360')
}

function removeAllChild(node) {
  while(node.firstChild) {
    node.removeChild(node.firstChild)
  }
}


