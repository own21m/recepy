// Enhances the existing URL-fragment dialogs without changing their routes or data.
export function mountRecipeModals(doc, win) {
  let active = null;
  let trigger = null;
  let saved = [];
  let originalModal = null;
  let addedTabindex = false;
  let bodyOverflow = "";
  let frame = null;
  const enhanced = new Set();
  const selector =
    'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex="0"]';
  const focusable = () =>
    Array.from(active?.querySelectorAll(selector) || []).filter(
      (item) =>
        !item.hidden && !item.matches(":disabled") && item.getClientRects().length,
    );
  function restore(restoreFocus) {
    if (!active) return;
    const previous = active;
    active = null;
    previous.removeAttribute("data-recepy-open");
    for (const [item, inert, hidden] of saved) {
      item.inert = inert;
      if (hidden === null) item.removeAttribute("aria-hidden");
      else item.setAttribute("aria-hidden", hidden);
    }
    saved = [];
    if (originalModal === null) previous.removeAttribute("aria-modal");
    else previous.setAttribute("aria-modal", originalModal);
    if (addedTabindex) previous.removeAttribute("tabindex");
    doc.body.style.overflow = bodyOverflow;
    if (restoreFocus && trigger?.isConnected) trigger.focus({ preventScroll: true });
  }
  function sync() {
    for (const dialog of doc.querySelectorAll('[role="dialog"]')) {
      dialog.setAttribute("data-recepy-modal", "ready");
      enhanced.add(dialog);
    }
    let id = "";
    try {
      id = decodeURIComponent(win.location.hash.slice(1));
    } catch {
      /* malformed fragments are not dialogs */
    }
    const candidate = id ? doc.getElementById(id) : null;
    const next = candidate?.getAttribute("role") === "dialog" ? candidate : null;
    if (next === active) return;
    restore(!next);
    if (!next) return;
    if (!trigger?.isConnected || next.contains(trigger)) trigger = doc.activeElement;
    active = next;
    originalModal = active.getAttribute("aria-modal");
    addedTabindex = !active.hasAttribute("tabindex");
    bodyOverflow = doc.body.style.overflow;
    active.setAttribute("aria-modal", "true");
    active.setAttribute("data-recepy-open", "true");
    if (addedTabindex) active.setAttribute("tabindex", "-1");
    // Keep the active dialog's ancestors interactive; isolate their siblings instead.
    for (
      let branch = active;
      branch && branch !== doc.body;
      branch = branch.parentElement
    ) {
      for (const sibling of Array.from(branch.parentElement?.children || [])) {
        if (sibling === branch || /^(SCRIPT|STYLE|LINK)$/.test(sibling.tagName)) continue;
        saved.push([
          sibling,
          Boolean(sibling.inert),
          sibling.getAttribute("aria-hidden"),
        ]);
        sibling.inert = true;
        sibling.setAttribute("aria-hidden", "true");
      }
    }
    doc.body.style.overflow = "hidden";
    (focusable()[0] || active).focus({ preventScroll: true });
  }
  function schedule() {
    if (frame !== null) win.cancelAnimationFrame(frame);
    frame = win.requestAnimationFrame(() => {
      frame = null;
      sync();
    });
  }
  function onClick(event) {
    const link = event.target.closest?.('a[href*="#"]');
    if (!link) return;
    let destination;
    try {
      destination = new URL(link.href, win.location.href);
    } catch {
      return;
    }
    if (
      destination.origin !== win.location.origin ||
      destination.pathname !== win.location.pathname
    )
      return;
    const id = destination.hash.slice(1);
    if (id && doc.getElementById(id)?.getAttribute("role") === "dialog") {
      trigger = link;
      // Next Link's pushState does not reliably update CSS :target. Treat this
      // same-page action as a real fragment navigation and explicitly reveal it.
      event.preventDefault();
      win.location.hash = destination.hash;
      sync();
    }
  }
  function onKey(event) {
    if (!active) return;
    if (event.key === "Escape") {
      event.preventDefault();
      win.location.hash = "";
      sync();
      return;
    }
    if (event.key !== "Tab") return;
    const items = focusable();
    const first = items[0];
    const last = items.at(-1);
    if (!first) {
      event.preventDefault();
      active.focus();
      return;
    }
    if (event.shiftKey && (doc.activeElement === first || doc.activeElement === active)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && doc.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  function onFocus(event) {
    if (active && !active.contains(event.target))
      (focusable()[0] || active).focus({ preventScroll: true });
  }
  doc.addEventListener("click", onClick, true);
  doc.addEventListener("keydown", onKey);
  doc.addEventListener("focusin", onFocus);
  win.addEventListener("hashchange", schedule);
  win.addEventListener("popstate", schedule);
  const observer = new win.MutationObserver(schedule);
  observer.observe(doc.body, { childList: true, subtree: true });
  sync();
  return {
    sync,
    destroy() {
      observer.disconnect();
      if (frame !== null) win.cancelAnimationFrame(frame);
      doc.removeEventListener("click", onClick, true);
      doc.removeEventListener("keydown", onKey);
      doc.removeEventListener("focusin", onFocus);
      win.removeEventListener("hashchange", schedule);
      win.removeEventListener("popstate", schedule);
      restore(false);
      for (const dialog of enhanced) dialog.removeAttribute("data-recepy-modal");
    },
  };
}
