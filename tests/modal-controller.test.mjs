import assert from "node:assert/strict";
import test from "node:test";
import { mountRecipeModals } from "../lib/modal-controller.mjs";

function fixture(hash = "") {
  const listeners = new Map();
  const winListeners = new Map();
  const doc = {
    activeElement: null,
    addEventListener(type, callback) {
      listeners.set(type, callback);
    },
    removeEventListener(type) {
      listeners.delete(type);
    },
    getElementById(id) {
      return nodes.find((node) => node.id === id && node.isConnected) || null;
    },
    querySelectorAll() {
      return nodes.filter((node) => node.getAttribute("role") === "dialog");
    },
  };
  class Element {
    constructor(tag, attributes = {}) {
      this.tagName = tag.toUpperCase();
      this.attributes = new Map(Object.entries(attributes));
      this.children = [];
      this.parentElement = null;
      this.inert = false;
      this.hidden = false;
      this.isConnected = true;
      this.style = {};
    }
    get id() {
      return this.getAttribute("id");
    }
    get href() {
      return this.getAttribute("href");
    }
    append(...items) {
      for (const child of items) {
        child.parentElement = this;
        this.children.push(child);
      }
    }
    getAttribute(name) {
      return this.attributes.get(name) ?? null;
    }
    setAttribute(name, value) {
      this.attributes.set(name, value);
    }
    removeAttribute(name) {
      this.attributes.delete(name);
    }
    hasAttribute(name) {
      return this.attributes.has(name);
    }
    contains(item) {
      return item === this || this.children.some((child) => child.contains(item));
    }
    getClientRects() {
      return this.hidden ? [] : [{}];
    }
    matches(selector) {
      return selector === ":disabled" && this.hasAttribute("disabled");
    }
    closest() {
      return this.tagName === "A" ? this : this.parentElement?.closest();
    }
    querySelectorAll() {
      const found = [];
      const scan = (node) => {
        for (const child of node.children) {
          if (["A", "BUTTON", "INPUT"].includes(child.tagName)) found.push(child);
          scan(child);
        }
      };
      scan(this);
      return found;
    }
    focus() {
      doc.activeElement = this;
      listeners.get("focusin")?.({ target: this });
    }
  }
  const body = new Element("body");
  body.style.overflow = "auto";
  doc.body = body;
  const header = new Element("header", { "aria-hidden": "false" });
  header.inert = true;
  const main = new Element("main");
  const content = new Element("section");
  const opener = new Element("a", { href: "/home/lobby#recipe" });
  const secondOpener = new Element("a", { href: "/home/lobby#profile" });
  const outside = new Element("button");
  content.append(opener, secondOpener, outside);
  const modal = new Element("div", { id: "recipe", role: "dialog" });
  const close = new Element("a", { href: "#" });
  const disabled = new Element("button", { disabled: "" });
  const hidden = new Element("input");
  hidden.hidden = true;
  const save = new Element("button");
  modal.append(close, disabled, hidden, save);
  const profile = new Element("div", {
    id: "profile",
    role: "dialog",
    tabindex: "-1",
    "aria-modal": "false",
  });
  const profileClose = new Element("a", { href: "#" });
  profile.append(profileClose);
  main.append(content, modal, profile);
  const footer = new Element("footer");
  body.append(header, main, footer);
  const nodes = [
    body,
    header,
    main,
    content,
    opener,
    secondOpener,
    outside,
    modal,
    close,
    disabled,
    hidden,
    save,
    profile,
    profileClose,
    footer,
  ];
  const location = {
    hash,
    origin: "http://local.test",
    pathname: "/home/lobby",
    search: "?demo=1",
    get href() {
      return "http://local.test" + this.pathname + this.search + this.hash;
    },
  };
  const win = {
    location,
    history: {
      replaceState(_state, _title, url) {
        location.hash = new URL(url, location.href).hash;
      },
    },
    addEventListener(type, cb) {
      winListeners.set(type, cb);
    },
    removeEventListener(type) {
      winListeners.delete(type);
    },
    requestAnimationFrame(cb) {
      this.frame = cb;
      return 1;
    },
    cancelAnimationFrame() {
      this.frame = null;
    },
    MutationObserver: class {
      observe() {}
      disconnect() {}
    },
  };
  doc.activeElement = opener;
  const controller = mountRecipeModals(doc, win);
  function open(id, trigger = opener) {
    const event = {
      target: trigger,
      prevented: false,
      preventDefault() {
        this.prevented = true;
      },
    };
    listeners.get("click")(event);
    assert.equal(event.prevented, true);
    location.hash = "#" + id;
    controller.sync();
  }
  function key(key, shiftKey = false) {
    const event = {
      key,
      shiftKey,
      prevented: false,
      preventDefault() {
        this.prevented = true;
      },
    };
    listeners.get("keydown")(event);
    return event;
  }
  return {
    doc,
    win,
    controller,
    listeners,
    winListeners,
    body,
    header,
    content,
    opener,
    secondOpener,
    outside,
    modal,
    close,
    save,
    profile,
    profileClose,
    footer,
    open,
    key,
  };
}

test("un fragmento común o mal formado no convierte la página en un modal", () => {
  const f = fixture("#%E0%A4%A");
  assert.equal(f.body.style.overflow, "auto");
  assert.equal(f.content.inert, false);
  f.win.location.hash = "#desconocido";
  f.controller.sync();
  assert.equal(f.doc.activeElement, f.opener);
  f.controller.destroy();
});
test("al abrir, el diálogo recibe foco y aísla el fondo sin bloquear sus ancestros", () => {
  const f = fixture();
  f.open("recipe");
  assert.equal(f.doc.activeElement, f.close);
  assert.equal(f.modal.getAttribute("aria-modal"), "true");
  assert.equal(f.modal.getAttribute("data-recepy-open"), "true");
  assert.equal(f.modal.getAttribute("data-recepy-modal"), "ready");
  assert.equal(f.content.inert, true);
  assert.equal(f.footer.inert, true);
  assert.equal(f.modal.inert, false);
  assert.equal(f.body.style.overflow, "hidden");
  f.controller.destroy();
});
test("Tab y Shift+Tab ciclan solo entre controles visibles y habilitados", () => {
  const f = fixture();
  f.open("recipe");
  assert.equal(f.key("Tab", true).prevented, true);
  assert.equal(f.doc.activeElement, f.save);
  assert.equal(f.key("Tab").prevented, true);
  assert.equal(f.doc.activeElement, f.close);
  f.outside.focus();
  assert.equal(f.doc.activeElement, f.close);
  f.controller.destroy();
});
test("Escape cierra, devuelve foco y restaura exactamente el estado anterior del fondo", () => {
  const f = fixture();
  f.open("recipe");
  assert.equal(f.key("Escape").prevented, true);
  assert.equal(f.win.location.hash, "");
  assert.equal(f.win.location.search, "?demo=1");
  assert.equal(f.doc.activeElement, f.opener);
  assert.equal(f.modal.hasAttribute("aria-modal"), false);
  assert.equal(f.modal.hasAttribute("data-recepy-open"), false);
  assert.equal(f.modal.hasAttribute("tabindex"), false);
  assert.equal(f.header.inert, true);
  assert.equal(f.header.getAttribute("aria-hidden"), "false");
  assert.equal(f.content.inert, false);
  assert.equal(f.content.getAttribute("aria-hidden"), null);
  assert.equal(f.body.style.overflow, "auto");
  f.controller.destroy();
});
test("cambiar de receta a perfil mantiene un solo diálogo activo y restaura sus atributos", () => {
  const f = fixture();
  f.open("recipe");
  f.open("profile", f.secondOpener);
  assert.equal(f.modal.hasAttribute("aria-modal"), false);
  assert.equal(f.profile.getAttribute("aria-modal"), "true");
  assert.equal(f.doc.activeElement, f.profileClose);
  f.key("Escape");
  assert.equal(f.doc.activeElement, f.secondOpener);
  assert.equal(f.profile.getAttribute("aria-modal"), "false");
  assert.equal(f.profile.getAttribute("tabindex"), "-1");
  f.controller.destroy();
});
test("desmontar una ruta libera el aislamiento y elimina los listeners", () => {
  const f = fixture();
  f.open("recipe");
  f.controller.destroy();
  assert.equal(f.listeners.size, 0);
  assert.equal(f.winListeners.size, 0);
  assert.equal(f.modal.hasAttribute("data-recepy-modal"), false);
  assert.equal(f.content.inert, false);
  assert.equal(f.body.style.overflow, "auto");
});
