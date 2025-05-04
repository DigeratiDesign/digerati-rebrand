"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/digerati/skipToMainContent.ts
  var skipToMainContent = () => {
    const trigger = document.querySelector('[dd-skip-to-main-content="trigger"]'), target = document.querySelector('[dd-skip-to-main-content="target"]');
    if (!trigger || !target) {
      return;
    }
    ["click", "keypress"].forEach((event) => {
      trigger.addEventListener(event, (e) => {
        if (e.type === "keydown" && e.which !== 13) {
          return;
        }
        e.preventDefault();
        target.setAttribute("tabindex", "-1");
        target.focus();
      });
    });
  };

  // src/digerati/currentYear.ts
  var currentYear = () => {
    const target = document.querySelector('[dd-date="current-year"]');
    if (!target) {
      return;
    }
    const fullYear = (/* @__PURE__ */ new Date()).getFullYear();
    target.innerText = fullYear.toString();
  };

  // src/digerati/mouseTrail.ts
  var mouseTrail = () => {
    const fxContainer = document.querySelector('[data-fx="mouse-trail"]');
    if (fxContainer) {
      for (let i = 0; i < 750; i++) {
        const fx = document.createElement("i");
        fxContainer.appendChild(fx);
      }
    }
    document.querySelectorAll(".colour-cycle, .preloader").forEach((el) => {
      el.classList.add("is-active");
    });
  };

  // src/digerati/tallyModal.ts
  var tallyModal = () => {
    const openButtons = document.querySelectorAll("[data-open-modal]");
    const modal = document.getElementById("tally-fullscreen");
    const closeBtn = document.getElementById("tally-close");
    const iframe = modal.querySelector("iframe");
    if (!openButtons.length || !modal || !closeBtn || !iframe) {
      return;
    }
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    let previousActiveElement = null;
    function trapFocus(e) {
      const focusableEls = modal.querySelectorAll(focusableSelectors);
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    }
    function openModal() {
      modal.classList.add("is-active");
      document.body.classList.add("no-scroll");
      modal.setAttribute("aria-hidden", "false");
      previousActiveElement = document.activeElement;
      setTimeout(() => {
        closeBtn.focus();
      }, 50);
      document.addEventListener("keydown", handleKeyDown);
    }
    function closeModal() {
      modal.classList.remove("is-active");
      document.body.classList.remove("no-scroll");
      modal.setAttribute("aria-hidden", "true");
      if (previousActiveElement) {
        previousActiveElement.focus();
      }
      document.removeEventListener("keydown", handleKeyDown);
    }
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        closeModal();
      } else {
        trapFocus(e);
      }
    }
    openButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal();
      });
    });
    closeBtn.addEventListener("click", closeModal);
  };

  // src/digerati/testimonialAvatar.ts
  var testimonialAvatar = () => {
    const avatars = document.querySelectorAll(".testimonial_photo");
    if (!avatars) {
      return;
    }
    avatars.forEach((img) => {
      new BreathingHalftone(img, {
        dotSize: 1 / 80,
        dotSizeThreshold: 0.025,
        initVelocity: 0.02,
        oscPeriod: 3,
        oscAmplitude: 0.2,
        isAdditive: false,
        isRadial: false,
        channels: [
          "red",
          "green",
          "blue"
        ],
        isChannelLens: true,
        friction: 0.06,
        hoverDiameter: 0.3,
        hoverForce: -0.02,
        activeDiameter: 0.6,
        activeForce: 0.01
      });
    });
  };

  // src/index.ts
  window.Webflow || [];
  window.Webflow.push(() => {
    skipToMainContent();
    currentYear();
    mouseTrail();
    tallyModal();
    testimonialAvatar();
  });
})();
//# sourceMappingURL=index.js.map
