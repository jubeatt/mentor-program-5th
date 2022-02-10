let isMenuOpen = false
const openMenuButton = document.querySelector('.nav__open-button')
const closeMenuButton = document.querySelector('.nav__close-button')
const nav = document.querySelector('.nav')
openMenuButton.addEventListener('click', function() {
  nav.classList.add('nav--open')
  isMenuOpen = true
})
closeMenuButton.addEventListener('click', function() {
  nav.classList.remove('nav--open')
  isMenuOpen = false
})
document.querySelector('.main').addEventListener('click', function(e) {
  if (isMenuOpen) {
    e.preventDefault()
  }
  nav.classList.remove('nav--open')
  isMenuOpen = false
}, true)
