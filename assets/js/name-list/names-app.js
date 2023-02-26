import {
  LitElement,
  html,
  css,
  styleMap,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

import "./characters/sequence.js";
import "./name-card.js";

export class NamesApp extends LitElement {
  constructor() {
    super();

    const firebaseConfig = {
      apiKey: "AIzaSyCwmb8vgK0Bi5sgmyHa3Rm6FuHyEEeY78w",
      authDomain: "thai-student-assoc.firebaseapp.com",
      projectId: "thai-student-assoc",
      storageBucket: "thai-student-assoc.appspot.com",
      messagingSenderId: "813535396713",
      appId: "1:813535396713:web:f55ce49234a15038c833f8",
      measurementId: "G-43GJZF4RC1",
    };

    // Application states.
    this.page = "new-pair";
    this.names = null;
    this.namesSnapshot = new Array();
    // Firebase stuff.
    this.app = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(this.app);
    this.db = getFirestore(this.app);

    // Reading query params
    // https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    this.queryParams = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    if (this.queryParams.page) {
      this.page = this.queryParams.page;
      console.log(this.queryParams.page);
    }

    this.init();
  }

  async init() {
    const querySnapshot = await getDocs(collection(this.db, "names"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      this.namesSnapshot.push(data);
    });

    const options = {
      isCaseSensitive: false,
      includeScore: true,
      keys: ["engName", "thName"],
    };
    this.fuse = new Fuse(this.namesSnapshot, options);
  }

  createRenderRoot() {
    return this;
  }

  // from https://blog.bitsrc.io/debounce-understand-and-learn-how-to-use-this-essential-javascript-skill-9db0c9afbfc1
  debounce(func, delay = 250) {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  get engNameField() {
    return this.renderRoot?.querySelector("#eng-name") ?? null;
  }

  _engNameChanged(event) {
    const result = this.fuse.search(this.engNameField.value).filter((e) => {
      return e.score <= 0.4;
    });
    this.names = result;
    this.requestUpdate();
  }

  renderNavBar() {
    return html`<nav class="navbar navbar-expand-lg bg-primary">
      <div class="container">
        <a class="navbar-brand" href="/">Names</a>
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
                class="nav-link ${this.page === "home" ? "active" : ""}"
                aria-current="page"
                href="?page=home"
                >Lookup</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link ${this.page === "new-pair" ? "active" : ""}"
                href="?page=new-pair"
                >Add</a
              >
            </li>
          </ul>
          <div class="navbar-nav d-flex nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Account
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/canvas">Sign in</a></li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li><a class="dropdown-item disabled" href="#">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>`;
  }

  renderHomePage() {
    const foundNames = this.names?.map((name) => {
      return html`<name-card
        eng=${name.item.engName}
        th=${name.item.thName}
      ></name-card>`;
    });
    return html`<div class="p-5 mt-4 mb-4 bg-light rounded-3">
        <div class="container-fluid">
          <label for="eng-name" class="form-label">English Name</label>
          <input
            type="text"
            class="form-control"
            id="eng-name"
            placeholder="Fiona"
            @keyup=${this.debounce(this._engNameChanged, 700)}
          />
        </div>
      </div>
      <div class="p-5 mb-4 bg-light rounded-3">
        <div class="container-fluid">${foundNames}</div>
      </div>`;
  }

  renderNewPairPage() {
    return html`<div class="p-5 mt-4 mb-4 bg-light rounded-3">
      <div class="container-fluid">
        <div class="mb-3">
          <label for="eng-name" class="form-label">English Name</label>
          <input
            type="text"
            class="form-control"
            id="eng-name"
            placeholder=""
            @keyup=${this.debounce(this._engNameChanged, 700)}
          />
        </div>
        <div class="mb-3">
          <label for="th-name" class="form-label">Thai Name</label>
          <input
            type="text"
            class="form-control"
            id="th-name"
            placeholder=""
            @keyup=${this.debounce(this._engNameChanged, 700)}
          />
        </div>
        <div class="mb-3">
          <button type="button" class="btn btn-primary">Add</button>
        </div>
      </div>
    </div>`;
  }

  render() {
    let navBarContent = this.renderNavBar();

    let pageContent = null;
    if (this.page === "home") {
      pageContent = this.renderHomePage();
    } else if (this.page === "new-pair") {
      pageContent = this.renderNewPairPage();
    }

    return html`${navBarContent}
      <main>
        <div class="container">${pageContent}</div>
      </main>`;
  }
}
customElements.define("names-app", NamesApp);
