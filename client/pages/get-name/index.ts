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
         
   const firstButton:any = div.querySelector(".new-game");
      
   firstButton.addEventListener("click", async (e) => {
      e.preventDefault()

      const nombre = div.querySelector("input").value
      const cs = state.getState();
      
      state.setName(1,nombre)


      state.signIn()
      .then(async()=> {
         await state.askNewRoom(cs.playerOneId)
         await state.getRtdbRoomId()
         .then(async () => {
            await state.setStatus({ player: 1, online:true, start:false })
            state.listenRoom()
            setTimeout(async ()=> {
               params.goTo("./wait-player")
            }, 800)
         })
      })
   })
    return div;
}