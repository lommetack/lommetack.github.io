import "/css/style.css";

const menuToggle = document.querySelector('.header__menu-toggle');
const nav = document.querySelector('.header__nav');
const storyImg = document.querySelector('.story__img');
const lucifer = document.getElementById('lucifer');
const kandelaar = document.getElementById('kandelaar');

document.querySelector('.header__menu-toggle').addEventListener('click', function () {
    const nav = document.querySelector('.header__nav');
    const header = document.querySelector('.header');

    nav.classList.toggle('open');

    header.classList.toggle('open');
});

storyImg.addEventListener('click', () => {
document.querySelector('.gallery').scrollIntoView({ behavior: 'smooth' });
});

lucifer.addEventListener('click', () => {
    kandelaar.src = "assets/img/kandelaar-light/kandelaar-light_gjzvss_c_scale_w_420.avif";
    kandelaar.srcset = `
    assets/img/kandelaar-light/kandelaar-light_gjzvss_c_scale_w_200.avif 200w,
    assets/img/kandelaar-light/kandelaar-light_gjzvss_c_scale_w_358.avif 358w,
    assets/img/kandelaar-light/kandelaar-light_gjzvss_c_scale_w_420.avif 420w
  `;
});

const sections = document.querySelectorAll('.section');

sections.forEach(section => {
    section.classList.add('dark');
});

const luciferButton = document.querySelector('.lucifer');

luciferButton.addEventListener('click', function () {
    if (sections[0].classList.contains('dark')) {
        sections.forEach(section => {
            section.classList.remove('dark');
        });
        luciferButton.removeEventListener('click', arguments.callee);
    }
});

let selectedPlace = null;
let currentPlaceIndex = 0;
const places = document.querySelectorAll('.place');
const selectBtn = document.getElementById('select-btn');
const resultText = document.getElementById('result-text');
const resultDiv = document.getElementById('result');
const retryBtn = document.getElementById('retry-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const placesWrapper = document.querySelector('.places-wrapper');

function showPlace(index) {
    places.forEach((place, i) => {
        if (i === index) {
            place.classList.add('active');
        } else {
            place.classList.remove('active');
        }
    });
}

function updateSelection() {
    selectedPlace = places[currentPlaceIndex].id;
}

showPlace(currentPlaceIndex); 

let startX = 0;
let endX = 0;

placesWrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

placesWrapper.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
});

placesWrapper.addEventListener('touchend', () => {
    if (startX > endX) {
        if (currentPlaceIndex < places.length - 1) {
            currentPlaceIndex++;
            showPlace(currentPlaceIndex);
            updateSelection();
        }
    } else if (startX < endX) {
        if (currentPlaceIndex > 0) {
            currentPlaceIndex--;
            showPlace(currentPlaceIndex);
            updateSelection();
        }
    }
});

prevBtn.addEventListener('click', () => {
    if (currentPlaceIndex > 0) {
        currentPlaceIndex--;
        showPlace(currentPlaceIndex);
        updateSelection();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPlaceIndex < places.length - 1) {
        currentPlaceIndex++;
        showPlace(currentPlaceIndex);
        updateSelection();
    }
});

selectBtn.addEventListener('click', () => {
    if (selectedPlace) {
        if (selectedPlace === 'garden') {
            resultText.textContent = "Goed gedaan! De manuscripten zijn niet gevonden.";
            retryBtn.style.display = 'none';  
        } else {
            resultText.textContent = "Jammer, ze hebben de manuscripten gevonden.";
            retryBtn.style.display = 'block'; 
        }

        resultDiv.style.display = 'block';
        resultDiv.classList.add('show'); 
        selectBtn.style.display = 'none';
    } else {
        alert("Kies eerst een plaats.");
    }
});


retryBtn.addEventListener('click', () => {
    places.forEach(p => p.classList.remove('active'));
    currentPlaceIndex = 0;
    showPlace(currentPlaceIndex);
    resultDiv.style.display = 'none';
    selectBtn.style.display = 'block';
});



const perkament = document.querySelector('.perkament__img');
const perkamentContainer = document.querySelector('.perkament');

const overlay = document.createElement('div');
overlay.style.position = 'absolute';
overlay.style.top = '0';
overlay.style.left = '10%';
overlay.style.width = '80%';
overlay.style.height = '100%';
overlay.style.backgroundImage = 'url("assets/img/perkament-tekst.png")'; 
overlay.style.backgroundSize = 'cover';
overlay.style.opacity = '0'; 
overlay.style.pointerEvents = 'none'; 

perkamentContainer.style.position = 'relative'; 
perkamentContainer.appendChild(overlay);

let isDrawing = false;

perkament.addEventListener('mousedown', () => isDrawing = true);
perkament.addEventListener('touchstart', () => isDrawing = true);

perkament.addEventListener('mouseup', () => isDrawing = false);
perkament.addEventListener('touchend', () => isDrawing = false);

perkament.addEventListener('mousemove', (e) => revealText(e));
perkament.addEventListener('touchmove', (e) => {
  e.preventDefault();
  revealText(e);
});

function revealText(event) {
  if (!isDrawing) return;

  const rect = perkament.getBoundingClientRect();
  const x = event.touches ? event.touches[0].clientX - rect.left : event.clientX - rect.left;

  let overlayOpacity = Math.max(0, Math.min(1, x / rect.width)); 
  overlay.style.opacity = overlayOpacity;
}

perkament.addEventListener('touchstart', (e) => {
  const rect = perkament.getBoundingClientRect();
  const x = e.touches[0].clientX - rect.left;
  let overlayOpacity = Math.max(0, Math.min(1, x / rect.width));
  overlay.style.opacity = overlayOpacity;
});

gsap.registerPlugin(ScrollTrigger);

const footsteps = document.querySelectorAll('.voetstappen__img');

footsteps.forEach((footstep, index) => {
    gsap.fromTo(footstep, {
        opacity: 0,
        transform: "translate(100vw, 0)", 
    }, {
        opacity: 1,
        transform: "translate(0, 0)", 
        scrollTrigger: {
            trigger: footstep,
            start: 'top bottom',
            end: 'bottom center',
            scrub: 1,
            markers: false, 
        }
    });
});

gsap.fromTo(".sleutelgat__img",
    { opacity: 0 },
    {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: ".sleutelgat__img",
            start: "top center", 
            end: "bottom top",  
            scrub: true,
            markers: false, 
            toggleActions: "play none none none"
        }
    }
);



gsap.registerPlugin(ScrollTrigger);

gsap.to(".chapter4__maan-img", {
    rotation: 1080, 
    scrollTrigger: {
        trigger: ".chapter4__container", 
        start: "top bottom", 
        end: "bottom top", 
        scrub: 1, 
        markers: false, 
    }
});


gsap.registerPlugin(ScrollTrigger);

gsap.to(".bliksem__img", {
    opacity: 1, 
    duration: 1, 
    repeat: 10, 
    yoyo: true, 
    scrollTrigger: {
        trigger: ".chapter2__container", 
        start: "top bottom", 
        end: "bottom top", 
        scrub: 1, 
        markers: false, 
    }
});
