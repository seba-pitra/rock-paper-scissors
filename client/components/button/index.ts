export function initBotonComp() {
    class Boton extends HTMLElement {
        constructor() {
            super();
            this.render();
        }
        render() {
            const shadow = this.attachShadow({ mode: "open" });
            const button = document.createElement("button");
            button.className = "button"
            button.textContent = this.textContent;
            
            const style =  document.createElement("style");
            style.innerText = `
            .button {
                height: 87px;
                width: 322px;
                background-color: #006CFC;
                border: solid 10px #001997;
                border-radius:5px;
                font-size: 45px;
                font-family: 'Acme', sans serif;
                color: #fff;
            }
            `;

            shadow.appendChild(button);
            shadow.appendChild(style);
        }
    }
    customElements.define("custom-boton", Boton)
}