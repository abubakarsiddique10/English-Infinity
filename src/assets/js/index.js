/* NAVBAR START */
const navbarToggler = document.querySelector('.navbar-toggler');
const openMenu = document.getElementById('open-menu');
const closenMenu = document.getElementById('close-menu');
const header = document.getElementById('header');
let isOpen = false;

// Navbar active class
const navLink = document.querySelectorAll('.nav-link');
const navItems = document.querySelector('.nav__items')
navLink.forEach((link) => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-active').classList.remove('nav-active')
        link.classList?.add('nav-active')
    })
})

navbarToggler.addEventListener('click', (e) => {
    openMenu.style.display = e.target.id == "open-menu" ? "none" : "block";
    closenMenu.style.display = e.target.id == "close-menu" ? "none" : "block";
    navItems.classList.toggle('show')

    isOpen = !isOpen;
    header.classList.toggle('header__bg')
    if (window.scrollY > 0) {
        header.classList.add('header__bg')
    }
})
// windo scroll navbar bg color change
window.addEventListener('scroll', () => {
    if (window.scrollY > 0 && !isOpen) {
        header.classList.add('header__bg')
    } else if (isOpen) {
        header.classList.add('header__bg')
    } else {
        header.classList.remove('header__bg')
    }
})
/* NAVBAR END */




/* const isActive = true
const num = 1;

const food = (isActive) ? "Birany" : "Cha";
const food2 = null || "hello"
console.log(food2) */



/* function second() {
    console.log('I am second')
}

function first() {
    console.log('I am first');
    setTimeout(second, 1000);
    console.log('Hello')
}
first() */

/* setTimeout(() => {
    console.log('Hello time')
}, 0);

const isActive = true
const newPromise = new Promise((resolve, reject) => {
    if (isActive) {
        resolve('Active')
    } else {
        reject('not active')
    }
})


newPromise
    .then((res) => console.log(res))
    .catch((res) => console.log(res))



console.log('Hell world') */

