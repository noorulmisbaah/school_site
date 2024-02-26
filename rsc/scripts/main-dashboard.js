const sideLinks = document.querySelectorAll('.side-link');
const informations = document.querySelectorAll('.information');
const closeInformationIcons = document.querySelectorAll('.close-information');
const closeMenuIcon = document.querySelector('.close-menu');
const menuIcon = document.querySelector('.menu-icon');
const navigationsSide = document.querySelector('.navigations-side');

var isNagivationsSideOpen = false;

sideLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
        informations[index].style.display = 'block';
        navigationsSide.style.left = '-100rem';
        isNagivationsSideOpen = false;
    });
});

closeInformationIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
        informations[index].style.display = 'none';
    });
});

menuIcon.addEventListener('click', () => {
    navigationsSide.style.left = '0';
    isNagivationsSideOpen = true;
});

closeMenuIcon.addEventListener('click', () => {
    navigationsSide.style.left = '-100rem';
    isNagivationsSideOpen = false;
});

document.addEventListener('click', () => {
    if (isNagivationsSideOpen) {
        navigationsSide.style.left = '0';
        isNagivationsSideOpen = false;
    } else 
    navigationsSide.style.left = '-100rem';
});