import { state } from "../../state"

export function initEmpatePage(params) {
    const currentState = state.getState();
    const div = document.createElement("div")
    div.className = "contaner-result"
    
    div.innerHTML = `
    <custom-text variant="title">¡Empataste!</custom-text>
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