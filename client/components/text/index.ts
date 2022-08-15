export function initTextComp() {
    class TextComponent extends HTMLElement {
        constructor() {
            super();
            this.render();
        }
        render() {
            const shadow = this.attachShadow({ mode: "open" })
            const variant = this.getAttribute("variant")  || "body"
            const div = document.createElement("div");
            div.className = variant;
            div.textContent = this.textContent;
            
            let style = document.createElement("style");
            style.textContent = `
            .title {
                display:flex;
                flex-direction:column
                font-family: 'Acme', sans serif;
                font-size: 52px;
                font-weight: bold;
                text-align: center;
                color: #009048;
                margin: 115px 0 0;
            }
            @media(min-width:769px) {
                .title {
                    margin-top: 145px;
                }
            }            
            .body {
                font-family: 'Acme', sans serif;
                font-size: 40px;
                font-weight: bold;
                text-align: center;
                padding: 40px 20px 20px;
            }
            @media(min-width:769px) {
                .body {
                    font-size: 55px;
                }
            }`
            
            shadow.appendChild(div);
            shadow.appendChild(style);
        }
    }
    customElements.define("custom-text", TextComponent)
}
