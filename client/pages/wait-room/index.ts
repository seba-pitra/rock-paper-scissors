import { state } from "../../state";

export function initWaitRoom(params) {
    const cs = state.getState()
    const div = document.createElement("div");
    div.className = "welcome-container"

    div.innerHTML = `
      <custom-text class="text-container">
         Esperando que Fede presione ¡Jugar!
      </custom-text>
      <div class="welcome-hands-container">
         <custom-tijera></custom-tijera>
         <custom-piedra></custom-piedra>
         <custom-papel></custom-papel>
      </div>
    `

    let interval = setInterval(()=>{
       const playerOneStart = cs.rtdbData.playerOne.start;
       const playerTwoStart = cs.rtdbData.playerTwo.start; 

       if (playerOneStart && playerTwoStart) {
         params.goTo("/play")
         clearInterval(interval)
       } 
    }, 1000)
    


    return div;
}
