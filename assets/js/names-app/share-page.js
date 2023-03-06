import {
  LitElement,
  html,
  css,
  classMap,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

export class SharePage extends LitElement {
  static styles = css`
      :host {
      }
    `;

  static properties = {
    value: { type: String },
    lang: { type: String },
    _charIndex: { state: true },
    _shouldLoop: { state: true },
  };

  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`<p>Share</p>`;
  }
}
customElements.define("share-page", SharePage);
