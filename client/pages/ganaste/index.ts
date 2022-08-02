import { state} from "../../state"
const imagen = require("url:../../images/win.png")

export function pageGanaste(params) {
    const currentState = state.getState();
    currentState.history.myPlay = currentState.history.myPlay + 1;

    const myValue = sessionStorage.getItem("me");
    const machineValue = sessionStorage.getItem("machine");
    
    const div = document.createElement("div")
    div.className = "contaner-result"
    div.innerHTML = `
    <img src="${imagen}">
    <div class="score-container">
    <custom-text>Score</custom-text>
    <custom-text class="results">Vos: ${myValue}</custom-text>
    <custom-text class="results">Máquina: ${machineValue}</custom-text>
    </div>
    <custom-boton>Volver a jugar</custom-boton>
    `
    
    const button = div.querySelector("custom-boton")
    button?.addEventListener("click", (e) => {
        params.goTo("/instruction")
    })

    return div
}