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

