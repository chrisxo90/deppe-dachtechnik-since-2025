// Kontaktformular AJAX-Submit ohne Popup
document.getElementById("kontaktForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var form = e.target;
  var data = new FormData(form);
  fetch(form.action, {
    method: "POST",
    body: data,
  })
    .then((response) => response.text())
    .then((text) => {
      alert(text); // Einfaches alert statt Popup
      form.reset();
    })
    .catch(() => {
      alert("Es ist ein Fehler aufgetreten.");
    });
});

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  const logo = document.querySelector(".deppe-logo");
  if (window.scrollY > 0) {
    navbar.classList.add("navbar-small");
    if (logo) logo.classList.add("logo-small");
  } else {
    navbar.classList.remove("navbar-small");
    if (logo) logo.classList.remove("logo-small");
  }
});

// --- SLIDER ---
const sliderImages = [
  { src: "img/ref-4.jpg", alt: "Referenz 4", description: "Beschreibung für Bild 4" },
  { src: "img/ref-5.jpg", alt: "Referenz 5", description: "Beschreibung für Bild 5" },
  { src: "img/ref-6.jpg", alt: "Referenz 6", description: "Beschreibung für Bild 6" },
  { src: "img/ref-7.jpg", alt: "Referenz 7", description: "Beschreibung für Bild 7" },
  { src: "img/ref-8.jpg", alt: "Referenz 8", description: "Beschreibung für Bild 8" },
  { src: "img/ref-9.jpg", alt: "Referenz 9", description: "Beschreibung für Bild 9" },
  { src: "img/ref-10.jpg", alt: "Referenz 10", description: "Beschreibung für Bild 10" },
  { src: "img/ref-13.jpg", alt: "Referenz 13", description: "Beschreibung für Bild 13" }
];

let currentIndex = 0;
const sliderImg = document.querySelector('.slider-single-img');
const leftBtn = document.querySelector('.slider-arrow-left');
const rightBtn = document.querySelector('.slider-arrow-right');

function updateSlider(direction = 0) {
  sliderImg.style.transition = 'none';
  if (direction === 1) {
    sliderImg.style.transform = 'translateX(100%)';
  } else if (direction === -1) {
    sliderImg.style.transform = 'translateX(-100%)';
  } else {
    sliderImg.style.transform = 'translateX(0)';
  }
  setTimeout(() => {
    sliderImg.src = sliderImages[currentIndex].src;
    sliderImg.alt = sliderImages[currentIndex].alt;
    sliderImg.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1)';
    sliderImg.style.transform = 'translateX(0)';
  }, 20);

  leftBtn.disabled = currentIndex === 0;
  rightBtn.disabled = currentIndex === sliderImages.length - 1;
}

leftBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    sliderImg.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1)';
    sliderImg.style.transform = 'translateX(100%)';
    setTimeout(() => {
      currentIndex--;
      updateSlider(-1);
    }, 400);
  }
});
rightBtn.addEventListener('click', () => {
  if (currentIndex < sliderImages.length - 1) {
    sliderImg.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1)';
    sliderImg.style.transform = 'translateX(-100%)';
    setTimeout(() => {
      currentIndex++;
      updateSlider(1);
    }, 400);
  }
});
const overlay = document.getElementById('imgOverlay');
const overlayImg = document.getElementById('overlayImg');
const closeOverlay = document.getElementById('closeOverlay');
const overlayDescription = document.getElementById('overlayDescription');

sliderImg.addEventListener('click', function() {
  overlayImg.src = this.src;
  overlay.classList.add('active');
  overlayDescription.textContent = sliderImages[currentIndex].description;
});

closeOverlay.addEventListener('click', () => {
  overlay.classList.remove('active');
  overlayDescription.textContent = "";
});
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.classList.remove('active');
    overlayDescription.textContent = "";
  }
});

// --- Touch/Swipe für Slider ---
let startX = 0;
let isSwiping = false;

const sliderWrapper = document.querySelector('.slider-img-wrapper');

sliderWrapper.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1) {
    startX = e.touches[0].clientX;
    isSwiping = true;
  }
});

sliderWrapper.addEventListener('touchmove', (e) => {
  // Optional: Prevent scrolling while swiping
  if (isSwiping) e.preventDefault();
}, { passive: false });

sliderWrapper.addEventListener('touchend', (e) => {
  if (!isSwiping) return;
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;
  const threshold = 50; // Mindestabstand für Swipe

  if (diff > threshold && currentIndex > 0) {
    // Swipe nach rechts (vorheriges Bild)
    leftBtn.click();
  } else if (diff < -threshold && currentIndex < sliderImages.length - 1) {
    // Swipe nach links (nächstes Bild)
    rightBtn.click();
  }
  isSwiping = false;
});