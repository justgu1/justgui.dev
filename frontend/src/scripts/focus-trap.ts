export function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute("hidden") && el.offsetParent !== null);
}

const PAGE_LAYER_SELECTORS = [
  "header",
  "#main-content",
  ".footer",
  ".floating-actions",
  "#accessibility-panel",
  "[data-welcome-dialog]",
];

export function setPageLayersInert(activeLayer: HTMLElement | null): void {
  PAGE_LAYER_SELECTORS.forEach((selector) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      if (activeLayer && (el === activeLayer || el.contains(activeLayer))) {
        el.removeAttribute("inert");
      } else {
        el.setAttribute("inert", "");
      }
    });
  });
}

export function clearPageLayersInert(): void {
  PAGE_LAYER_SELECTORS.forEach((selector) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      el.removeAttribute("inert");
    });
  });
}

export type FocusTrap = {
  activate: () => void;
  deactivate: () => void;
};

export function createFocusTrap(
  container: HTMLElement,
  options?: { onEscape?: () => void }
): FocusTrap {
  const handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      options?.onEscape?.();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = getFocusable(container);
    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    const active = document.activeElement as HTMLElement;

    if (!container.contains(active)) {
      event.preventDefault();
      first.focus();
      return;
    }

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return {
    activate() {
      setPageLayersInert(container);
      document.addEventListener("keydown", handleKeydown, true);
    },
    deactivate() {
      document.removeEventListener("keydown", handleKeydown, true);
      clearPageLayersInert();
    },
  };
}
