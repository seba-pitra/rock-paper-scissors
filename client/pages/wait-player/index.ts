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
      </div>
   `


   
   //Debo escuchar los cambios en lartdbData para ver si los dos jugadores estan online 
   //pero me llega vacia a esta pagina. Pensar en esto


   state.listenRoom()
   console.log("rtdbData: ", cs.rtdbData);
   
   setTimeout(()=> {
      if(cs.rtdbData.playerOne.online) {
         console.log("holass estoy online");
      }

   }, 1500) 

   // if(cs.rtdbRoomId) {
   //    state.setStatus({ player: 1, online:true, start:false })
   //    .then(() => {
   //    })
   //    .then(() => {
   //       console.log("rtdbData ",cs.rtdbData);
   //    })

   // }
   // if (true) {
      
   // }
   // .then(() => console.log("rtdbdata: ", cs.rtdbData.playerOne))
   
      
         

   return div;
}