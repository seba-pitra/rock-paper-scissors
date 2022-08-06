import { state } from "../../state";

export function initGetInSala(params) {
    const div = document.createElement("div");
    div.className = "welcome-container"

    div.innerHTML = `
      <custom-text variant="title">
         Piedra, Papel ó Tijeras
      </custom-text>
      <input class="codigo" placeholder="código"/>
      <custom-boton class="get-in">Ingresar a sala</custom-boton>
      <div class="welcome-hands-container">
         <custom-tijera></custom-tijera>
         <custom-piedra></custom-piedra>
         <custom-papel></custom-papel>
      </div>
    `

    const secondButton:any = div.querySelector(".get-in");
    secondButton.addEventListener("click", (e) => {
      e.preventDefault()
      const cs = state.getState();
      console.log(secondButton.innerHTML);


      params.goTo("./wait-room")
    })

    
    sessionStorage.setItem("me", "0")
    sessionStorage.setItem("machine", "0")

    return div;
}