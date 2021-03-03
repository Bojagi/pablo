Object.defineProperties(window.HTMLElement.prototype, {
  offsetHeight: {
    get() {
      return parseFloat(this.getAttribute('fake-height')) || 0;
    },
  },
  offsetWidth: {
    get() {
      return parseFloat(this.getAttribute('fake-width')) || 0;
    },
  },
  contentRect: {
    get() {
      return {
        width: parseFloat(this.getAttribute('fake-width')) || 0,
        height: parseFloat(this.getAttribute('fake-height')) || 0,
      };
    },
  },
});

export function setFakeHeight(element: HTMLElement, height: number) {
  element.setAttribute('fake-height', height.toString());
}

export function setFakeWidth(element: HTMLElement, width: number) {
  element.setAttribute('fake-width', width.toString());
}
