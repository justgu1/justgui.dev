function closeOtherAccordions(
  root: HTMLElement,
  current: HTMLDetailsElement
): void {
  root.querySelectorAll<HTMLDetailsElement>("details").forEach((item) => {
    if (item !== current) {
      item.open = false;
    }
  });
}

function initProjectAccordions(): void {
  document
    .querySelectorAll<HTMLElement>("[data-project-accordion]")
    .forEach((root) => {
      root
        .querySelectorAll<HTMLDetailsElement>("details")
        .forEach((details) => {
          details.addEventListener("toggle", () => {
            if (details.open) {
              closeOtherAccordions(root, details);
            }
          });
        });
    });
}

initProjectAccordions();

document.addEventListener("astro:page-load", initProjectAccordions);
