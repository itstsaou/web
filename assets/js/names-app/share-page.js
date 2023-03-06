import {
  LitElement,
  html,
  css,
  classMap,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

import "./js-colormap.js";
import "./characters/all-sequence.js";

export class SharePage extends LitElement {
  static styles = css`
      :host {
      }
    `;

  static properties = {
    srcName: { type: String, attribute: "src-name" },
    dstName: { type: String, attribute: "dst-name" },
  };

  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  _findUnique(text) {
    // from https://www.geeksforgeeks.org/how-to-find-unique-characters-of-a-string-in-javascript/
    text = text.split("")
    text = new Set(text);
    text = [...text].join("");
    return text;
  }

  render() {
    if (this.dstName) {
      // Find unique characters set.
      const uniqueChars = this._findUnique(this.dstName);
      console.log(uniqueChars);
      // Create color map.
      // Create reference sequence.
      const refSequence = this.dstName.split("").map((e) => {
        return html`<span>${e}</span>`;
      });
      return html`<div>
        <p>"${this.srcName}" is</p>
        <p style="font-size: 10em;">${refSequence}</p>
        <all-sequence
        value=${uniqueChars}
        lang="th"
      ></all-sequence></div>`;
    } else {
      return html`<p>Not found</p>`;
    }
  }
}
customElements.define("share-page", SharePage);
