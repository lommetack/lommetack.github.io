import "/css/style.css";

const menuToggle = document.querySelector('.header__menu-toggle');
const nav = document.querySelector('.header__nav');
const storyImg = document.querySelector('.story__img');
const lucifer = document.getElementById('lucifer');
const kandelaar = document.getElementById('kandelaar');

document.querySelector('.header__menu-toggle').addEventListener('click', function () {
    const nav = document.querySelector('.header__nav');
    const header = document.querySelector('.header');

    // Toggle the navigation menu
    nav.classList.toggle('open');

    // Toggle the header to move the content down
    header.classList.toggle('open');
});




storyImg.addEventListener('click', () => {
document.querySelector('.gallery').scrollIntoView({ behavior: 'smooth' });
});


// Voeg een klik-eventlistener toe aan de lucifer
lucifer.addEventListener('click', () => {
    // Verander de src en srcset van de kandelaar naar de "light" versie
    kandelaar.src = "assets/img/kandelaar-light/kandelaar-light_gjzvss_c_scale_w_420.avif";
    kandelaar.srcset = `
    assets/img/kandelaar-light/kandelaar-light_gjzvss_c_scale_w_200.avif 200w,
    assets/img/kandelaar-light/kandelaar-light_gjzvss_c_scale_w_358.avif 358w,
    assets/img/kandelaar-light/kandelaar-light_gjzvss_c_scale_w_420.avif 420w
  `;
});


// Selecteer alle secties
const sections = document.querySelectorAll('.section');

// Voeg bij het laden de 'dark' klasse toe aan alle secties
sections.forEach(section => {
    section.classList.add('dark');
});

// Selecteer de lucifer-knop
const luciferButton = document.querySelector('.lucifer');

// Voeg een event listener toe aan de lucifer-knop
luciferButton.addEventListener('click', function () {
    // Controleer of de pagina al in de 'dark' modus is
    if (sections[0].classList.contains('dark')) {
        // Als de pagina in 'dark' modus is, schakel het uit (maak het normaal)
        sections.forEach(section => {
            section.classList.remove('dark');
        });
        // Zet de knop in 'deactieve' toestand door de event listener te verwijderen
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

showPlace(currentPlaceIndex); // Zorg ervoor dat de eerste plaats zichtbaar is

// Swipe Functionaliteit voor mobiel
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
        // Swipe naar links
        if (currentPlaceIndex < places.length - 1) {
            currentPlaceIndex++;
            showPlace(currentPlaceIndex);
            updateSelection();
        }
    } else if (startX < endX) {
        // Swipe naar rechts
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
            retryBtn.style.display = 'none';  // Verberg retry button voor de tuin
        } else {
            resultText.textContent = "Jammer, ze hebben de manuscripten gevonden.";
            retryBtn.style.display = 'block'; // Toon retry button voor andere plaatsen
        }

        resultDiv.style.display = 'block';
        resultDiv.classList.add('show'); // Voeg de 'show' klasse toe om de result en retry zichtbaar te maken
        selectBtn.style.display = 'none';
    } else {
        alert("Kies eerst een plaats.");
    }
});


retryBtn.addEventListener('click', () => {
    // Reset alles om opnieuw te proberen
    places.forEach(p => p.classList.remove('active'));
    currentPlaceIndex = 0;
    showPlace(currentPlaceIndex);
    resultDiv.style.display = 'none';
    selectBtn.style.display = 'block';
});



// Selecteer de perkament afbeelding en de container
const perkament = document.querySelector('.perkament__img');
const perkamentContainer = document.querySelector('.perkament');

// Maak een overlay div aan die de tekst afdekt
const overlay = document.createElement('div');
overlay.style.position = 'absolute';
overlay.style.top = '0';
overlay.style.left = '10%';
overlay.style.width = '80%';
overlay.style.height = '100%';
overlay.style.backgroundImage = 'url("assets/img/perkament-tekst.png")'; // De afbeelding met de tekst
overlay.style.backgroundSize = 'cover';
overlay.style.opacity = '0'; // Begin met de overlay verborgen
overlay.style.pointerEvents = 'none'; // Zorg ervoor dat de overlay geen muisklikken blokkeert

// Voeg de overlay toe aan de container van de afbeelding
perkamentContainer.style.position = 'relative'; // Zorg ervoor dat de parent van de afbeelding een context heeft voor de overlay
perkamentContainer.appendChild(overlay);

// Stel een vlag in voor het tekenen
let isDrawing = false;

// Begin met tekenen bij aanraking of muisklik
perkament.addEventListener('mousedown', () => isDrawing = true);
perkament.addEventListener('touchstart', () => isDrawing = true);

// Stop met tekenen bij het loslaten van de muis of aanraking
perkament.addEventListener('mouseup', () => isDrawing = false);
perkament.addEventListener('touchend', () => isDrawing = false);

// Functie om de overlay zichtbaar te maken afhankelijk van de beweging
perkament.addEventListener('mousemove', (e) => revealText(e));
perkament.addEventListener('touchmove', (e) => {
  // Voorkom dat de pagina scrollt tijdens het wrijven over de afbeelding
  e.preventDefault();
  revealText(e);
});

function revealText(event) {
  if (!isDrawing) return;

  // Verkrijg de positie van de muis of vinger ten opzichte van de perkament afbeelding
  const rect = perkament.getBoundingClientRect();
  const x = event.touches ? event.touches[0].clientX - rect.left : event.clientX - rect.left;

  // Pas de opaciteit van de overlay aan op basis van de horizontale beweging
  let overlayOpacity = Math.max(0, Math.min(1, x / rect.width)); // 0 = volledig verborgen, 1 = volledig zichtbaar
  overlay.style.opacity = overlayOpacity;
}

// Toevoegen van touchstart en touchend voor mobiele apparaten
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
        transform: "translate(100vw, 0)", // Begin buiten beeld aan de rechterkant
    }, {
        opacity: 1,
        transform: "translate(0, 0)", // Beweeg naar de normale positie
        scrollTrigger: {
            trigger: footstep,
            start: 'top bottom',
            end: 'bottom center',
            scrub: 1,
            markers: false, // Verwijder markers, tenzij je ze voor debugging nodig hebt
        }
    });
});

// Sleutelgat afbeelding zichtbaar maken bij scrollen
gsap.fromTo(".sleutelgat__img",
    { opacity: 0 },
    {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: ".sleutelgat__img",
            start: "top center", // Wanneer de bovenkant van de sleutelgat-afbeelding de center bereikt
            end: "bottom top",  // Eindigt wanneer de onderkant van de sleutelgat-afbeelding het begin van het scherm bereikt
            scrub: true,
            markers: false, // Verwijder markers
            toggleActions: "play none none none"
        }
    }
);



gsap.registerPlugin(ScrollTrigger);

gsap.to(".chapter4__maan-img", {
    rotation: 1080, // 3 rondjes (3 * 360 graden = 1080)
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
