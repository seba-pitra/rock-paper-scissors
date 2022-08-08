import { state } from "../../state";

export function initPageWelcome(params) {
  const cs = state.getState();
  

    const div = document.createElement("div");
    div.className = "welcome-container"

    div.innerHTML = `
      <custom-text variant="title">
         Piedra, Papel ó Tijeras
      </custom-text>
      <custom-boton class="new-game">Nuevo Juego</custom-boton>
      <custom-boton class="get-in">Ingresar a sala</custom-boton>
      <div class="welcome-hands-container">
         <custom-tijera></custom-tijera>
         <custom-piedra></custom-piedra>
         <custom-papel></custom-papel>
      </div>
    `

    const firstButton:any = div.querySelector(".new-game");
    firstButton.addEventListener("click", (e) => {
      e.preventDefault()
      
      cs.player = 1
      state.setState(cs)

      params.goTo("/get-name")
    })

    const secondButton:any = div.querySelector(".get-in");
    secondButton.addEventListener("click", (e) => {
      e.preventDefault()

      cs.player = 2
      state.setState(cs)

      params.goTo("/get-in")
    })
    
    sessionStorage.setItem("me", "0")
    sessionStorage.setItem("machine", "0")

    return div;
}