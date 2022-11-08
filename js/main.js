const hamburgerIcon = document.querySelector('.hamburger')
const secondMenu = document.querySelector('.second-menu')
const hamburgerCloseIcon = document.querySelector('.hamburger-close')

console.log(hamburgerCloseIcon)
hamburgerIcon.addEventListener('click', displaySecMenu)
hamburgerCloseIcon.addEventListener('click', hideSecMenu)

function displaySecMenu(){
    secondMenu.style.transform = 'translateX(0)'
    this.style.display = 'none'
}

function hideSecMenu(){
    secondMenu.style.transform = 'translateX(100%)'
    setTimeout(() => hamburgerIcon.style.display = 'block', 900)
}