import { state} from "../../state"
const imagen = require("url:../../images/lost.png");

export function initPerdistePage(params) {
    const cs = state.getState();
    const playerOneName = cs.playerName;
    const playerTwoName = cs.playerTwoName;

    let playerOneValue = cs.rtdbData.playerOne.history || 0;
    let playerTwoValue = cs.rtdbData.playerTwo.history || 0;

    const div = document.createElement("div");
    div.className = "contaner-result"
    div.innerHTML = `
    <img src="${imagen}">
    <div class="score-container">
    <span class="score-text">Score</span>
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