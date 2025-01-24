// Index

//  * ---- Helper Functions

//  * ---- Close-any-modal

//  * ---- Open Post Modal

//  * ---- Post functionality

/* ------------------------------------------------------------------------------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  /**
   * ---- Helper Functions
   *
   */

  function onOpenModal() {
    // - adds overlay and disables scrolling
    screenOverlay.classList.remove("hide");
    body.classList.add("stop-scrolling");
  }

  function onCloseModal() {
    // - removes overlay and enables scrolling
    screenOverlay.classList.add("hide");
    body.classList.remove("stop-scrolling");
  }

  /**
   * ---- Close-any-modal
   *
   * - Closes any modal
   * - Elements that close modal contain the data attribute data-js-close-modal
   *
   */

  const body = document.querySelector("body");
  const screenOverlay = document.querySelector(".modal-overlay");

  document.addEventListener("click", (e) => {
    const elem = e.target;
    if (elem.hasAttribute("data-js-close-modal")) {
      onCloseModal();
      // reset post, reset sign up, reset sign in
      resetPost();
    }
  });

  /**
   * ---- Open Post Modal
   *
   * - Opens post modal
   * - Elements that open post modal contain the data attribute data-js-open-post-modal
   *
   */

  document.addEventListener("click", (e) => {
    const elem = e.target;
    if (elem.hasAttribute("data-js-open-post-modal")) {
      onOpenModal();
    }
  });

  /**
   * ---- Post functionality
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
  messageWrapper.addEventListener("click", () => {
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

  // - reset post
  // - used upon exiting modal (found on section: '---- Modal functionality ----')
  // - hoisted function
  function resetPost() {
    messageContent.innerHTML = "";
    messagePlaceholder.classList.remove("hide");
    formPostButton.disabled = true;
    formPostButton.classList.add("disabled");
  }
});
