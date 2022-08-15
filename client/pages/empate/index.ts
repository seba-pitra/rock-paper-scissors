import { state } from "../../state"

export function initEmpatePage(params) {
    const cs:any = state.getState()

    const playerOneName = cs.playerName;
    const playerTwoName = cs.playerTwoName;
    
    let playerOneValue = cs.rtdbData.playerOne.history || 0;
    let playerTwoValue = cs.rtdbData.playerTwo.history || 0;

    const div = document.createElement("div")
    div.className = "contaner-result"
    div.innerHTML = `
    <custom-text variant="title">¡Empate!</custom-text>
    <div class="score-container">
    <custom-text>Score</custom-text>
    <custom-text class="results">${playerOneName}: ${playerOneValue}</custom-text>
    <custom-text class="results">${playerTwoName}: ${playerTwoValue}</custom-text>
    </div>
    <custom-boton>Volver a jugar</custom-boton>
    `

    if (cs.player === 1) {
        state.setStatus({ player: 1, online: true, start: false, name: cs.playerName })
        .then(() => state.cleanPlay())
    } else if(cs.player === 2) {
        state.setStatus({ player: 2, online: true, start: false, name: cs.playerTwoName })
        .then(() => state.cleanPlay())
    }

    const button = div.querySelector("custom-boton")
    button?.addEventListener("click", (e) => {
        params.goTo("/instruction")
    })

    return div
}