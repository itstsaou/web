import {
  LitElement,
  html,
  css,
  styleMap,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

import "./th-character.js";

export class Sequence extends LitElement {
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
    this.index = 0;
    this.value = "ก";
    this.lang = "th";
  }

  _showPrev() {
    if (this.index - 1 < 0) {
      this.index = 0;
    } else {
      this.index = this.index - 1;
    }
    this.requestUpdate();
  }

  _showNext() {
    if (this.index + 1 >= this.value.length) {
      this.index = this.value.length - 1;
    } else {
      this.index = this.index + 1;
    }
    this.requestUpdate();
  }

  render() {
    if (this.value.length === 0) {
      return html`<div class="seq-container"><p>Nothing is here yet</p></div>`;
    } else {
      const charName = this.value.charAt(this.index);
      if (this.lang === "th") {
        return html`<div class="seq-container">
          <th-character name=${charName} loop="true"></th-character>
          <div class="control-box">
            <button @click=${this._showPrev} type="button">&lt;</button>
            <button @click=${this._showNext} type="button">&gt;</button>
            <button type="button">loop</button>
          </div>
        </div>`;
      }
    }
  }
}
customElements.define("a-sequence", Sequence);
