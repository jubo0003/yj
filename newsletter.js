// Demo only: native email validation runs before the submit event.
const newsletterForm = document.querySelector(".newsletter-form");
newsletterForm.querySelector("button").disabled = false;
newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  newsletterForm.querySelector(".newsletter-status").textContent =
    "This is a school project demo. Your email has not been submitted or saved.";
});
newsletterForm.querySelector("input").addEventListener("input", () => {
  newsletterForm.querySelector(".newsletter-status").textContent = "";
});
