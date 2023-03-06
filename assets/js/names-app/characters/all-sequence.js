import {
  LitElement,
  html,
  css,
  classMap,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

import "./th-character.js";

export class AllSequence extends LitElement {
  static styles = css`
    :host {
      width: 500px;
      height: 600px;
    }

    .seq-container {
      display: flex;
    }
  `;

  static properties = {
    value: { type: String },
    lang: { type: String },
  };

  constructor() {
    super();
    this.value = "ก";
    this.lang = "th";
  }

  createRenderRoot() {
    return this;
  }

  render() {
    if (this.value.length === 0) {
      return html`<div class="d-flex flex-row">
        <p>Nothing is here yet</p>
      </div>`;
    } else {
      if (this.lang === "th") {
        let thChars = [];
        for (let i = 0; i < this.value.length; i++) {
          thChars.push(this.value.charAt(i));
        }
        const seqs = thChars.map((charName) => {
          return html`<th-character name=${charName}></th-character>`;
        });
        return html`<div class="d-flex flex-row" style="overflow: scroll">
          ${seqs}
        </div>`;
      }
    }
  }
}
customElements.define("all-sequence", AllSequence);
