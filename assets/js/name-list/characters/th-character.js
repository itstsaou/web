import {
  LitElement,
  html,
  css,
  styleMap,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

// import { vivus } from "https://cdnjs.cloudflare.com/ajax/libs/vivus/0.4.6/vivus.min.js";
// <script src="https://cdnjs.cloudflare.com/ajax/libs/vivus/0.4.6/vivus.min.js" integrity="sha512-oUUeA7VTcWBqUJD/VYCBB4VeIE0g1pg5aRMiSUOMGnNNeCLRS39OlkcyyeJ0hYx2h3zxmIWhyKiUXKkfZ5Wryg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

export class ThaiCharacter extends LitElement {
  static styles = css`
    @keyframes draw {
      to {
        stroke-dashoffset: 0;
      }
    }
  `;

  static properties = {
    name: { type: String },
    animated: { type: Boolean },
    loop: { type: Boolean },
    duration: { type: Number },
    length: { type: Number },
    offset: { type: Number },
  };

  constructor() {
    super();
    this.name = "none";
    this.loop = true;
    this.duration = 5;
    this.length = 450;
    this.offset = 450;
    this.classes = { loop: this.loop };

    this.renderFuncMapping = {
      none: this.renderDefault,
      ก: this.renderKoKhai,
      ข: this.renderKhoKhai,
      ฃ: this.renderKhoKhuat,
      ค: this.renderKhoKhwai,
    };
  }

  renderDefault(styles) {
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="200"
      viewBox="0 0 30 30"
    >
      <g>
        <path
          d="m 8.9009092,28.8331 0.08979,-14.783139 c 0,0 0.179583,-3.435281
    3.4121158,-4.1986704 C 9.3498722,8.5153441 5.6683799,6.9885528
    5.6683799,6.9885528 c 0,0 4.4896231,-4.3895259 11.4934421,-3.2444316
    7.003815,1.1450919 7.811948,5.7254684 7.811948,5.7254684 l 0,19.2757534"
          style=${styleMap(styles)}
        />
      </g>
    </svg>`;
  }

  renderKoKhai(styles) {
    // ก
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="200"
      viewBox="0 0 30 30"
    >
      <g>
        <path
          d="m 8.9009092,28.8331 0.08979,-14.783139 c 0,0 0.179583,-3.435281
    3.4121158,-4.1986704 C 9.3498722,8.5153441 5.6683799,6.9885528
    5.6683799,6.9885528 c 0,0 4.4896231,-4.3895259 11.4934421,-3.2444316
    7.003815,1.1450919 7.811948,5.7254684 7.811948,5.7254684 l 0,19.2757534"
          style=${styleMap(styles)}
        />
      </g>
    </svg>`;
  }

  renderKhoKhai(styles) {
    // ข
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="200"
      viewBox="0 0 30 30"
    >
      <g>
        <path
          d="m 5.4636798,9.0968152 c 0,0 3.064261,-2.1748119 4.407757,-1.503486 1.7801232,0.8895031 2.5539012,3.2118438 0.4905972,4.9110368 -3.7625032,1.84575 -4.8983542,-0.922879 -4.8983542,-0.922879 0,0 -1.348822,-4.0464661 3.691514,-7.1700547 0.9819792,-0.3795776 3.2640952,-1.0426027 5.3925392,0.078794 2.701103,1.6019991 5.070133,4.9619846 -0.494186,10.7117867 -0.07099,5.963214 0.141982,12.423362 0.141982,12.423362 l 8.518876,-0.071 -0.141981,-23.639883"
          style=${styleMap(styles)}
        />
      </g>
    </svg>`;
  }

  renderKhoKhuat(styles) {
    // ข
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="200"
      viewBox="0 0 30 30"
    >
      <g>
        <path
          d="m 6.6716989,12.157473 c 0,0 1.8676129,-2.2276487 3.5150701,-2.2076103 2.264435,0.6167163 2.651396,1.9778843 2.170452,3.5327193 -1.641067,3.80799 -4.7016456,1.524472 -4.7016456,1.524472 0,0 -4.607422,-4.040728 3.2641186,-11.2825457 1.469353,1.1020155 2.431948,3.4852151 2.431948,3.4852151 0,0 1.398872,-3.0653998 2.133546,-3.5376916 0,0 10.023099,3.2535701 1.311921,12.4895142 0.209909,6.192275 0,12.332085 0,12.332085 l 8.396314,-0.05245 0.104955,-25.0839803"
          style=${styleMap(styles)}
        />
      </g>
    </svg>`;
  }

  renderKhoKhwai(styles) {
    // ค
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="200"
      viewBox="0 0 30 30"
    >
      <g>
        <path
          d="m 11.670295,15.568231 c 1.849648,1.982894 2.865617,1.839467 4.215291,1.545608 1.714199,-1.136625 1.45892,-2.844223 1.257313,-3.387663 -0.538924,-2.182062 -2.970222,-2.568066 -3.013688,-2.513737 0,0 -2.177899,-0.210764 -2.669683,1.967134 0,2.107641 0.07027,14.683241 0.07027,14.683241"
          style=${styleMap(styles)}
        />
        <path
          d="m 11.459528,21.539889 c 0,0 -8.5008246,-4.777325 -3.1614583,-14.050952 2.6696753,-2.5994257 5.1285923,-3.091209 5.1285923,-3.091209 0,0 7.868533,-2.6696806 11.802799,5.620381 -0.07027,8.711589 0.07027,17.844713 0.07027,17.844713"
          style=${styleMap(styles)}
        />
      </g>
    </svg>`;
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
      strokeDasharray: this.length,
      strokeDashoffset: this.offset,
      animation: `draw ${this.duration}s linear ${
        this.loop ? "infinite" : ""
      } forwards`,
    };
    const renderFunc =
      this.renderFuncMapping[this.name] || this.renderFuncMapping["none"];
    return renderFunc(styles);
  }
}
customElements.define("th-character", ThaiCharacter);
