import { state} from "../../state"
const imagen = require("url:../../images/win.png")

export function pageGanaste(params) {
    const cs = state.getState();
    const playerOneName = cs.rtdbData.playerOne.name;
    const playerTwoName = cs.rtdbData.playerTwo.name

    const playerOneValue = cs.history.playerOne;
    const playerTwoValue = cs.history.playerTwo;
    
    const div = document.createElement("div")
    div.className = "contaner-result"
    div.innerHTML = `
    <img src="${imagen}">
    <div class="score-container">
    <custom-text>Score</custom-text>
    <custom-text class="results">${playerOneName}: ${playerOneValue}</custom-text>
    <custom-text class="results">${playerTwoName}: ${playerTwoValue}</custom-text>
    </div>
    <custom-boton>Volver a jugar</custom-boton>
    `
    
    const button = div.querySelector("custom-boton")
    button?.addEventListener("click", (e) => {
        params.goTo("/instruction")
    })

    return div
}