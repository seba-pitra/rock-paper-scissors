import { state } from "../../state";

export function initInstrucionsPage(params) {
    const cs = state.getState();
    const div = document.createElement("div");
    div.className = "instructions-container"
    
    div.innerHTML = `
    <custom-text>
       Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los segundos.
    </custom-text>
    <custom-boton>¡Jugar!</custom-boton>
    <div class="play-hands-container">
        <custom-tijera></custom-tijera>
        <custom-piedra></custom-piedra>
        <custom-papel></custom-papel>
    </div>
    `

    const button:any = div.querySelector("custom-boton");

    button.addEventListener("click",async (e) => {
      e.preventDefault()

      if (cs.player === 1) {
        state.setStatus({player:1, online:true, start:true, name:cs.playerName})
        .then( ()=> params.goTo("/wait-room"))
      } else if(cs.player === 2) {
        state.setStatus({player:2, online:true, start:true, name:cs.playerTwoName})
        .then( ()=> params.goTo("/wait-room"))
      }

      // params.goTo("/wait-room")
    })
    
    return div;
}