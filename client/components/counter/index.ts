export function initCounterComp() {
    class Counter extends HTMLElement {
        constructor() {
            super();
            this.render();
        }
        render() {
            const shadow = this.attachShadow({ mode: "open" });
            const counter = document.createElement("div");
            counter.className = "counter"
            counter.innerHTML = `
            <span class="cuenta"><span>
            `;
            const style =  document.createElement("style");
            
            style.innerText = `
            .counter {
                margin-top: 20px;
                height: 250px;
                width: 250px;
                border: solid 25px #001997;
                border-radius:50%;
                font-family: 'Acme', sans serif;
                color: #000;
            }
            .cuenta {
                display:block;
                width:100%;
                text-align:center;
                padding-top: 33px;
                font-size: 150px;
            }
            `;

            let second = 6;
            setInterval(() => {
                second--;
                let cuenta:any = counter.querySelector(".cuenta")
                if (second === 5) {
                    cuenta.textContent = "5"
                    counter.style.borderColor = "#F7E6A1"
                } else if(second == 4){
                    cuenta.textContent = "4"
                    counter.style.borderColor = "#798795"
                } else if(second == 3){
                    cuenta.textContent = "3"
                    counter.style.borderColor = "#FC5A36"
                } else if(second == 2){
                    cuenta.textContent = "2"
                    counter.style.borderColor = "#6CB46C"
                } else if(second == 1){
                    cuenta.textContent = "1"
                    counter.style.borderColor = "#001997"
                } else if(second == 0){
                    cuenta.innerHTML = `
                    <p class="tiempo-terminado">
                    ¡Terminó el tiempo!
                    </p>
                    <style>
                    .tiempo-terminado {
                        font-size: 50px;
                        margin: 30px 0 0 0;
                    }
                    </style>
                    `
                } 
                
            }, 1000)

            shadow.appendChild(style)
            shadow.appendChild(counter)
        }
    }
    customElements.define("counter-comp", Counter)
}