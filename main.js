import "/css/style.css";

const menuToggle = document.querySelector('.header__menu-toggle');
const nav = document.querySelector('.header__nav');

menuToggle.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});


// const intro = document.querySelector('.intro');

// intro.addEventListener('mousemove', (event) => {
//   const rect = intro.getBoundingClientRect();
//   const x = ((event.clientX - rect.left) / rect.width) * 100;
//   const y = ((event.clientY - rect.top) / rect.height) * 100;

//   intro.style.backgroundPosition = `${x}% ${y}%`;
// });


// Selecteer de elementen
const lucifer = document.querySelector("#lucifer");
const kandelaar = document.querySelector("#kandelaar");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// // Start met slepen
// lucifer.addEventListener("pointerdown", (e) => {
//     isDragging = true;

//     // Offset berekenen
//     offsetX = e.clientX - lucifer.getBoundingClientRect().left;
//     offsetY = e.clientY - lucifer.getBoundingClientRect().top;

//     lucifer.style.position = "absolute";
//     lucifer.style.zIndex = 1000; // Zorgt ervoor dat de lucifer boven andere elementen ligt
// });

// // Beweging volgen
// window.addEventListener("pointermove", (e) => {
//     if (!isDragging) return;

//     // Verplaats de lucifer
//     lucifer.style.left = `${e.clientX - offsetX}px`;
//     lucifer.style.top = `${e.clientY - offsetY}px`;
// });

// // Loslaten
// window.addEventListener("pointerup", () => {
//     if (!isDragging) return;
//     isDragging = false;

//     // Controleer of de lucifer de kandelaar raakt
//     const luciferRect = lucifer.getBoundingClientRect();
//     const kandelaarRect = kandelaar.getBoundingClientRect();

//     const isOverlapping =
//         luciferRect.right > kandelaarRect.left &&
//         luciferRect.left < kandelaarRect.right &&
//         luciferRect.bottom > kandelaarRect.top &&
//         luciferRect.top < kandelaarRect.bottom;

//     if (isOverlapping) {
//         // Verander de afbeelding van de kandelaar
//         kandelaar.src = "assets/img/kandelaar-light.png";
//         console.log("Kaars aangestoken!");
//     }

//     // Reset luciferpositie
//     lucifer.style.position = "static";
//     lucifer.style.zIndex = "auto";
// });
