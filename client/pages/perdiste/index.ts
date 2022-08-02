import { state} from "../../state"
const imagen = require("url:../../images/lost.png");

export function initPerdistePage(params) {
    const currentState = state.getState();
    currentState.history.computerPlay = currentState.history.computerPlay + 1

    const div = document.createElement("div");
    div.className = "contaner-result"
    div.innerHTML = `
    <img src="${imagen}">
    <div class="score-container">
    <custom-text>Score</custom-text>
    <custom-text class="results">Vos: ${sessionStorage.getItem("me")}</custom-text>
    <custom-text class="results">Máquina: ${sessionStorage.getItem("machine")}</custom-text>
    </div>
    <custom-boton>Volver a jugar</custom-boton>
    `
    
    const button = div.querySelector("custom-boton")
    button?.addEventListener("click", (e) => {
        params.goTo("/instruction")
    })

    return div
}