const imagen = require("url:../../images/papel.jpg")

export function initPapelComp() {
    class Papel extends HTMLElement {
        constructor() {
            super();
            this.render();
        }
        render() {
            const shadow = this.attachShadow({ mode: "open" });

            const img:any = document.createElement("img");
            img.src = imagen;
            img.style.height = "128px";

            shadow.appendChild(img);
        }
    }
    customElements.define("custom-papel", Papel)
}