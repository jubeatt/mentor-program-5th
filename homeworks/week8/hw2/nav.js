const openButton = document.querySelector('.nav__open-button')
const closeButton = document.querySelector('.nav__close-button')
const menuList = document.querySelector('.nav__list')
openButton.addEventListener('click', function() {
  menuList.style.display = 'flex'
})
closeButton.addEventListener('click', function() {
  menuList.style.display = 'none'
})