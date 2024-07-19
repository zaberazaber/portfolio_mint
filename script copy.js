//get all background div 
var backgrounds = document.querySelectorAll('.background');
//get the slider and the images
const slider = document.querySelector('.slider-images');
const images = Array.from(slider.children);

//set the initial image index
let imageIndex = 0;

//update the slider
function updateSlider() {
    //recieve the 'active', 'previous','next' and 'inactive' classes from all images
    images.forEach(img => {
        img.classList.remove('active', 'previous','next', 'inactive')
    })

    //add the active class to the current image
    images[imageIndex].classList.add('active')

    //add the 'previous' class to the image before the current one
    if(imageIndex -1 >= 0){
        images[imageIndex -1].classList.add('previous')
    } else {
        images[images.length -1 ].classList.add('previous')
    }

     //add the 'next' class to the image after the current one
     if(imageIndex + 1 < images.length){
        images[imageIndex + 1].classList.add('next')
    } else {
        images[0].classList.add('next')
    }

    //add the inactive class to the other images
    images.forEach((img,index) => {
        if(index !== imageIndex && index !== (imageIndex - 1 + images.length) % images.length && index !== (imageIndex + 1) % images.length){
            img.classList.add('inactive')
        }
    })

    //set the opacity of all the backgroud div to zero
    backgrounds.forEach((background) => {
        background.style.opacity = 0;
    });

    // if the current image is active set opacity  to 1
    if(images[imageIndex].classList.contains('active')){
        backgrounds[imageIndex].style.opacity = 1;
    }
    // update the image index
    imageIndex = (imageIndex + 1) % images.length;
}
updateSlider();
//update the slider every 3 sec
setInterval(updateSlider, 3000)

images[1].classList.add('next')
images[2].classList.add('inactive')
images[3].classList.add('inactive')
images[4].classList.add('previous')
images[0].classList.add('active')