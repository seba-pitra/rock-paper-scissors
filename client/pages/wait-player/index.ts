import { state } from "../../state";

export function initWaitPlayer(params) {
   const cs = state.getState()
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
   `;
   
   state.listenRoom();
   
   let interval = setInterval(()=>{
      const rtdbData = cs.rtdbData
      const playerOneReady = rtdbData.playerOne.online
      const playerTwoReady = rtdbData.playerTwo.online

      if (playerOneReady && playerTwoReady) {
         params.goTo("./instructions")
         clearInterval(interval)
      }   
   }, 1000)
   
   return div;
}