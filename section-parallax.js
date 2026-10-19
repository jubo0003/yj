// Move the whole About composition together, without changing its layout space.
const parallaxSection = document.querySelector(".story");
const sectionMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

if (parallaxSection) {
  let frame = 0;
  let offset = 0;

  function updateSectionParallax() {
    frame = 0;
    if (sectionMotionPreference.matches) return;
    const bounds = parallaxSection.getBoundingClientRect();
    // Remove the previous transform from our measurement to avoid feedback.
    const naturalTop = bounds.top - offset;
    const progress = Math.max(-1, Math.min(1,
      (window.innerHeight - naturalTop * 2 - bounds.height) /
      (window.innerHeight + bounds.height)
    ));
    // Mobile has no trailing section gap: drift toward, never past, its resting position.
    offset = window.innerWidth <= 700 ? (progress - 1) * 10 : progress * 40;
    parallaxSection.style.setProperty("--section-drift", `${offset}px`);
  }

  function requestSectionParallax() {
    if (!frame && !sectionMotionPreference.matches) {
      frame = requestAnimationFrame(updateSectionParallax);
    }
  }

  function setSectionMotionPreference() {
    cancelAnimationFrame(frame);
    frame = 0;
    offset = 0;
    parallaxSection.style.removeProperty("--section-drift");
    requestSectionParallax();
  }

  window.addEventListener("scroll", requestSectionParallax, { passive: true });
  window.addEventListener("resize", requestSectionParallax);
  window.addEventListener("load", requestSectionParallax);
  sectionMotionPreference.addEventListener("change", setSectionMotionPreference);
  requestSectionParallax();
}
