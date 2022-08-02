export function initPageWelcome(params) {
    const div = document.createElement("div");
    div.className = "welcome-container"

    div.innerHTML = `
      <custom-text variant="title">
         Piedra, Papel ó Tijeras
      </custom-text>
      <custom-boton>Empezar</custom-boton>
      <div class="welcome-hands-container">
         <custom-tijera></custom-tijera>
         <custom-piedra></custom-piedra>
         <custom-papel></custom-papel>
      </div>
    `

    const button:any = div.querySelector("custom-boton");
    button.addEventListener("click", (e) => {
      e.preventDefault()
      params.goTo("./instruction")
    })
    
    sessionStorage.setItem("me", "0")
    sessionStorage.setItem("machine", "0")

    return div;
}