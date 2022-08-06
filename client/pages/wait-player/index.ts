import { state } from "../../state";

export function initWaitPlayer(params) {
   const cs = state.getState();
   console.log("estoy en el wait player!",cs);
   
   const div = document.createElement("div");
   div.className = "welcome-container"

   div.innerHTML = `
      <custom-text class="text-container">
        Comparte el código con tu contricante:
        <custom-text variant="title">
           77HH88
        </custom-text>
      </custom-text>
      <div class="welcome-hands-container">
         <custom-tijera></custom-tijera>
         <custom-piedra></custom-piedra>
         <custom-papel></custom-papel>
      </div>
   `

   return div;
}