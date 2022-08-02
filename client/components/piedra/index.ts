const imagen = require("url:../../images/piedra.jpg")

export function initPiedraComp() {
    class Piedra extends HTMLElement {
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
    customElements.define("custom-piedra", Piedra)
}