/* loading 動畫 */
$.LoadingOverlaySetup({
  background: "rgba(0, 0, 0, 0.6)",
  imageAnimation: false,
  image: 'img/spinner.svg',
  imageColor: '#FFD369',
  size: '50'
});


// API token
const CLIENT_ID = 's44s145uexjgeu9mqqa1s93oc1bnli'
const ACCEPT = 'application/vnd.twitchtv.v5+json'
const BASE_URL = 'https://api.twitch.tv/kraken'
// DOM 元素
const navList = document.querySelector('.nav__list')
const streamsElement = document.querySelector('.streams')
const topTitleElement = document.querySelector('.top__title')
const showMoreButtonElement = document.querySelector('.button__show-more')
const navButtonsElement = document.querySelectorAll('.nav__button')
// API 相關參數
const BATCH_LITMIT = 20
// 分頁指標
let pagination = 1
// 目前的遊戲
let currentGameName = ''

// 切換實況列表
navList.addEventListener('click', (e) => {
  const { target } = e
  if (target.classList.contains('nav__button')) {
    const gameName = target.innerText
    // 重新載入
    reloadStreams(gameName)
    // 更新按鈕樣式
    document.querySelector('.nav__button--current').classList.remove('nav__button--current')
    target.classList.add('nav__button--current')
  }
})

// 顯示更多
showMoreButtonElement.addEventListener('click', async() => {
  try {
    $.LoadingOverlay('show')
    // 搜尋實況列表
    const streams = await getSteams(currentGameName, BATCH_LITMIT, BATCH_LITMIT * pagination)
    // 更新分頁紀錄
    pagination++
    // 把新資料渲染出來
    renderStreams(streams)
    // 最後一頁了
    if (pagination === 45) {
      showMoreButtonElement.innerText = 'No more...'
      showMoreButtonElement.classList.add('button__show-more--disabled')
    }
    $.LoadingOverlay('hide')
  } catch (e) {
    console.log('載入更多實況列表時出錯')
    console.log(e)
  }
})



init()

/*
  1. 先搜尋前五名熱門遊戲
  2. 拿第一熱門的遊戲搜尋實況列表
  3. 把拿到的實況列表渲染出來
*/
async function init() {
  $.LoadingOverlay('show')
  const topFiveGames = await getTopFiveGame()
  // 最熱門的遊戲（第一個）
  currentGameName = topFiveGames.top[0].game.name
  // 設定標題
  topTitleElement.innerText = currentGameName
  // 搜尋實況列表
  const streams = await getSteams(currentGameName, BATCH_LITMIT, 0)
  // 渲染按鈕
  initNavigation(topFiveGames)
  // 渲染實況列表
  renderStreams(streams)
  $.LoadingOverlay('hide')
}

async function reloadStreams(gameName) {
  try {
    $.LoadingOverlay('show')
    // 初始化為第一頁
    pagination = 1
    // 初始化目前的遊戲名稱
    currentGameName = gameName
    // 更新標題
    topTitleElement.innerText = currentGameName
    // 搜尋實況列表
    const streams = await getSteams(gameName, BATCH_LITMIT, 0)
    // 先刪除所有子元素
    removeAllChild(streamsElement)
    // 重新渲染實況列表
    renderStreams(streams)
    // 初始化按鈕樣式與內容
    showMoreButtonElement.innerText = 'Show more'
    showMoreButtonElement.classList.remove('button__show-more--disabled')
    $.LoadingOverlay('hide')
  } catch(e) {
    console.log('切換實況列表時出錯')
    console.log(e)
  }
}

// 初始化導覽列
function initNavigation(games) {
  try {
    const { top } = games
    // 更新導覽列
    for (let i=0; i<navButtonsElement.length; i++) {
      navButtonsElement[i].innerText = top[i].game.name
    }
  } catch (e) {
    console.log('渲染導覽列時出錯')
    console.log(e)
  }
}

// 渲染實況列表
function renderStreams(data) {
  try {
    const template = `
      <div class="card__preview">
        <img src="$preview">
      </div>
      <div class="card__info">
        <img class="card__avatar" src="$avatar">
        <div class="card__detail">
          <div class="card__title">$status</div>
          <div class="card__anchor ">$name</div>
        </div>
      </div>
      <div class="card__viewer">
        <i class="fas fa-eye"></i>
        <span>$viewer</span>
      </div>
    `
    const { streams } = data
    for (let stream of streams) {
      const content =
      template
        .replace('$url', stream.channel.url)
        .replace('$preview', stream.preview.large)
        .replace('$avatar', stream.channel.logo)
        .replace('$status', stream.channel.status)
        .replace('$name', stream.channel.name)
        .replace('$viewer', stream.viewers)
      
      const card = document.createElement('a')
      card.setAttribute('class', 'card')
      card.setAttribute('href', stream.channel.url)
      card.setAttribute('target', '_blank')
      card.innerHTML = content
      streamsElement.appendChild(card)
    }
  } catch (e) {
    console.log('渲染實況列表時出錯')
    console.log(e)
  }
  
}

// 取得前五名熱門遊戲
async function getTopFiveGame() {
  let json = null
  const response = await fetch(`${BASE_URL}/games/top?limit=5`, {
    headers: {
      'Client-ID': CLIENT_ID,
      'Accept': ACCEPT
    }
  })
  json = await response.json()
  return json
}

// 取得遊戲實況
async function getSteams(gameName, limit, offest) {
  let json = null
  const response = await fetch(
    `${BASE_URL}/streams?game=${gameName}&limit=${limit}&offset=${offest}`, 
    {
      headers: {
        'Client-ID': CLIENT_ID,
        'Accept': ACCEPT
      }
    })
  json = await response.json()
  return json
}

// 刪除所有子元素
function removeAllChild(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }
}
