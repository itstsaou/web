import {
    LitElement,
    html,
    classMap,
  } from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";
  
  export class ListPage extends LitElement {
    static properties = {
      filter: { type: String, attribute: "is-user-login" },
      items: { type: Object },
    };
  
    constructor() {
      super();
    }

    createRenderRoot() {
      return this;
    }

    _filterChanged(event) {
      const newFilter = event.target.dataset.filter || "A";
      if (newFilter !== this.filter) {
        const e = new CustomEvent("filter-change", {
          detail: { newFilter: newFilter },
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(e);
      }
    }
  
    render() {
      const content = this.items.map((name) => {
        return html`<name-card
          eng=${name.item.engName}
          th=${name.item.thName}
          fb-id=${name.item.id}
          ?is-debug=${this._debug}
          ?use-alt-display=${this._shouldUseAltDisplay}
        ></name-card>`;
      });
      return html`<div class="p-3 p-md-2 my-2 my-md-4 bg-light rounded-3">
        <div class="container-fluid">
          <ul
            style="list-style: none; overflow: scroll;"
            class="d-flex flex-row"
          >
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="A">A</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="B">B</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="C">C</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="D">D</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="E">E</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="F">F</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="G">G</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="H">H</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="I">I</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="J">J</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="K">K</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="L">L</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="M">M</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="N">N</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="O">O</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="P">P</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="Q">Q</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="R">R</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="S">S</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="T">T</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="U">U</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="V">V</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="W">W</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="X">X</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="Y">Y</a>
            </li>
            <li class="mx-1 p-1">
              <a @click=${this._filterChanged} href="#" data-filter="Z">Z</a>
            </li>
          </ul>
        </div>
      </div>
      ${content}`;
    }
  }
  
  customElements.define("list-page", ListPage);
  