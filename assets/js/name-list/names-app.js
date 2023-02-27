import {
  LitElement,
  html,
  css,
  styleMap,
  classMap,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

import "./characters/sequence.js";
import "./name-card.js";

export class NamesApp extends LitElement {
  static properties = {
    _page: { state: true },
    _names: { state: true },
    _user: { state: true },
    _debug: { state: true },
  };

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

    // Application reactive states.
    this._page = "home";
    this._names = [];
    this._user = null;
    this._debug = false;
    // Application states.
    this.namesSnapshot = new Array();
    // Firebase stuff.
    this.app = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(this.app);
    this.db = getFirestore(this.app);
    this.auth = getAuth(this.app);
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this._user = user;
      } else {
        this._user = null;
      }
    });

    // Reading query params
    // https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    this.queryParams = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    if (this.queryParams.page) {
      this._page = this.queryParams.page;
      console.log("[info] page: " + this.queryParams.page);
    }

    this.loadNameSnapshot();
  }

  async loadNameSnapshot() {
    // Either load from localStorage or firebase.
    const localSnapshotText = localStorage.getItem("namesSnapshot");
    if (localSnapshotText) {
      console.log("[info] using names snapshot from localStorage");
      this.namesSnapshot = JSON.parse(localSnapshotText);
    } else {
      console.log("[info] using names snapshot from firebase");
      this.namesSnapshot = await this.loadFromFirebase();
      localStorage.setItem("namesSnapshot", JSON.stringify(this.namesSnapshot));
    }

    const options = {
      isCaseSensitive: false,
      includeScore: true,
      keys: ["engName", "thName"],
    };
    this.fuse = new Fuse(this.namesSnapshot, options);
  }

  async loadFromFirebase() {
    let snapshot = new Array();
    const querySnapshot = await getDocs(collection(this.db, "names"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      snapshot.push({id: doc.id, ...data});
    });
    return snapshot;
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

  get newPairEngNameField() {
    return this.renderRoot?.querySelector("#new-pair-eng-name") ?? null;
  }

  get newPairThNameField() {
    return this.renderRoot?.querySelector("#new-pair-th-name") ?? null;
  }

  _engNameChanged(event) {
    const result = this.fuse.search(this.engNameField.value).filter((e) => {
      return e.score <= 0.4;
    });
    this._names = result;
  }

  _signInClicked(event) {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(this.app);
    setPersistence(auth, browserSessionPersistence).then(() => {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          this._user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
          console.log("[firebase] signin error");
        });
    });
  }

  _signOutClicked(event) {
    const auth = getAuth(this.app);
    signOut(auth).then(() => {
      console.log("[firebase] signout successful");
    }).catch((error) => {
      console.log("[firebase] signout error");
    });
  }

  async _addNewPairClicked(event) {
    let db = getFirestore(this.app);
    const engName = this.newPairEngNameField.value;
    const thName = this.newPairThNameField.value;

    const docRef = await addDoc(collection(db, "names"), {
      engName: engName,
      thName: thName,
    });
    console.log("[firebase] added new pair: " + docRef.id);
  }

  _refreshNamesSnapshot(event) {
    localStorage.removeItem("namesSnapshot");
    this.loadNameSnapshot();
  }

  _toggleDebugClicked(event) {
    console.log("old: " + this._debug);
    this._debug = this._debug ? false : true;
    console.log("new: " + this._debug);
  }

  renderNavBar() {

    const home_classes = {
      "nav-link": true,
      "active": this._page === "home"
    };
    const new_pair_classes = {
      "nav-link": true,
      "active": this._page === "new-pair"
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
              <a class=${classMap(home_classes)} aria-current="page" href="?page=home"
                >Lookup</a
              >
            </li>
            ${this._user ? html`
            <li class="nav-item">
              <a class=${classMap(new_pair_classes)} href="?page=new-pair">Add</a>
            </li>` : ""}
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
              ${!this._user ? html`
              <li>
              <a @click=${this._signInClicked} class="dropdown-item"
                >Sign in</a
              >
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
              ` : ""}
              
              <li>
                <a @click=${this._refreshNamesSnapshot} class="dropdown-item"
                  >Refresh</a
                >
              </li>
              ${this._user ? html`<li><a @click=${this._toggleDebugClicked} class="dropdown-item" href="#">Toggle Debug</a></li>` : ""}
              ${this._user ? html`<li><a @click=${this._signOutClicked} class="dropdown-item" href="#">Logout</a></li>` : ""}
            </ul>
          </div>
        </div>
      </div>
    </nav>`;
  }

  renderHomePage() {
    const foundNames = this._names.map((name) => {
      return html`<name-card
        eng=${name.item.engName}
        th=${name.item.thName}
        fb-id=${name.item.id}
        ?is-debug=${this._debug}
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
      ${this._names.length !== 0 ? foundNames : ""}`;
  }

  renderNewPairPage() {
    return html`<div class="p-5 mt-4 mb-4 bg-light rounded-3">
      <div class="container-fluid">
        <div class="mb-3">
          <span class="badge bg-warning text-dark">Experimental Feature / Available to admin only</span>
        </div>
        <div class="mb-3">
          <label for="new-pair-eng-name" class="form-label">English Name</label>
          <input
            type="text"
            class="form-control"
            id="new-pair-eng-name"
            placeholder=""
          />
        </div>
        <div class="mb-3">
          <label for="new-pair-th-name" class="form-label">Thai Name</label>
          <input
            type="text"
            class="form-control"
            id="new-pair-th-name"
            placeholder=""
          />
        </div>
        <div class="mb-3">
          <button
            @click=${this._addNewPairClicked}
            type="button"
            class="btn btn-primary"
          >
            Add
          </button>
        </div>
      </div>
    </div>`;
  }

  render() {
    let navBarContent = this.renderNavBar();

    let pageContent = null;
    if (this._page === "home") {
      pageContent = this.renderHomePage();
    } else if (this._page === "new-pair" && this._user) {
      pageContent = this.renderNewPairPage();
    } else {
      pageContent = this.renderHomePage();
    }

    return html`${navBarContent}
      <main>
        <div class="container">${pageContent}</div>
      </main>`;
  }
}
customElements.define("names-app", NamesApp);
