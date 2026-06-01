const SCROLL_THRESHOLD = 400;
const backToTop =
  document.querySelector<HTMLButtonElement>("[data-back-to-top]");
const floatingRoot = document.querySelector<HTMLElement>(".floating-actions");
const footer = document.querySelector<HTMLElement>(".footer");

const BASE_OFFSET = 16;
const FOOTER_GAP = 12;

function updateFloatingVisibility(): void {
  if (!floatingRoot) return;
  const visible = window.scrollY >= SCROLL_THRESHOLD;
  floatingRoot.classList.toggle("floating-actions--visible", visible);
  floatingRoot.setAttribute("aria-hidden", visible ? "false" : "true");
  floatingRoot.querySelectorAll<HTMLElement>("a, button").forEach((el) => {
    if (visible) el.removeAttribute("tabindex");
    else el.setAttribute("tabindex", "-1");
  });
}

function updateFooterPin(): void {
  if (!footer) return;
  footer.classList.toggle("footer--pinned", window.scrollY > 0);
}

function updateFloatingOffset(): void {
  if (!floatingRoot || !footer) return;

  if (window.scrollY === 0) {
    floatingRoot.style.setProperty(
      "--floating-bottom",
      `max(${BASE_OFFSET}px, env(safe-area-inset-bottom))`
    );
    return;
  }

  const footerRect = footer.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  if (footer.classList.contains("footer--pinned")) {
    const aboveFooter = footerRect.height + FOOTER_GAP;
    floatingRoot.style.setProperty("--floating-bottom", `${aboveFooter}px`);
    return;
  }

  if (footerRect.top < viewportHeight) {
    const aboveFooter = viewportHeight - footerRect.top + FOOTER_GAP;
    floatingRoot.style.setProperty("--floating-bottom", `${aboveFooter}px`);
  } else {
    floatingRoot.style.setProperty(
      "--floating-bottom",
      `max(${BASE_OFFSET}px, env(safe-area-inset-bottom))`
    );
  }
}

function scrollToTop(): void {
  const reduce =
    document.documentElement.dataset.a11yMotion === "reduce" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

function onScrollOrResize(): void {
  updateFooterPin();
  updateFloatingVisibility();
  updateFloatingOffset();
}

backToTop?.addEventListener("click", scrollToTop);
window.addEventListener("scroll", onScrollOrResize, { passive: true });
window.addEventListener("resize", onScrollOrResize, { passive: true });

onScrollOrResize();
