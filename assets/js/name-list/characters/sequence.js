import {
  LitElement,
  html,
  css,
  classMap,
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
    _charIndex: { state: true },
  };

  constructor() {
    super();
    this._charIndex = 0;
    this.value = "ก";
    this.lang = "th";
  }

  willUpdate(changedProperties) {
    if (changedProperties.has("value")) {
      this._charIndex = 0;
    }
  }

  createRenderRoot() {
    return this;
  }

  _showPrev() {
    if (this._charIndex - 1 < 0) {
      this._charIndex = 0;
    } else {
      this._charIndex = this._charIndex - 1;
    }
  }

  _showNext() {
    if (this._charIndex + 1 >= this.value.length) {
      this._charIndex = this.value.length - 1;
    } else {
      this._charIndex = this._charIndex + 1;
    }
  }

  render() {
    if (this.value.length === 0) {
      return html`<div class="d-flex flex-row"><p>Nothing is here yet</p></div>`;
    } else {
      const charName = this.value.charAt(this._charIndex);
      const prevBtnClasses = {
        btn: true,
        "btn-light": true,
        disabled: this._charIndex == 0,
      }
      const nextBtnClasses = {
        btn: true,
        "btn-light": true,
        disabled: this._charIndex == this.value.length - 1,
      }
      if (this.lang === "th") {
        return html`<div class="d-flex flex-row">
          <th-character name=${charName} loop="true"></th-character>
          <div class="control-box">
            <p>${this._charIndex + 1} / ${this.value.length}</p>
            <button @click=${this._showPrev} type="button" class=${classMap(prevBtnClasses)}>Prev</button>
            <button @click=${this._showNext} type="button" class=${classMap(nextBtnClasses)}>Next</button>
          </div>
        </div>`;
      }
    }
  }
}
customElements.define("a-sequence", Sequence);
