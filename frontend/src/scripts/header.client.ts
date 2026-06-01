const menuButton =
  document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const navPanel = document.querySelector<HTMLElement>("#primary-nav");
const navList = navPanel?.querySelector<HTMLElement>(".header-nav-list");
const navLinks = navList
  ? Array.from(navList.querySelectorAll<HTMLAnchorElement>("a[href]"))
  : [];

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
      'a[href], button:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
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

function isVerticalNav(): boolean {
  return window.matchMedia("(max-width: 64rem)").matches;
}

function initRovingTabindex(): void {
  navLinks.forEach((link, index) => {
    link.tabIndex = index === 0 ? 0 : -1;
  });
}

function focusNavLink(index: number): boolean {
  if (index < 0 || index >= navLinks.length) return false;
  navLinks.forEach((link, i) => {
    link.tabIndex = i === index ? 0 : -1;
  });
  navLinks[index]?.focus();
  return true;
}

function moveNavFocus(direction: "prev" | "next"): boolean {
  const activeIndex = navLinks.findIndex(
    (link) => link === document.activeElement
  );
  const currentIndex =
    activeIndex >= 0
      ? activeIndex
      : navLinks.findIndex((link) => link.tabIndex === 0);
  if (currentIndex < 0) return false;

  const delta = direction === "next" ? 1 : -1;
  return focusNavLink(currentIndex + delta);
}

function navArrowDirection(
  key: string
): "prev" | "next" | "home" | "end" | null {
  const vertical = isVerticalNav() && navPanel?.classList.contains("is-open");

  if (key === "Home") return "home";
  if (key === "End") return "end";

  const nextKeys = vertical
    ? ["ArrowDown", "ArrowRight"]
    : ["ArrowRight", "ArrowDown"];
  const prevKeys = vertical
    ? ["ArrowUp", "ArrowLeft"]
    : ["ArrowLeft", "ArrowUp"];

  if (nextKeys.includes(key)) return "next";
  if (prevKeys.includes(key)) return "prev";
  return null;
}

function handleNavArrows(event: KeyboardEvent): void {
  if (navLinks.length === 0) return;

  const inNavList = navList?.contains(document.activeElement) ?? false;
  const activeIsNavLink = navLinks.some(
    (link) => link === document.activeElement
  );
  if (!inNavList && !activeIsNavLink) return;

  const direction = navArrowDirection(event.key);
  if (!direction) return;

  let moved = false;
  if (direction === "home") moved = focusNavLink(0);
  else if (direction === "end") moved = focusNavLink(navLinks.length - 1);
  else moved = moveNavFocus(direction);

  if (moved) event.preventDefault();
}

function handleClickOutside(event: PointerEvent): void {
  if (!navPanel?.classList.contains("is-open")) return;
  const target = event.target as Node;
  if (navPanel.contains(target) || menuButton?.contains(target)) return;
  setMenuOpen(false);
  lastFocused?.focus();
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
  handleNavArrows(event);

  if (event.key === "Escape" && navPanel?.classList.contains("is-open")) {
    setMenuOpen(false);
    lastFocused?.focus();
  }
});

document.addEventListener("pointerdown", handleClickOutside);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 64rem)").matches) {
      setMenuOpen(false);
    }
  });
  link.addEventListener("focus", () => {
    const index = navLinks.indexOf(link);
    if (index >= 0) focusNavLink(index);
  });
});

initRovingTabindex();
