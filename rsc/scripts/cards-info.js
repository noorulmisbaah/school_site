function openContent(index) {
    infos.forEach(info => {
        info.style.transform = 'scale(0)'
    });
    infos[index].style.transform = 'scale(1)';
}

function closeContent(index) {
    infos[index].style.transform = 'scale(0)';
}

const cards = document.querySelectorAll('.card-content');
const closeCards = document.querySelectorAll('.close-info');
const infos = document.querySelectorAll('.info');
const details = document.querySelectorAll('.details');

cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        switch(index) {
            case 0:
                openContent(index);
                
                break;
            case 1:
                openContent(index);
                break;
            case 2:
                openContent(index);
                break;
            case 3:
                openContent(index);
                break;
        }
    })
});

closeCards.forEach((icon, index) => {
    icon.addEventListener('click', () => {
      closeContent(index);
    })
})