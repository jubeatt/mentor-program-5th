const openMenuButton = document.querySelector('.nav__open-button')
const closeMenuButton = document.querySelector('.nav__close-button')
const nav = document.querySelector('.nav')
openMenuButton.addEventListener('click', function() {
  nav.classList.add('nav--open')
})
closeMenuButton.addEventListener('click', function() {
  nav.classList.remove('nav--open')
})
document.querySelector('.main').addEventListener('click', function() {
  nav.classList.remove('nav--open')
})
