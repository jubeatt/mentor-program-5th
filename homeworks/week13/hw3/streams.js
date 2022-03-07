//  loading 效果
$.LoadingOverlaySetup({
  background: "rgba(0, 0, 0, 0.6)",
  imageAnimation: false,
  image: 'img/spinner.svg',
  imageColor: '#FFD369',
  size: '50'
});

const LIMIT = 20;
const CLIENT_ID = 'lg3ca106lmhdp9t5kx7fyfo7r60d43';
const ACCESS_TOKEN = 'Bearer f3a6vll2o851l8qy0eva5m5z1jzhmj';
const API_ENDPOINT = 'https://api.twitch.tv/helix';
const REQUEST_OPTIONS = {
  headers: {
    'Client-Id': CLIENT_ID,
    'Authorization': ACCESS_TOKEN
  }
}
const streamList = document.querySelector('.streams');
const navList = document.querySelector('.nav__list');
const detector = document.querySelector('.detector');
let gameId = null;
let cursor = null;
let isProcessing = false;
let isLastPage = false;

// 切換實況列表
navList.addEventListener('click', async (e) => {
  // 點到按鈕才執行下面
  if ( !e.target.classList.contains('nav__button') ) return
  $.LoadingOverlay('show');
  // 初始化
  if (isLastPage) {
    document.querySelector('.no-more-hint').remove();
    isLastPage = false;
  }
  // 滑到最上面
  window.scrollTo(0, 0);
  // 更新按鈕狀態
  updataButtonState(e);
  // 取得 gameId
  gameId = e.target.getAttribute('data-game-id');
  // 取得遊戲名稱
  const gameTitle = e.target.innerText;
  // 抓實況資料
  const streams = await getStreams(gameId, LIMIT);
  // 更新標題
  updateTopic(gameTitle);
  // 清空內容
  removeAllChild(streamList);
  // 重新渲染實況列表
  renderStreams(streams);
  $.LoadingOverlay('hide');
})

// 取得熱門遊戲
const getTopGames = async (limit=5) => {
  const url = `${API_ENDPOINT}/games/top?first=${limit}`;
  const response = await fetch(url, REQUEST_OPTIONS);
  const json = await response.json();
  return json
}
// 取得實況列表
const getStreams = async (gameId, limit=20, cursor=null) => {
  let url = `${API_ENDPOINT}/streams?game_id=${gameId}&first=${limit}`;
  if (cursor) {
    url+= `&after=${cursor}`
  }
  const response = await fetch(url, REQUEST_OPTIONS);
  const json = await response.json();
  return json
}

// 重新設定圖片 url
const resetImageUrl = (url, width=640, height=360) => {
  return url.replace('{width}', width).replace('{height}', height)
}
// 更新標題文字
const updateTopic = gameName => {
  document.querySelector('.top__title').innerText = gameName;
}
// 更新按鈕狀態
const updataButtonState = e => {
  document
    .querySelector('.nav__button--current')
    .classList
    .remove('nav__button--current');
  e.target
    .classList
    .add('nav__button--current');
}
// 清除所有子元素
const removeAllChild = node => {
  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
}
// Component（card）
const Stream = ({ user_login, thumbnail_url, title, user_name, viewer_count }) => {
  return `
    <a class="card" href="https://www.twitch.tv/${user_login}" target="_blank">
      <div class="card__preview">
        <img src="${resetImageUrl(thumbnail_url)}">
      </div>
      <div class="card__info">
        <img class="card__avatar" src="./img/logo.png">
        <div class="card__detail">
          <div class="card__title">${title}</div>
          <div class="card__anchor ">${user_name}</div>
        </div>
      </div>
      <div class="card__viewer">
        <i class="fas fa-eye"></i>
        <span>${viewer_count}</span>
      </div>
    </a>`;
}
// 渲染實況列表
const renderStreams = ({ data, pagination }) => {
  // 更新分頁 reference
  cursor = pagination.cursor;
  for (let stream of data) {
    const element = document.createElement('a');
    streamList.appendChild(element);
    element.outerHTML = Stream(stream);
  }
}
/*
  第一次需要的資料：
  1. 熱門遊戲
  2. 實況列表 
*/
const getFirstDatas = async () => {
  const topGames= await getTopGames();
  const streams = await getStreams(topGames.data[0].id, LIMIT);
  return [topGames, streams]  
}
// Entry Point
async function init () {
  $.LoadingOverlay('show');
  // 拿到前五熱門遊戲、實況列表
  const [topGames, streams] = await getFirstDatas();
  // 設定標題
  updateTopic(topGames.data[0].name);
  // 儲存遊戲 id 
  gameId = topGames.data[0].id;
  // 設定導覽列
  const navButton = document.querySelectorAll('.nav__button');
  navButton.forEach((button, index) => {
    button.textContent = topGames.data[index].name;
    button.setAttribute('data-game-id', topGames.data[index].id);
  });
  // 渲染實況列表
  renderStreams(streams);

  // 無限滾軸設定
  const observer = new IntersectionObserver(async ([entries]) => {
    if (entries.isIntersecting && !isProcessing) {
      // 最後一頁了
      if (isLastPage) return;
      $.LoadingOverlay('show');
      // 先 Lock 住，避免連續觸發
      isProcessing = true;
      const streams = await getStreams(gameId, LIMIT, cursor);
      // 檢查資料，沒資料就插入新元素提示 user
      if (streams.data.length === 0) {
        const container = document.querySelector('.main .container');
        const div = document.createElement('div');
        div.classList.add('no-more-hint');
        div.innerText = 'no more';
        container.appendChild(div);
        // 更新成最後一頁的狀態
        isLastPage = true;
        // 做完再解除 Lock
        isProcessing = false;
        $.LoadingOverlay('hide');
        return;
      }
      // 渲染上去
      renderStreams(streams);
      // 做完再解除 Lock
      isProcessing = false;
      $.LoadingOverlay('hide');
    }
  }, { threshold: 0 });
  observer.observe(detector);
  $.LoadingOverlay('hide');
}

init();

