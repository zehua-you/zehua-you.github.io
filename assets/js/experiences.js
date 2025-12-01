// assets/js/experiences.js

document.addEventListener("DOMContentLoaded", () => {
  const wrappers = document.querySelectorAll(".project-visuals");

  // Initialize each carousel
  wrappers.forEach((wrapper) => {
    const track = wrapper.querySelector(".image-carousel");
    if (!track) return;

    const slides = track.querySelectorAll("img");
    if (slides.length === 0) return;

    // Start at index 0
    wrapper.dataset.currentIndex = "0";

    // Show only the first slide
    slides.forEach((img, i) => {
      img.style.display = i === 0 ? "block" : "none";
    });

    const prevButton = wrapper.querySelector(".carousel-arrow-left");
    const nextButton = wrapper.querySelector(".carousel-arrow-right");

    // If only one slide, hide arrows
    if (slides.length === 1) {
      if (prevButton) prevButton.style.display = "none";
      if (nextButton) nextButton.style.display = "none";
    } else {
      if (prevButton) prevButton.style.display = "flex";
      if (nextButton) nextButton.style.display = "flex";
    }
  });

  // Global click handler for all arrows
  document.addEventListener("click", (event) => {
    const arrow = event.target.closest(".carousel-arrow");
    if (!arrow) return; // clicked something else

    event.preventDefault();

    const wrapper = arrow.closest(".project-visuals");
    if (!wrapper) return;

    const track = wrapper.querySelector(".image-carousel");
    if (!track) return;

    const slides = track.querySelectorAll("img");
    if (slides.length <= 1) return;

    // Direction: -1 for left, +1 for right
    const direction = arrow.classList.contains("carousel-arrow-left") ? -1 : 1;

    const total = slides.length;
    const currentIndex = parseInt(wrapper.dataset.currentIndex || "0", 10);
    const newIndex = (currentIndex + direction + total) % total;

    // Update visible slide
    slides[currentIndex].style.display = "none";
    slides[newIndex].style.display = "block";

    wrapper.dataset.currentIndex = String(newIndex);
  });
});
