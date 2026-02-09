const enterButton = document.getElementById("enterButton");
const opening = document.getElementById("opening");
const page = document.getElementById("page");
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
const loveCounter = document.getElementById("daysTogether");
const lightbox = document.getElementById("lightbox");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const surprise = document.getElementById("surprise");

const startDate = new Date("2021-02-14"); // PERSONALIZE: change to your date.

const formatDaysTogether = () => {
  const now = new Date();
  const diffTime = Math.abs(now - startDate);
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  loveCounter.textContent = days.toString();
};

const revealPage = () => {
  opening.classList.add("is-hidden");
  page.classList.remove("is-hidden");
  page.setAttribute("aria-hidden", "false");
  document.body.classList.remove("is-locked");
};

enterButton.addEventListener("click", () => {
  revealPage();
});

window.addEventListener("load", () => {
  formatDaysTogether();
  document.body.classList.add("is-locked");
  page.classList.add("is-hidden");
});

musicToggle.addEventListener("click", () => {
  const isPlaying = !bgMusic.paused;
  if (isPlaying) {
    bgMusic.pause();
    musicToggle.setAttribute("aria-pressed", "false");
  } else {
    bgMusic.play().catch(() => {
      // Autoplay may be blocked; user can try again.
    });
    musicToggle.setAttribute("aria-pressed", "true");
  }
});

const handleScroll = (event) => {
  const target = event.currentTarget.getAttribute("data-scroll");
  if (!target) return;
  document.querySelector(target)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", handleScroll);
});

const openLightbox = (caption) => {
  lightboxCaption.textContent = caption;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
};

const closeLightbox = () => {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
};

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const caption = item.getAttribute("data-caption") || "";
    openLightbox(caption);
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("click", (event) => {
  const heart = document.createElement("span");
  heart.classList.add("heart");
  heart.textContent = "❤";
  heart.style.left = `${event.pageX}px`;
  heart.style.top = `${event.pageY}px`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1200);
});

const surpriseObserver = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      surprise.classList.add("is-visible");
    }
  },
  { threshold: 0.2 }
);

surpriseObserver.observe(surprise);
