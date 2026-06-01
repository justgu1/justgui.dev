import {
  applyAccessibilityPreferences,
  initAccessibilityPreferences,
  loadAccessibilityPreferences,
  resetAccessibilityPreferences,
  saveAccessibilityPreferences,
  type AccessibilityPreferences,
} from "./accessibility-preferences";
import { readA11yForm, syncA11yForm } from "./a11y-form";
import { createFocusTrap, getFocusable } from "./focus-trap";

const panel = document.getElementById("accessibility-panel");
const openButton = document.querySelector<HTMLButtonElement>(
  "[data-a11y-panel-open]"
);
const closeButton = document.querySelector<HTMLButtonElement>(
  "[data-a11y-panel-close]"
);
const panelForm = panel?.querySelector<HTMLElement>("[data-a11y-form]");
const resetButton =
  panel?.querySelector<HTMLButtonElement>("[data-a11y-reset]");
const langRoot = document.querySelector<HTMLElement>("[data-footer-lang]");
const langToggle = document.querySelector<HTMLButtonElement>(
  "[data-footer-lang-toggle]"
);
const langList = document.querySelector<HTMLElement>("[data-footer-lang-list]");
const langOptions =
  langList?.querySelectorAll<HTMLElement>("[data-footer-lang-option]") ?? [];

let lastFocused: HTMLElement | null = null;
let prefs = initAccessibilityPreferences();
let panelFocusTrap: ReturnType<typeof createFocusTrap> | null = null;

function syncForm(p: AccessibilityPreferences): void {
  if (!panelForm) return;
  syncA11yForm(panelForm, p);
}

function schedulePanelReposition(): void {
  if (!panel || panel.hidden || !openButton) return;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      positionPanelAnchored();
    });
  });
}

function persistFromForm(): void {
  if (!panelForm) return;
  prefs = readA11yForm(panelForm);
  applyAccessibilityPreferences(prefs);
  saveAccessibilityPreferences(prefs);
  schedulePanelReposition();
}

function positionPanelAnchored(): void {
  if (!panel || !openButton) return;

  panel.style.visibility = "hidden";
  panel.style.top = "0";
  panel.style.left = "0";
  panel.style.right = "auto";
  panel.style.maxHeight = "";

  const btnRect = openButton.getBoundingClientRect();
  const gap = 12;
  const margin = 16;

  const spaceAbove = btnRect.top - margin - gap;
  if (spaceAbove < 120) {
    panel.style.maxHeight = `${Math.max(120, spaceAbove)}px`;
  }

  const panelRect = panel.getBoundingClientRect();
  const panelHeight = panelRect.height;
  const panelWidth = panelRect.width;

  let top = btnRect.top - panelHeight - gap;
  top = Math.max(margin, top);

  let left = btnRect.right - panelWidth;
  left = Math.min(
    Math.max(margin, left),
    window.innerWidth - panelWidth - margin
  );

  panel.style.top = `${top}px`;
  panel.style.left = `${left}px`;
  panel.style.visibility = "";
}

function positionPanelCentered(): void {
  if (!panel) return;

  panel.style.visibility = "hidden";
  panel.style.top = "0";
  panel.style.left = "0";
  panel.style.right = "auto";
  panel.style.maxHeight = "min(70vh, 32rem)";

  const margin = 16;
  const panelRect = panel.getBoundingClientRect();
  const top = Math.max(margin, (window.innerHeight - panelRect.height) / 2);
  const left = Math.max(margin, (window.innerWidth - panelRect.width) / 2);

  panel.style.top = `${top}px`;
  panel.style.left = `${left}px`;
  panel.style.visibility = "";
}

function openPanel(options?: { centered?: boolean }): void {
  if (!panel) return;

  lastFocused = document.activeElement as HTMLElement;
  panel.hidden = false;
  openButton?.setAttribute("aria-expanded", "true");
  syncForm(loadAccessibilityPreferences());

  if (options?.centered || !openButton) {
    positionPanelCentered();
  } else {
    positionPanelAnchored();
  }

  panelFocusTrap?.deactivate();
  panelFocusTrap = createFocusTrap(panel, { onEscape: closePanel });
  panelFocusTrap.activate();
  getFocusable(panel)[0]?.focus();
}

function closePanel(): void {
  if (!panel) return;

  panel.hidden = true;
  openButton?.setAttribute("aria-expanded", "false");
  panelFocusTrap?.deactivate();
  panelFocusTrap = null;

  const welcomeOpen = document.querySelector<HTMLElement>(
    "[data-welcome-dialog]:not([hidden])"
  );
  if (welcomeOpen) {
    const welcomePanel = welcomeOpen.querySelector<HTMLElement>(
      ".welcome-dialog-panel"
    );
    welcomePanel?.focus();
  } else {
    lastFocused?.focus();
  }
}

function isLangOpen(): boolean {
  return langList ? !langList.hidden : false;
}

function openLang(): void {
  if (!langList || !langToggle) return;
  langList.hidden = false;
  langToggle.setAttribute("aria-expanded", "true");
  const selected =
    langList.querySelector<HTMLElement>('[aria-selected="true"]') ??
    langOptions[0];
  selected?.focus();
}

function closeLang(): void {
  if (!langList || !langToggle) return;
  langList.hidden = true;
  langToggle.setAttribute("aria-expanded", "false");
}

function moveLangFocus(direction: "prev" | "next"): void {
  const options = Array.from(langOptions);
  const activeIndex = options.findIndex((o) => o === document.activeElement);
  if (activeIndex === -1) return;
  const delta = direction === "next" ? 1 : -1;
  const next = options[activeIndex + delta];
  if (!next) return;
  options.forEach((o) => o.setAttribute("tabindex", "-1"));
  next.setAttribute("tabindex", "0");
  next.focus();
}

function selectLangOption(option: HTMLElement): void {
  const href = option.dataset.langHref;
  if (href && href !== window.location.pathname) {
    window.location.assign(href);
  } else {
    closeLang();
    langToggle?.focus();
  }
}

function handleClickOutside(event: PointerEvent): void {
  const target = event.target as Node;

  if (
    panel &&
    !panel.hidden &&
    !panel.contains(target) &&
    !openButton?.contains(target)
  ) {
    closePanel();
  }

  if (isLangOpen() && langRoot && !langRoot.contains(target)) {
    closeLang();
  }
}

openButton?.addEventListener("click", () => {
  if (panel && !panel.hidden) {
    closePanel();
  } else {
    openPanel();
  }
});
closeButton?.addEventListener("click", closePanel);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (panel && !panel.hidden) {
      closePanel();
      return;
    }
    if (isLangOpen()) {
      closeLang();
      langToggle?.focus();
    }
  }
});

document.addEventListener("pointerdown", handleClickOutside);

panelForm?.addEventListener("change", persistFromForm);

resetButton?.addEventListener("click", () => {
  prefs = resetAccessibilityPreferences();
  syncForm(prefs);
  schedulePanelReposition();
});

langToggle?.addEventListener("click", () => {
  if (isLangOpen()) {
    closeLang();
  } else {
    openLang();
  }
});

langOptions.forEach((option) => {
  option.addEventListener("click", () => selectLangOption(option));
  option.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectLangOption(option);
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveLangFocus("next");
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveLangFocus("prev");
    }
    if (event.key === "Escape") {
      closeLang();
      langToggle?.focus();
    }
  });
});

window.addEventListener("resize", () => {
  if (panel && !panel.hidden) {
    if (openButton) {
      schedulePanelReposition();
    } else {
      positionPanelCentered();
    }
  }
});

window.addEventListener(
  "scroll",
  () => {
    if (panel && !panel.hidden && openButton) schedulePanelReposition();
  },
  { passive: true }
);

syncForm(prefs);

export function openAccessibilityPanelFromWelcome(): void {
  openPanel({ centered: true });
}
