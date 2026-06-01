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

function mountPreview(slot: HTMLElement): void {
  if (slot.querySelector(".project-preview")) return;

  const src = slot.dataset.previewSrc;
  const alt = slot.dataset.previewAlt ?? "";
  if (!src) return;

  const wrapper = document.createElement("div");
  wrapper.className = "project-preview project-preview--featured";

  const viewport = document.createElement("div");
  viewport.className = "project-preview-viewport";

  const img = document.createElement("img");
  img.className = "project-preview-image";
  img.src = src;
  img.alt = alt;
  img.loading = "lazy";
  img.decoding = "async";
  img.width = 3735;
  img.height = 1844;

  viewport.appendChild(img);
  wrapper.appendChild(viewport);

  slot.appendChild(wrapper);
  slot.removeAttribute("data-preview-src");
}

function hydratePreviewOnOpen(details: HTMLDetailsElement): void {
  if (!details.open) return;
  const slot = details.querySelector<HTMLElement>(
    "[data-project-preview], [data-preview-src]"
  );
  if (slot?.dataset.previewSrc) mountPreview(slot);
}

function bindAccordionDetails(
  root: HTMLElement,
  details: HTMLDetailsElement
): void {
  if (details.dataset.accordionBound === "true") return;
  details.dataset.accordionBound = "true";

  details.addEventListener("toggle", () => {
    if (details.open) {
      closeOtherAccordions(root, details);
      hydratePreviewOnOpen(details);
    }
  });

  if (details.open) {
    hydratePreviewOnOpen(details);
  }
}

function bindAccordionRoot(root: HTMLElement): void {
  root.querySelectorAll<HTMLDetailsElement>("details").forEach((details) => {
    bindAccordionDetails(root, details);
  });
}

function getBatchContainer(accordion: HTMLElement): HTMLElement {
  let batch = document.querySelector<HTMLElement>("[data-projects-batch]");
  if (!batch) {
    batch = document.createElement("div");
    batch.className = "projects-load-batch";
    batch.dataset.projectsBatch = "";
    batch.hidden = true;
    accordion.insertAdjacentElement("afterend", batch);
  }
  return batch;
}

function updateProjectActions(accordion: HTMLElement): void {
  const loadMoreBtn = document.querySelector<HTMLButtonElement>(
    "[data-projects-load-more]"
  );
  const showLessBtn = document.querySelector<HTMLButtonElement>(
    "[data-projects-show-less]"
  );
  const hasPendingBatch = Boolean(
    document.querySelector("[data-projects-batch]")
  );
  const loadedCount = accordion.querySelectorAll(
    "[data-project-load-more-item]"
  ).length;

  if (loadMoreBtn) {
    loadMoreBtn.hidden = !hasPendingBatch;
  }
  if (showLessBtn) {
    showLessBtn.hidden = loadedCount === 0;
  }
}

function initLoadMore(accordion: HTMLElement): void {
  const loadMoreBtn = document.querySelector<HTMLButtonElement>(
    "[data-projects-load-more]"
  );
  if (!loadMoreBtn) return;

  loadMoreBtn.addEventListener("click", () => {
    const batch = document.querySelector<HTMLElement>("[data-projects-batch]");
    if (!batch) {
      updateProjectActions(accordion);
      return;
    }

    const items = batch.querySelectorAll<HTMLDetailsElement>("details");
    items.forEach((details) => {
      details.dataset.projectLoadMoreItem = "true";
      accordion.appendChild(details);
      bindAccordionDetails(accordion, details);
    });
    batch.remove();

    updateProjectActions(accordion);
  });
}

function initShowLess(accordion: HTMLElement): void {
  const showLessBtn = document.querySelector<HTMLButtonElement>(
    "[data-projects-show-less]"
  );
  if (!showLessBtn) return;

  showLessBtn.addEventListener("click", () => {
    const loaded = [
      ...accordion.querySelectorAll<HTMLDetailsElement>(
        "[data-project-load-more-item]"
      ),
    ];
    if (loaded.length === 0) return;

    const batch = getBatchContainer(accordion);
    loaded.forEach((details) => {
      details.open = false;
      details.removeAttribute("data-project-load-more-item");
      batch.appendChild(details);
    });
    batch.hidden = true;

    updateProjectActions(accordion);
    accordion.scrollIntoView({ block: "nearest", behavior: "auto" });
  });
}

function initProjectAccordions(): void {
  document
    .querySelectorAll<HTMLElement>("[data-project-accordion]")
    .forEach((accordion) => {
      bindAccordionRoot(accordion);
      initLoadMore(accordion);
      initShowLess(accordion);
      updateProjectActions(accordion);
    });
}

initProjectAccordions();

document.addEventListener("astro:page-load", initProjectAccordions);
