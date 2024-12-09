document.addEventListener("DOMContentLoaded", () => {
  /**
   * ---- Modal functionality ----
   *
   * - Closes and opens modal
   *
   */

  const body = document.querySelector("body");
  const screenOverlay = document.querySelector(".modal-overlay");
  const screenOverlayInnerChild = document.querySelector(".modal-set-height");
  const svgPath = document.querySelector(".close-button path");
  const closeButton = document.querySelector(".close-button");

  // - gets all nested elements in '.close-button' (need to check all to close modal properly)
  const nestedElements = [svgPath];
  let pointer = svgPath;
  while (true) {
    pointer = pointer.parentElement;
    nestedElements.push(pointer);
    if (pointer === closeButton) break;
  }

  const getCloseBtnNestedElements = (svgPath, closeButton) => {};

  // - adds overlay and disables scrolling
  document.querySelector(".post-button").addEventListener("click", () => {
    screenOverlay.classList.remove("hide");
    body.classList.add("stop-scrolling");
  });

  // - removes overlay and enables scrolling
  document.addEventListener("click", (e) => {
    // listen to entire document for below targets
    let elem = e.target;
    // console.log(elem);
    if (elem === screenOverlay || elem === screenOverlayInnerChild) {
      screenOverlay.classList.add("hide");
      body.classList.remove("stop-scrolling");
      resetPost();
    } else {
      for (const child of nestedElements) {
        if (elem === child) {
          screenOverlay.classList.add("hide");
          body.classList.remove("stop-scrolling");
          resetPost();
          break;
        }
      }
    }
  });

  /**
   * ---- Post-reply functionality ----
   *
   * - makes post message user-friendly
   *
   */

  const messageWrapper = document.querySelector(".write-message-wrapper");
  const messageContent = document.querySelector(".message-content");
  const messagePlaceholder = document.querySelector(".message-placeholder");
  const formPostButton = document.querySelector(".form-post-button");
  const postButton = document.querySelector(".post-button");

  // https://codepen.io/sinfullycoded/details/oNLBJpm (--NOT NEEDED-- but interesting example)
  // --> Set cursor at end of elements demo: Content Editable Div with Child nodes, and TextArea, and Input element

  // - makes messageContent active by default when opening the post modal
  postButton.addEventListener("click", () => {
    messageContent.focus();
  });

  // - makes messageContent active when clicking on messageWrapper
  messageWrapper.addEventListener("click", (e) => {
    messageContent.focus();
  });

  // - hides the placeholder message when typing enter with an empty message (special case)
  messageContent.addEventListener("keydown", (e) => {
    let content = messageContent.textContent;
    let code = e.code;
    if (code === "Enter" && content === "") {
      // console.log("keydown");
      messagePlaceholder.classList.add("hide");
    }
  });

  // - shows placeholder message if message content is blank
  messageContent.addEventListener("keyup", (e) => {
    let inner_html = messageContent.innerHTML;
    let code = e.code;
    if (code === "Backspace" && inner_html === "") {
      // console.log("keyup");
      messagePlaceholder.classList.remove("hide");
    }
  });

  // - disables formPostButton if message content is blank or only whitespace
  // - hides placeholder if anything is typed into message (general case)
  messageContent.addEventListener("input", () => {
    let content = messageContent.textContent;

    if (content !== "") messagePlaceholder.classList.add("hide");

    if (content !== "" && content.trim() !== "") {
      formPostButton.disabled = false;
      formPostButton.classList.remove("disabled");
    } else {
      formPostButton.disabled = true;
      formPostButton.classList.add("disabled");
    }
  });

  // - reset post upon exiting modal (used on '---- Modal functionality ----')
  // - hoisted function
  function resetPost() {
    messageContent.innerHTML = "";
    messagePlaceholder.classList.remove("hide");
    formPostButton.disabled = true;
    formPostButton.classList.add("disabled");
  }
});
