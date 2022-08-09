import { state } from "../../state";

export function initGetName(params) {
   
   const div = document.createElement("div");
   div.className = "welcome-container"
   
   div.innerHTML = `
   <custom-text variant="title">
      Piedra, Papel ó Tijeras
   </custom-text>
   <label for="input-name" class="name-label">Tu nombre</label>
   <input class="codigo" placeholder="Nombre" name="input-name"/>
   <custom-boton class="new-game">Empezar</custom-boton>
   <div class="welcome-hands-container">
      <custom-tijera></custom-tijera>
      <custom-piedra></custom-piedra>
      <custom-papel></custom-papel>
   </div>
         `
         
   const cs = state.getState();
         
   const firstButton:any = div.querySelector(".new-game");
   firstButton.addEventListener("click", (e) => {
      e.preventDefault()
      const nombre = div.querySelector("input").value
      state.setName(cs.player,nombre)
      state.listenRoom()
   
      if(nombre === "") return alert("Necesito saber tu nombre :D")
      
      if(cs.player === 1) {
         state.signIn()
         .then(() => state.askNewRoom(cs.playerOneId))
         .then(() => state.getRtdbRoomId())
         .then(() => {
            state.setStatus({ player: 1, online:true, start:false, name:nombre })
            state.listenRoom()
            return setTimeout(()=> {
               params.goTo("/wait-player")
            }, 800)
         })
      } else {
         state.getRtdbRoomId()
         state.listenRoom()

         setTimeout(() => {
            if (cs.rtdbData.playerOne && cs.rtdbData.playerTwo ||
               cs.rtdbData.playerOne.name === nombre) {
               return alert("La sala está completa o tu nombre ya esta en uso")
            }  else {
              state.accessToRoom(cs.roomId)
              state.setStatus({ player:2, online: true, start:false, name:nombre})
              .then(() => {
                 state.listenRoom()
                 params.goTo("/instructions")
              })
            }
         }, 2000)
      }
   })
   return div;
}