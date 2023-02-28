import {
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

import { thMapping, maiEk, maiTho, maiTri } from "./th-mapping.js";

export class ThaiCharacter extends LitElement {
  static properties = {
    name: { type: String },
    animated: { type: Boolean },
    loop: { type: Boolean },
    duration: { type: Number },
  };

  constructor() {
    super();
    this.name = "none";
    this.loop = true;
    this.duration = 200;
    this.classes = { loop: this.loop };

    this.animator = null;
    this.loopingTimer = null;
  }

  render() {
    const styles = {
      fill: "none",
      stroke: "#000000",
      strokeWidth: 1.22713482,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeMiterlimit: 4,
      strokeOpacity: 1,
    };
    const renderFunc = thMapping[this.name] || thMapping["none"];
    return renderFunc(styles);
  }

  getFrameCount(character) {
    if (character === "า") {
      return 80;
    } else if (character === "เ") {
      return 80;
    } else if (character === "ิ") {
      return 80;
    } else if (character === "ี") {
      return 80;
    } else if (character === maiEk) {
      return 80;
    } else if (character === maiTho) {
      return 80;
    } else if (character === maiTri) {
      return 80;
    } else if (character === "ุ") {
      return 80;
    } else if (character === "ู") {
      return 80;
    } else if (character === "ั") {
      return 80;
    } else {
      // default number of frames.
      return 200;
    }
  }

  updated() {
    const svgEle = this.renderRoot.querySelector("#th-char");

    if (this.animator !== null) {
      this.animator.destroy();
    }

    if (this.loopingTimer !== null) {
      // When switching to the next character
      // The timeout may still be around.
      clearTimeout(this.loopingTimer);
      this.loopingTimer = null;
    }

    this.animator = new Vivus(
      svgEle,
      { duration: this.getFrameCount(this.name), type: "oneByOne" },
      (vivusObj) => {
        if (this.loop && vivusObj.getStatus() === "end") {
          this.loopingTimer = setTimeout(() => {
            vivusObj.reset().play(1);
          }, 700);
        }
      }
    );
  }
}
customElements.define("th-character", ThaiCharacter);
