// script.js
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.image');
    let currentIndex = 0;

    window.addEventListener('wheel', function(event) {
        if (event.deltaY > 0) {
            showNextImage();
        } else {
            showPreviousImage();
        }
    });

    function showNextImage() {
        if (currentIndex < images.length - 1) {
            images[currentIndex].classList.add('hidden');
            currentIndex++;
            images[currentIndex].classList.remove('hidden');
        }
    }

    function showPreviousImage() {
        if (currentIndex > 0) {
            images[currentIndex].classList.add('hidden');
            currentIndex--;
            images[currentIndex].classList.remove('hidden');
        }
    }
});
