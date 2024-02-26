const swipeImageContent = document.querySelector('.images-swipe-content');
const swipeCards = document.querySelectorAll('.swipe-card');
const backward = document.querySelector('.backward');
const forward = document.querySelector('.forward');
const cardWidth = swipeCards[0].offsetWidth;

var clickedStatus = false;
var currentPosition;
var positionX;

const isDown = (e) => {
    clickedStatus = true;
    currentPosition = swipeImageContent.scrollLeft;
    positionX = e.pageX; 
}

const isDragging = (e) => {
    if (clickedStatus) {
        swipeImageContent.scrollLeft = currentPosition - (e.pageX - positionX);
    }
}

const dragStopped = () => {
    clickedStatus = false;
    currentPosition = swipeImageContent.scrollLeft;
}

swipeImageContent.addEventListener('mousedown', isDown);
swipeImageContent.addEventListener('mouseover', isDragging);
document.addEventListener('mouseup', dragStopped);

backward.addEventListener('click', () => {
    swipeImageContent.scrollLeft += -cardWidth;
});

forward.addEventListener('click', () => {
    swipeImageContent.scrollLeft += cardWidth;
    
});