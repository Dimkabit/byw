// Get references to the elements you want to animate
const contentSection = document.querySelector(".content-section");
const heroImages = document.querySelector(".hero__images");
const pageBlock = document.querySelector(".page-block");

// Function to add the animate class to pageBlock
function addAnimation() {
    pageBlock.classList.add("animate-up");
    contentSection.style.animation = "disperse-up-left 1s ease-in-out forwards";
    heroImages.style.animation = "disperse-up-right 1s ease-in-out forwards";
}

// Function to remove the animate class from pageBlock
function removeAnimation() {
    pageBlock.classList.remove("animate-up");
    contentSection.style.animation = "reappear 1s ease-in-out forwards";
    heroImages.style.animation = "reappear1 1s ease-in-out forwards";
}

// Track whether the animation is in progress
let isAnimating = false;

// Trigger animations when scrolling
window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    // Define the scroll position where the animation should start
    const animationStartPoint = 200;

    if (scrollPosition > animationStartPoint && !isAnimating) {
        // Scroll up animation
        addAnimation();
        isAnimating = true;
    } else if (scrollPosition <= animationStartPoint && isAnimating) {
        // Scroll back down animation
        removeAnimation();
        isAnimating = false;
    }
});