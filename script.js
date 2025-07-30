//////////////////// JAVASCRIPT IS PROCEDURAL PROGRAMMING LANGUAGE YOU SHIT ///////////////////////////
// Function to create image backgrounds
function createRandomElements(count, src, minSize, maxSize) {
  for (let i = 0; i < count; i++) {
    const element = document.createElement("img");
    element.src = src;

    // Size randomization
    const randomSize = Math.floor(Math.random() * (maxSize - minSize)) + 100; // Adjust max size range
    element.style.width = `${randomSize}px`;

    // Increase width by 20% (for visual effect)
    element.style.width = `${randomSize * 1.1}px`;

    // Random rotation between -90 and 90 degrees
    const randomRotation = Math.floor(Math.random() * 181) - 90;
    element.style.transform = `rotate(${randomRotation}deg)`;

    element.style.position = "fixed";

    // Randomly choose left or right side
    const side = Math.random() < 0.5 ? "left" : "right";
    element.style[side] = "0px";

    // Random vertical position (stay within window height)
    const maxTop = window.innerHeight - randomSize;
    element.style.top = `${Math.floor(Math.random() * maxTop)}px`;

    // Styling
    element.style.zIndex = "-10";
    element.style.opacity = "0.65";
    element.style.pointerEvents = "none";

    document.body.appendChild(element);
  }
}

////// HERE'S THE MAIN FUNCTION DOCUMENT ON LOAD /////

// For random background image generators...
window.addEventListener("DOMContentLoaded", () => {
  const lemonCount = 3; // Count for the lemons
  const iceCount = 7; // Count for the ice cubes
  const bubbleCount = 5;

  // for lemons
  for (let i = 0; i < lemonCount; i++) {
    const lemon = document.createElement("img");
    lemon.src = "media/lemon.png";

    const randomSize = Math.floor(Math.random() * (440 - 120)) + 100;
    lemon.style.width = `${randomSize}px`;
    lemon.style.height = `${randomSize}px`;

    lemon.style.position = "fixed";

    // Randomly choose left or right side
    const side = Math.random() < 0.5 ? "left" : "right"; // Here 0.5 value means the center of the display... 1 left, 0 right
    lemon.style[side] = "8px";

    // Random vertical position (stay within window height)
    const maxTop = window.innerHeight - randomSize;
    lemon.style.top = `${Math.floor(Math.random() * maxTop)}px`;

    lemon.style.zIndex = "-10";
    lemon.style.opacity = "0.6";
    lemon.style.pointerEvents = "none";

    document.body.appendChild(lemon);
  }

  createRandomElements(iceCount, "media/ice.png", 200, 320); // To create the ice cubes
  createRandomElements(bubbleCount, "media/bubble.png", 230, 420); // To create the bubbles
  createRandomElements(4, "media/mint.png", 13, 26); // To create mint leaves
});

// For profile picture OnClick event...
const profileImg = document.getElementById("profileImg"); // This code is used 2 times right now

if (profileImg) {
  profileImg.addEventListener("click", function () {
    // Playing the audio
    const startupSound = document.getElementById("startup-audio");
    if (startupSound) {
      startupSound.play();
    }

    const sakura = document.createElement("img");
    sakura.src = "media/sakura-flower.png";
    sakura.id = "sakuraFlower";
    document.body.appendChild(sakura);

    // Force reflow to apply fade-in
    void sakura.offsetWidth;
    sakura.style.opacity = "1"; // Fade in

    let angle = 0;
    let rotating = true;

    const rotationSpeed = 16; // degrees per frame
    const frameDelay = 8; // ~20fps

    const rotateInterval = setInterval(() => {
      if (rotating) {
        angle += rotationSpeed;
        sakura.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      }
    }, frameDelay);

    const toggleInterval = setInterval(() => {
      rotating = !rotating;
    }, 800); // Start/stop every 1s

    // Fade out before removal
    setTimeout(() => {
      sakura.style.opacity = "0"; // Start fade-out

      setTimeout(() => {
        clearInterval(rotateInterval);
        clearInterval(toggleInterval);
        sakura.remove();

        // Stop the sound along with the flower
        if (startupSound) {
          startupSound.pause(); // Pause the audio
          startupSound.currentTime = 0; // Reset to the beginning
        }
      }, 500); // Wait for fade-out to finish (matches CSS transition)
    }, 4850);
  });

  // For "click me" text
  const clickMe = document.querySelector("#clickMe");
  profileImg.addEventListener("mouseenter", () => {
    clickMe.style.display = "block"; // Show the text
  });

  profileImg.addEventListener("mouseleave", () => {
    clickMe.style.display = "none"; // Hide the text
  });
}

// Open popup
function openPopUp(element) {
  // Get the image source and text from the clicked element
  const imgSrc = element.querySelector("img").src;

  // Set the image and text for the popup
  document.getElementById("popup-img").src = imgSrc;

  // Show the popup
  document.getElementById("popup").style.display = "flex";
}

// Close popup
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

///// FOR PROJECT BANNER ON EACH PROJECT PAGES ////
// Banner carousel logic for project2
const bannerImages2 = [
  "media/project2/project-banner.png",
  "media/project2/web1.png",
  "media/project2/web2.png",
  // Add more image paths as needed
];

let currentBanner = 0;

const bannerImg = document.getElementById("banner-img");
const prevBtn = document.getElementById("banner-prev");
const nextBtn = document.getElementById("banner-next");

// Helper: Animate fade out/in
function animateBannerChange(newIndex) {
  if (!bannerImg) return;
  bannerImg.style.transition = "opacity 0.5s";
  bannerImg.style.opacity = "0";

  setTimeout(() => {
    bannerImg.src = bannerImages2[newIndex];
    bannerImg.onload = () => {
      bannerImg.style.opacity = "1";
    };
  }, 400);
}

// Main function to update the banner
function updateBanner(animated = false) {
  if (bannerImg) {
    if (animated) {
      animateBannerChange(currentBanner);
    } else {
      bannerImg.src = bannerImages2[currentBanner];
      bannerImg.style.opacity = "1";
    }
  }
}

// If buttons are found
if (prevBtn && nextBtn && bannerImg) {
  prevBtn.addEventListener("click", () => {
    currentBanner =
      (currentBanner - 1 + bannerImages2.length) % bannerImages2.length;
    updateBanner(true);
  });

  nextBtn.addEventListener("click", () => {
    currentBanner = (currentBanner + 1) % bannerImages2.length;
    updateBanner(true);
  });

  // Set initial banner image
  bannerImg.style.opacity = "1";
  bannerImg.style.transition = "opacity 0.5s";
  updateBanner();
}
