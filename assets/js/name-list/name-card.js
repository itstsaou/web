import {
  LitElement,
  html,
  css,
  styleMap,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

import "./characters/sequence.js";

export class NameCard extends LitElement {
  static properties = {
    eng: { type: String },
    th: { type: String },
  };

  constructor() {
    super();
    this.isSeqVisible = false;
    this.eng = "bob";
    this.th = "บ็อบ";
  }

  createRenderRoot() {
    return this;
  }

  _toggleSeqVisibility() {
    this.isSeqVisible = !this.isSeqVisible;
    this.requestUpdate();
  }

  render() {
    // TODO: Toggle visibility of <a-sequence>
    const seq = html`<a-sequence value=${this.th}></a-sequence>`;
    return html`<div class="p-5 mb-4 bg-light rounded-3">
      <div class="container-fluid">
        <h1 @click=${this._toggleSeqVisibility}>
          ${this.eng} : ${this.th}
          ${this.isSeqVisible ? html`&#x25B2;` : html`&#x25BC;`}
        </h1>
        ${this.isSeqVisible ? seq : ""}
      </div>
    </div>`;
  }
}
customElements.define("name-card", NameCard);
