function createCarousel({width=0.8, height=500, isLoop=false}) {

  // 幻燈片指標
  let index = 0
  // 視窗寬度
  const viewport = window.innerWidth
  const carouselWidth = viewport * width
  const carouselHeight = height

  const carousel = document.querySelector('.carousel')
  const carouselContainer =  document.querySelector('.carousel__container')
  const carouselItems =  document.querySelectorAll('.carousel__item')
  const carouselTotalItems =  carouselItems.length
  const nextButton = document.querySelector('.carousel__next-button')
  const prevButton = document.querySelector('.carousel__prev-button')
  const carouselButtonsBlock = document.querySelector('.carousel__buttons-block')

  // 是否循環
  if (isLoop) {
    nextButton.addEventListener('click', () => loopSlider(1))
    prevButton.addEventListener('click', () => loopSlider(-1))
  } else {
    nextButton.addEventListener('click', () => changeSlider(1))
    prevButton.addEventListener('click', () => changeSlider(-1))
  }
  carouselButtonsBlock.addEventListener('click', selectSlider)
  
  init()


  /*
    1. 設定 carousel 寬度、高度
    2. 設定 container 寬度
    3. 設定 item 寬度
  */
  function init() {
    carousel.style.width = carouselWidth + 'px'
    carousel.style.height = carouselHeight + 'px'
    carouselContainer.style.width = carouselWidth * carouselTotalItems + 'px'

    // 設定每個 item 的寬度
    for (let carouselItem of carouselItems) {
      carouselItem.style.width = carouselWidth + 'px'
    }

    // 建立 button
    for (let i=0; i<carouselTotalItems; i++) {
      const button = document.createElement('button')
      if (i === 0) {
        button.classList.add('carousel__button--active')
      }
      button.classList.add('carousel__button')
      button.setAttribute('data-index', i)
      carouselButtonsBlock.appendChild(button)
    }  
  }
  // 選擇第 n 個幻燈片
  function selectSlider(e) {
    const element = e.target
    if (element.classList.contains('carousel__button')) {
      index = element.getAttribute('data-index') * 1
      updateSlider(index)
    }
  }
  // 切換幻燈片
  function changeSlider(direction) {
    index += direction
    if (index > carouselTotalItems-1) {
      index = carouselTotalItems-1
    }
    if (index < 0) {
      index = 0
    }
    updateSlider(index)
  }
  // 循環
  function loopSlider(direction) {
    /*
      假設有 5 張
      要產生 0 ~ 4 的範圍
      (0 + 1) % 5 = 1
      (1 + 1) % 5 = 2
      (2 + 1) % 5 = 3
      (3 + 1) % 5 = 4
      (4 + 1) % 5 = 0

      // 負數的時候得 + 5，不然會有問題
      (0 + (-1)) + 5 = 4 => % 5 = 4
      (4 + (-1)) + 5 = 3 => % 5 = 3
      (3 + (-1)) + 5 = 2 => % 5 = 2
      (2 + (-1)) + 5 = 1 => % 5 = 1
      (1 + (-1)) + 5 = 0 => % 5 = 0
    */
    index = (index + direction + carouselTotalItems) % (carouselTotalItems)
    updateSlider(index)
  }

  // 更新幻燈片
  function updateSlider(index) {
    // 移動幻燈片容器
    carouselContainer.style.transform =  `translateX(${-index * carouselWidth}px)`
    // 更新 active 按鈕
    const oldButton = document.querySelector('.carousel__button--active')
    const buttons =document.querySelectorAll('.carousel__button')
    oldButton.classList.remove('carousel__button--active')
    buttons[index].classList.add('carousel__button--active')
  }
}