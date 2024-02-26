function showNotificationBox(title, content) {
    body.style.pointerEvents = 'none';
    notificationBox.style.pointerEvents = 'all';
    notificationBox.style.zIndex = '1';
    notificationBox.style.opacity = '1';
    boxTitle.textContent = title;
    boxContent.textContent = content;
    alignNotificationBox();
}

function alignNotificationBox() {
    notificationBox.style.top = `${((window.innerHeight / 2) - (notificationBox.offsetHeight / 2))}px`;
}

const body = document.querySelector('body');
const notificationBox = document.querySelector('.notification-box');
const boxTitle = document.querySelector('.box-title');
const boxContent = document.querySelector('.box-content');
const closeNotificationBoxButton = document.querySelector('.close-notification-box');

closeNotificationBoxButton.addEventListener('click', () => {
    notificationBox.style.opacity = '0';
    body.style.pointerEvents = 'all';
    notificationBox.style.zIndex = '-1';
});

window.addEventListener('resize', () => {
    alignNotificationBox();
});