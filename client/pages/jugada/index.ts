import { state } from "../../state"

export function initPageJugada(params) {
    const div = document.createElement("div");
    div.className = "jugada-container"
    
    const cs = state.getState();
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
    
    if (resultOfPlay === "ganaste" && cs.player === 1) {
        cs.history.playerOne = cs.history.playerOne + 1;
        state.setState(cs)
        state.setHistory()
        .then(() => {
            setTimeout(() => params.goTo(`/ganaste`), 2000)
        })

    } else if(resultOfPlay === "perdiste" && cs.player === 1) {
        cs.history.playerTwo =cs.history.playerTwo + 1;
        state.setState(cs)
        state.setHistory()
        .then(() => {
            setTimeout(() => params.goTo(`/perdiste`), 2000)
        })

    } else if(resultOfPlay === "empate" && cs.player === 1) {
        setTimeout(() => params.goTo(`/empate`), 2000)
    }

    if (resultOfPlay === "ganaste" && cs.player === 2) {
        cs.history.playerOne = cs.history.playerOne + 1;
        state.setState(cs)
        state.setHistory()
        .then(() => {
            setTimeout(() => params.goTo(`/perdiste`), 2000)
        })
        
    } else if(resultOfPlay === "perdiste" && cs.player === 2) {
        cs.history.playerTwo = cs.history.playerTwo + 1;
        state.setState(cs)
        state.setHistory()
        .then(() => {
            setTimeout(() => params.goTo(`/ganaste`), 2000)
        })

    } else if(resultOfPlay === "empate" && cs.player === 2) {
        setTimeout(() => params.goTo(`/empate`), 2000)
    }
    
    return div;
}