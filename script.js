// ERROR TEXT SEQUENCE
const errorText = document.getElementById("error-text");
const errorMessages = [
  "SYSTEM FAILURE...",
  "Attempting to restore data...",
  "ERROR: Unexpected interruption detected.",
  "Rebooting in 5...",
  "Rebooting in 4...",
  "Rebooting in 3...",
  "Rebooting in 2...",
  "Rebooting in 1..."
];
let index = 0;

const errorInterval = setInterval(() => {
  if (index < errorMessages.length) {
    errorText.textContent = errorMessages[index];
    index++;
  } else {
    clearInterval(errorInterval);
    document.getElementById("error-screen").classList.add("hidden");
    document.getElementById("fireworks-screen").classList.remove("hidden");
    startFireworks();
  }
}, 700);

// FIREWORKS
function startFireworks() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const fireworks = [];
  function random(min, max) { return Math.random() * (max - min) + min; }

  function createFirework() {
    fireworks.push({
      x: random(0, canvas.width),
      y: canvas.height,
      targetY: random(0, canvas.height / 2),
      color: `hsl(${random(0, 360)}, 100%, 70%)`,
      particles: []
    });
  }

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((fw, i) => {
      if (fw.y > fw.targetY) {
        fw.y -= 5;
        ctx.beginPath();
        ctx.arc(fw.x, fw.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = fw.color;
        ctx.fill();
      } else {
        if (fw.particles.length === 0) {
          for (let j = 0; j < 30; j++) {
            fw.particles.push({
              x: fw.x,
              y: fw.y,
              angle: Math.random() * Math.PI * 2,
              speed: Math.random() * 3 + 1,
              life: 100
            });
          }
        }
        fw.particles.forEach((p) => {
          p.x += Math.cos(p.angle) * p.speed;
          p.y += Math.sin(p.angle) * p.speed;
          p.life -= 1;
          ctx.fillStyle = fw.color;
          ctx.fillRect(p.x, p.y, 2, 2);
        });
        fw.particles = fw.particles.filter(p => p.life > 0);
        if (fw.particles.length === 0) fireworks.splice(i, 1);
      }
    });
  }

  setInterval(createFirework, 500);
  setInterval(draw, 30);

  setTimeout(() => {
  document.getElementById("birthday-text").classList.remove("hidden");
  setTimeout(() => {
    const btn = document.getElementById("continue-btn");
    btn.classList.remove("hidden");
    btn.classList.add("show"); // efek fade muncul
  }, 2000);
}, 4000);

}

// WISHES
const wishes = [
  "Iza:\nsemoga lu ga wafat dalam waktu dekat, be my warteg partner 4ever bro, awokawok.",
  "Risma:\nsmoga kita semua lulus bareng ya, pembohong handal",
  "Bey:\nselamat 19 tahun, icelll!! 🎂🎉\nsemoga makin sehat, makin bahagia, makin sabar menghadapi dunia awowkwokw\nusia barunya semoga bawa banyak hal baik yaa dan yang kamu harapin semoga satu-satu datang tepat waktu 🤞🏻\ni know u are ready for whatever comes ur way 🫵🏻\naku tau hari ini pasti udah banyak yang ngucapin, tapi aku mau tutup hari ini dengan doa yang sama tulusnya\nhave a lovely rest of ur day yaa cel, semoga malam ini ditutup dengan hati yang senang 💙"
];

const continueBtn = document.getElementById("continue-btn");
const wishScreen = document.getElementById("wish-screen");
const wishText = document.getElementById("wish-text");
const nextBtn = document.getElementById("next-wish");
const photoScreen = document.getElementById("photo-screen");
let wishIndex = 0;

continueBtn.onclick = () => {
  document.getElementById("fireworks-screen").classList.add("hidden");
  wishScreen.classList.remove("hidden");
  wishText.textContent = wishes[wishIndex];
};

nextBtn.onclick = () => {
  wishIndex++;
  if (wishIndex < wishes.length) {
    wishText.textContent = wishes[wishIndex];
  } else {
    wishScreen.classList.add("hidden");
    photoScreen.classList.remove("hidden");
    showPhotos();
  }
};

// PHOTOS
function showPhotos() {
  const photos = [
    { src: "assets/icel1.jpg" },
    { src: "assets/icel2.jpg" },
    { src: "assets/icel3.jpg"},
    { src: "assets/icel4.jpg"},
    { src: "assets/icel5.jpg" },
    { src: "assets/icel6.jpg",},
    { src: "assets/icel8.jpg",},
    { src: "assets/icel9.jpg",},
    { src: "assets/icel10.jpg",},
    { src: "assets/icel11.jpg",},
    { src: "assets/icel12.jpg",},
    { src: "assets/icel13.jpg",},
    { src: "assets/icel14.jpg",},
    { src: "assets/icel15.jpg",},
    { src: "assets/icel16.jpg",},
    { src: "assets/icel17.jpg",},
    { src: "assets/icel18.jpg",},
    { src: "assets/icel20.jpg",}
  ];

  const container = document.getElementById("photo-container");
  container.innerHTML = "";

  photos.forEach((photo) => {
    const div = document.createElement("div");
    div.classList.add("polaroid");
    div.style.setProperty("--angle", `${(Math.random() - 0.5) * 10}deg`);
    div.innerHTML = `
      <img src="${photo.src}" alt="photo">
    `;
    container.appendChild(div);
  });
}

document.getElementById("restart-btn").onclick = () => location.reload();
