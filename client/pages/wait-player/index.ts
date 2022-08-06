import { state } from "../../state";

export function initWaitPlayer(params) {
   const cs = state.getState();
   
   const div = document.createElement("div");
   div.className = "wait-player__container"

   div.innerHTML = `
      <custom-text class="text-container">
        Comparte el código con tu contricante:
        </custom-text>
        <custom-text>
           ${cs.roomId}
        </custom-text>
      <div class="welcome-hands-container">
         <custom-tijera></custom-tijera>
         <custom-piedra></custom-piedra>
         <custom-papel></custom-papel>
      </div>
   `
   
   state.setStatus({ player: 1, online:true, start:false })
   .then(()=> state.listenRoom())
   state.getRtdbRoomId()
         

   return div;
}