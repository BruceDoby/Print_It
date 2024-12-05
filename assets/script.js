document.addEventListener('DOMContentLoaded', () => {
const slides = [
	{
		"image":"slide1.jpg",
		"tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image":"slide2.jpg",
		"tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image":"slide3.jpg",
		"tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"image":"slide4.png",
		"tagLine":"Autocollants <span>avec découpe laser sur mesure</span>"
	}
]

const bannerImg = document.querySelector('.banner-img');

const bannerTxt = document.querySelector('#banner p');

let actualSlide = 0;

function updateSlide(one_slide) {
	if (!bannerImg || !bannerTxt) {
		console.error("Élément(s) manquant(s) dans le DOM.");
		return;
	}

	bannerImg.src = `./assets/images/slideshow/${slides[one_slide].image}`;
	bannerImg.alt = `Slide ${one_slide + 1}`;

	bannerTxt.innerHTML = slides[one_slide].tagLine;
}

arrowRight.addEventListener('click', () => {
	actualSlide = (actualSlide + 1) % slides.length;
	updateSlide(actualSlide);
});

arrowLeft.addEventListener('click', () => {
	actualSlide = (actualSlide - 1 + slides.length) % slides.length;
	updateSlide(actualSlide);
});
});


const arrowRight = document.getElementById('right');

const arrowLeft = document.getElementById('left');

const dots = document.querySelectorAll('.dot');

let normalDot = 0;

function updateSelectedDot(selectedDot) {
    dots[normalDot].classList.remove('dot_selected');
    dots[selectedDot].classList.add('dot_selected');
    normalDot = selectedDot;
}

arrowRight.addEventListener('click', () => {
    const nextDot = (normalDot + 1) % dots.length;
    updateSelectedDot(nextDot);
});

arrowLeft.addEventListener('click', () => {
    const previousDot = (normalDot - 1 + dots.length) % dots.length;
    updateSelectedDot(previousDot);
});
