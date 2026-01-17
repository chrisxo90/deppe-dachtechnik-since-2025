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


  { src: "img/ref-4.jpg?v=1.1", alt: "Referenz 4", description: "Es wurde ein moderner Schuppen mit stilvollem Design gebaut. Ideal zur Aufbewahrung von Gartenmöbeln, Grillzubehör und mehr. Die klare Optik fügt sich harmonisch in jeden Garten ein. Gefertigt aus nachhaltigen Materialien und sorgfältig verarbeitet für langanhaltende Qualität. Praktisch, langlebig und umweltbewusst zugleich." },


  { src: "img/ref-5.jpg?v=1.1", alt: "Referenz 5", description: "Das Carport wurde in Holzbauweise mit einem funktionalen Gefälledach errichtet. Die Dachfläche erhielt eine zweilagige Bitumenabdichtung für dauerhaften Schutz vor Feuchtigkeit. Abgerundet wurde die Konstruktion mit einer hochwertigen Dachrandblende und einer Schieferumrandung, die sowohl Schutz als auch eine edle Optik bieten." },


  { src: "img/ref-6.jpg?v=1.1", alt: "Referenz 6", description: "Für diesen Giebel wurde eine stabile Unterkonstruktion errichtet und mit robusten Faserzementplatten verkleidet. Diese bieten einen zuverlässigen Schutz der Fassade vor unterschiedlichen Witterungseinflüssen wie Regen, Wind und UV-Strahlung. Die Maßnahme trägt zur Langlebigkeit und optischen Aufwertung des Gebäudes bei." },

  { src: "img/ref-7.jpg?v=1.1", alt: "Referenz 7", description: "Bei diesem Projekt wurde das Steildach vollständig mit neuen Schieferplatten eingedeckt. Die langlebigen und witterungsbeständigen Schiefer sorgen für optimalen Schutz vor Regen, Schnee und Wind. Gleichzeitig verleiht die Erneuerung dem Dach ein klassisches und hochwertiges Erscheinungsbild." },

  { src: "img/ref-8.jpg?v=1.1", alt: "Referenz 8", description: "In das Steildach wurde eine neue Loggia mit zusätzlichen Sparren eingezogen und mit Resopalplatten modern verkleidet. Durch die Ausrichtung zur Sonnenseite und die Möglichkeit zur Terrassennutzung entsteht ein heller, geschützter Bereich mit schöner Aussicht. Die Maßnahme wertet den Wohnraum auf und steigert spürbar das Wohngefühl im Dachgeschoss." },

  { src: "img/ref-9.jpg?v=1.1", alt: "Referenz 9", description: "Der Giebel wurde vollständig mit neuen Schieferplatten versehen, um sowohl die Optik als auch den Wetterschutz zu verbessern. Die langlebigen Platten bieten zuverlässigen Schutz vor Regen, Wind und UV-Strahlung. Gleichzeitig erhält die Fassade ein hochwertiges und traditionelles Erscheinungsbild." },

  { src: "img/ref-10.jpg?v=1.1", alt: "Referenz 10", description: "Schornstein, Gaube und Dachrinne wurden mit hochwertigen Kupferdetails neu ausgearbeitet. Das Material sorgt nicht nur für eine edle Optik, sondern ist besonders langlebig und witterungsbeständig. Diese Ausführung steigert den Gesamtwert des Dachs und verleiht dem Gebäude eine stilvolle Note." },

  { src: "img/ref-13.jpg?v=1.1", alt: "Referenz 13", description: "Bei diesem Flachdach wurde zunächst eine Regenerationsbahn fachgerecht aufgeschweißt, um die vorhandene Abdichtung zu erneuern und zu schützen. Anschließend erfolgte die Installation des Bauder Solar Systems, das eine effiziente Nutzung der Dachfläche zur Stromerzeugung ermöglicht. Die Kombination beider Maßnahmen sorgt für eine langlebige Abdichtung und nachhaltige Energiegewinnung." }
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