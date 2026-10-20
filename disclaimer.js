// Simple browser-only gate, not secure access control.
// Remember successful entry for this tab, including page refreshes.
const disclaimerStorageKey = "yori-jomo-disclaimer-password-v1";
const disclaimer = document.querySelector(".disclaimer");
const passwordInput = document.querySelector("#disclaimer-password");
const passwordError = document.querySelector("#disclaimer-error");

disclaimer.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (passwordInput.value !== "ekek") {
    passwordError.hidden = false;
    passwordInput.setAttribute("aria-invalid", "true");
    passwordInput.focus();
    passwordInput.select();
    return;
  }
  passwordInput.value = "";
  disclaimer.close();
});

passwordInput.addEventListener("input", () => {
  passwordError.hidden = true;
  passwordInput.removeAttribute("aria-invalid");
});

disclaimer.addEventListener("cancel", (event) => {
  // Require the acknowledgement button instead of Escape.
  event.preventDefault();
});

disclaimer.addEventListener("close", () => {
  try {
    sessionStorage.setItem(disclaimerStorageKey, "true");
  } catch {
    // Visitors can still enter if their browser blocks storage.
  }
  document.body.classList.remove("disclaimer-pending");
  document.querySelector(".logo").focus({ preventScroll: true });
});

// Keep keyboard focus between the password field and entry button.
disclaimer.addEventListener("keydown", (event) => {
  const button = disclaimer.querySelector("button");
  if (event.key === "Tab" && event.shiftKey && document.activeElement === passwordInput) {
    event.preventDefault();
    button.focus();
  } else if (event.key === "Tab" && !event.shiftKey && document.activeElement === button) {
    event.preventDefault();
    passwordInput.focus();
  }
});

let acknowledged = false;
try {
  acknowledged = sessionStorage.getItem(disclaimerStorageKey) === "true";
} catch {
  // If storage is unavailable, show the notice normally.
}

if (acknowledged) {
  document.body.classList.remove("disclaimer-pending");
} else {
  disclaimer.showModal();
}
