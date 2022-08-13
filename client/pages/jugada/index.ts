import { state } from "../../state"

export function initPageJugada(params) {
    const cs = state.getState()

    const div = document.createElement("div");
    div.className = "jugada-container"
    
    const playerOneChoise = cs.rtdbData.playerOne.choise
    const playerTwoChoise = cs.rtdbData.playerTwo.choise

    const comps = {
        piedra: "<custom-piedra></custom-piedra>",
        papel: "<custom-papel></custom-papel>",
        tijeras: "<custom-tijera></custom-tijera>"
    };

    if (cs.player === 1) {
        div.innerHTML = `
        <div class="machine">
        ${ comps[playerTwoChoise] }
        </div>
        ${ comps[playerOneChoise] }
        `;   
    } else if(cs.player === 2) {
        div.innerHTML = `
        <div class="machine">
        ${ comps[playerOneChoise] }
        </div>
        ${ comps[playerTwoChoise] }
        `;
    }
    
    const resultOfPlay = state.whoWins(playerOneChoise, playerTwoChoise);
    
    if (resultOfPlay === "ganaste") {
        let victories = Number(cs.rtdbData.playerOne.history + 1 || 0)

        state.setHistory(victories, 1)
        .then(()=>{
            setTimeout(() => cs.player === 1 ? params.goTo(`/ganaste`) : params.goTo(`/perdiste`), 2000)
        })
    } else if(resultOfPlay === "perdiste") {
        let victories = Number(cs.rtdbData.playerTwo.history + 1 || 0) 

        state.setHistory(victories, 2)
        .then(()=>{
            setTimeout(() => cs.player === 1 ? params.goTo(`/ganaste`) : params.goTo(`/perdiste`), 2000)
        })
    } else if(resultOfPlay === "empate") {
        setTimeout(() => params.goTo(`/empate`), 2000)
    }
    
    return div;
}