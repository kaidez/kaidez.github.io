"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // ts_src/main.ts
  var require_main = __commonJS({
    "ts_src/main.ts"() {
      (() => {
        "use strict";
        function copyrightYear() {
          const footerElement = document.querySelector(".footer-bottom");
          if (!footerElement) {
            console.warn("Footer element not found");
            return;
          }
          const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
          const shortYear = currentYear % 100;
          const paragraphTag = document.createElement("p");
          paragraphTag.innerHTML = `&copy;2008-${shortYear} Kai "kaidez" Gittens. All rights reserved.`;
          footerElement.appendChild(paragraphTag);
        }
        function toggleMobileMenu() {
          const menuToggle = document.querySelector(".mobile-menu-icon");
          const mobileMenu = document.querySelector(".site-nav ul");
          if (!menuToggle || !mobileMenu) {
            console.warn("Mobile menu elements not found");
            return;
          }
          menuToggle.addEventListener("click", () => {
            const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
            menuToggle.setAttribute("aria-expanded", String(!isExpanded));
            mobileMenu.classList.toggle("isVisible");
          });
        }
        function init() {
          copyrightYear();
          toggleMobileMenu();
        }
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", init);
        } else {
          init();
        }
      })();
    }
  });
  require_main();
})();
