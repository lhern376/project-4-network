/**
 * >> Post button functionality
 *
 */

body = document.querySelector("body");
screenOverlay = document.querySelector(".write-post-overlay");

// - adds overlay and disables scrolling
document.querySelector(".post-button").addEventListener("click", () => {
  console.log("working");
  screenOverlay.classList.remove("hide");
  body.classList.add("stop-scrolling");
});

// - removes overlay and enables scrolling
screenOverlay.addEventListener("click", (e) => {
  console.log("working");
  if (e.target === screenOverlay) {
    screenOverlay.classList.add("hide");
    body.classList.remove("stop-scrolling");
  }
});
