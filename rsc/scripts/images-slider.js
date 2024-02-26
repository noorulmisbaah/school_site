function setCurrentImage({ src }) {
    currentImage.src = src;
}

function setImageBorder(index) {
    selectImages.forEach(image => image.style.borderColor = '#FFFFFF');
    selectImages[index].style.borderColor = '#A05942';
}

const currentImage = document.querySelector('[current-image]');
const selectImages = document.querySelectorAll('[select-image]');

selectImages[0].style.borderColor = '#A05942';
selectImages.forEach((image, index) => {
    image.addEventListener('click', () => {
        setCurrentImage(image);
        setImageBorder(index);
    })
});