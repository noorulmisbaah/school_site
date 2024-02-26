window.addEventListener('resize', () => {
    if (window.innerWidth >= 1080)
        toggleNavigationLinks('show')
    else
        toggleNavigationLinks('hide');
});

function toggleNavigationLinks(arg) {
    if (arg === 'show' && window.innerWidth >= 1080)
        topNavigationLinks.style.top = '-3rem';
    else if (arg === 'show' && window.innerWidth < 1080)
        topNavigationLinks.style.top = '1rem';
    else if (arg === 'hide')
        topNavigationLinks.style.top = '-100rem';
}

const closeMenuIcon = document.querySelector('.close-menu-icon');
const menuIcon = document.querySelector('.menu-icon');
const topNavigationLinks = document.querySelector('.header-links');
const loginForm = document.querySelector('.signin-form');
const links = document.querySelectorAll('.header-link');

menuIcon.addEventListener('click', () => {
    toggleNavigationLinks('show');   
});

closeMenuIcon.addEventListener('click', () => {
    toggleNavigationLinks('hide');
});

links.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 1080)
            toggleNavigationLinks('hide');
    })
});