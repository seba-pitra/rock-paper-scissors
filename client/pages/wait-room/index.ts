import { state } from "../../state";

export function initWaitRoom(params) {
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

    state.listenRoom()

   //  state.setStatus()
    return div;
}

//PONER LOS NOMBRES DE LOS JUGADORES DONDE TIENEN QUE IR. HACER ESO ANTES DE ADELANTAR OTRAS COSAS :)