import {
  LitElement,
  html,
  classMap,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

export class NavBar extends LitElement {
  static properties = {
    page: { type: String },
    isUserLogin: { type: Boolean, attribute: "is-user-login" },
  };

  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  _pageChanged(event) {
    const newPage = event.target.dataset.page || "home";
    if (newPage !== this.page) {
      const e = new CustomEvent("page-change", {
        detail: { newPage: newPage },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(e);
    }
  }

  _signInClicked(event) {
    const e = new Event("signin-click", { bubbles: true, composed: true });
    this.dispatchEvent(e);
  }

  _signOutClicked(event) {
    const e = new Event("signout-click", { bubbles: true, composed: true });
    this.dispatchEvent(e);
  }

  _refreshClicked(event) {
    const e = new Event("refresh-click", { bubbles: true, composed: true });
    this.dispatchEvent(e);
  }

  _toggleDebugClicked(event) {
    const e = new Event("debug-click", { bubbles: true, composed: true });
    this.dispatchEvent(e);
  }

  render() {
    const home_classes = {
      "nav-link": true,
      active: this.page === "home",
    };
    const list_classes = {
      "nav-link": true,
      active: this.page === "list",
    };
    const new_pair_classes = {
      "nav-link": true,
      active: this.page === "new-pair",
    };
    return html`<nav class="navbar navbar-expand-lg bg-primary">
      <div class="container">
        <a class="navbar-brand" href="#">Names</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a
                class=${classMap(home_classes)}
                @click=${this._pageChanged}
                data-page="home"
                href="#"
                >Lookup</a
              >
            </li>
            <li class="nav-item">
              <a
                class=${classMap(list_classes)}
                @click=${this._pageChanged}
                data-page="list"
                href="#"
                >List</a
              >
            </li>
            ${this.isUserLogin
              ? html` <li class="nav-item">
                  <a
                    class=${classMap(new_pair_classes)}
                    @click=${this._pageChanged}
                    data-page="new-pair"
                    href="#"
                    >Add</a
                  >
                </li>`
              : ""}
          </ul>
          <div class="navbar-nav d-flex nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Other
            </a>
            <ul class="dropdown-menu">
              ${!this.isUserLogin
                ? html`
                    <li>
                      <a @click=${this._signInClicked} class="dropdown-item"
                        >Sign in</a
                      >
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                  `
                : ""}

              <li>
                <a @click=${this._refreshClicked} class="dropdown-item" href="#"
                  >Refresh</a
                >
              </li>
              ${this.isUserLogin
                ? html`<li>
                    <a
                      @click=${this._toggleDebugClicked}
                      class="dropdown-item"
                      href="#"
                      >Toggle Debug</a
                    >
                  </li>`
                : ""}
              ${this.isUserLogin
                ? html`<li>
                    <a
                      @click=${this._signOutClicked}
                      class="dropdown-item"
                      href="#"
                      >Logout</a
                    >
                  </li>`
                : ""}
            </ul>
          </div>
        </div>
      </div>
    </nav>`;
  }
}

customElements.define("nav-bar", NavBar);
