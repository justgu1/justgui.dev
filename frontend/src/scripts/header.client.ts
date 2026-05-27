const menuButton =
  document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const navPanel = document.querySelector<HTMLElement>("#primary-nav");
const navLinks = navPanel?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? [];

let lastFocused: HTMLElement | null = null;

function setMenuOpen(open: boolean) {
  if (!menuButton || !navPanel) return;

  menuButton.setAttribute("aria-expanded", String(open));
  navPanel.classList.toggle("is-open", open);
  document.body.classList.toggle("nav-open", open);

  const labelKey = open ? "data-label-close" : "data-label-open";
  const label = menuButton.getAttribute(labelKey);
  if (label) menuButton.setAttribute("aria-label", label);
}

function getFocusable(): HTMLElement[] {
  if (!navPanel) return [];
  return Array.from(
    navPanel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute("disabled"));
}

function trapFocus(event: KeyboardEvent) {
  if (event.key !== "Tab" || !navPanel?.classList.contains("is-open")) return;

  const focusable = getFocusable();
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement as HTMLElement;

  if (event.shiftKey && active === first && last) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last && first) {
    event.preventDefault();
    first.focus();
  }
}

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  if (open) {
    lastFocused = document.activeElement as HTMLElement;
    setMenuOpen(true);
    getFocusable()[0]?.focus();
  } else {
    setMenuOpen(false);
    lastFocused?.focus();
  }
});

document.addEventListener("keydown", (event) => {
  trapFocus(event);

  if (event.key === "Escape" && navPanel?.classList.contains("is-open")) {
    setMenuOpen(false);
    lastFocused?.focus();
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 64rem)").matches) {
      setMenuOpen(false);
    }
  });
});
