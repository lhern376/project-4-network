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
  const screenOverlay = document.querySelector(
    "[data-js-select-modal-overlay]"
  );

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
      messageContent.focus();
    }
  });

  /**
   * ---- Post functionality
   *
   * - makes post message interactive
   * - sends post message
   * - displays errors if any or reloads the page if no errors
   *
   */

  const messageWrapper = document.querySelector(
    "[data-js-select-write-message-wrapper]"
  );
  const messageContent = document.querySelector(
    "[data-js-select-message-content]"
  );
  const messagePlaceholder = document.querySelector(
    "[data-js-select-message-placeholder]"
  );
  const formPostButton = document.querySelector(
    "[data-js-select-form-post-button]"
  );
  const charRemaining = document.querySelector("[data-js-select-char-left]");

  let formatted_message = "";
  const MAX_CHAR = 280;
  let prevFormat = ""; // temp variable that holds previous formatting class ('few-left', 'zero-left')

  // https://codepen.io/sinfullycoded/details/oNLBJpm (--NOT NEEDED-- but interesting example)
  // --> Set cursor at end of elements demo: Content Editable Div with Child nodes, and TextArea, and Input element

  /* ---------------------------------------------------- interactivity */

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

  // - constructs 'formatted_message'
  // - updates 'char-left' according to 'formatted_message' length
  // - disables formPostButton if 'formatted_message' exceeds 280 in length
  // - disables formPostButton if message content is blank or only whitespace
  // - hides placeholder if anything is typed into message (general case)
  messageContent.addEventListener("input", () => {
    let content = messageContent.textContent;
    formatted_message = messageContent.innerHTML
      .replaceAll("<br>", "\n")
      .replaceAll("&nbsp;", " ")
      .trimEnd();
    let l = formatted_message.length;

    // update 'char-left' element
    charRemaining.textContent = MAX_CHAR - l;
    if (MAX_CHAR - l < 0) {
      if (prevFormat) charRemaining.classList.remove(prevFormat);
      charRemaining.classList.add("zero-left");
      prevFormat = "zero-left";
    } else if (MAX_CHAR - l < 21) {
      if (prevFormat) charRemaining.classList.remove(prevFormat);
      charRemaining.classList.add("few-left");
      prevFormat = "few-left";
    } else {
      if (prevFormat) {
        charRemaining.classList.remove(prevFormat);
        prevFormat = "";
      }
    }

    // hide placeholder message
    if (content !== "") messagePlaceholder.classList.add("hide");

    // disable/enable post button
    if (l > MAX_CHAR) {
      formPostButton.disabled = true;
      formPostButton.classList.add("disabled");
      return;
    }

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
    charRemaining.textContent = MAX_CHAR;
    if (prevFormat) {
      charRemaining.classList.remove(prevFormat);
      prevFormat = "";
    }
  }

  /* ---------------------------------------------------- send post message */

  const csrftoken = document.querySelector("#csrftoken input").value;

  async function postData(url, data, csrftoken) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        mode: "same-origin", // assures that csrf token is not sent to another domain
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // I expect json sent from the view
        const data = await response.json();
        console.log(data["message"]);
        window.location.reload();
      }
    } catch (error) {
      console.error(`${error}`);
    }
  }

  formPostButton.addEventListener("click", (e) => {
    postData("/post", { post: formatted_message }, csrftoken);
    window.location.reload();
  });
});
