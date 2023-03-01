import {
  LitElement,
  html,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

import "./characters/a-sequence.js";

export class NameCard extends LitElement {
  static properties = {
    eng: { type: String },
    th: { type: String },
    fbId: { type: String, attribute: "fb-id" },
    isDebug: { type: Boolean, attribute: "is-debug" },
    _isSeqVisible: { state: true },
  };

  constructor() {
    super();
    this._isSeqVisible = false;
    this.eng = "bob";
    this.th = "บ็อบ";
  }

  willUpdate(changedProperties) {
    if (changedProperties.has("eng") || changedProperties.has("th")) {
      this._isSeqVisible = false;
    }
  }

  createRenderRoot() {
    return this;
  }

  _toggleSeqVisibility() {
    this._isSeqVisible = this._isSeqVisible ? false : true;
  }

  render() {
    const seq = html`<a-sequence value=${this.th} lang="th"></a-sequence>`;
    return html`<div class="p-3 p-md-5 mb-2 mb-md-4 bg-light rounded-3">
      <div class="container-fluid">
        <h1 @click=${this._toggleSeqVisibility}>
          ${this.eng} : ${this.th}
          ${this._isSeqVisible
            ? html`<span class="h4">&#x25B2;</span>`
            : html`<span class="h4">&#x25BC;</span>`}
        </h1>
        ${this.isDebug ? html`<p>ID: ${this.fbId}</p>` : ""}
        ${this._isSeqVisible ? seq : ""}
      </div>
    </div>`;
  }
}
customElements.define("name-card", NameCard);
