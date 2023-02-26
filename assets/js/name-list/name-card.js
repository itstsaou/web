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
    this.eng = "bob";
    this.th = "บ็อบ";
  }

  render() {
    return html`<div class="name-card">
      <h1>${this.eng} : ${this.th}</h1>
      <a-sequence value=${this.th}></a-sequence>
    </div>`;
  }
}
customElements.define("name-card", NameCard);
