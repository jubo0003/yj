// Remember acknowledgement for this tab’s session, including page refreshes.
const disclaimerStorageKey = "yori-jomo-disclaimer-acknowledged";
const disclaimer = document.querySelector(".disclaimer");

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

// This dialog has one control; keep Tab and Shift+Tab on that button.
disclaimer.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    disclaimer.querySelector("button").focus();
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
