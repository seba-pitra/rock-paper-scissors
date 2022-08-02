export function initInstrucionsPage(params) {
    const div = document.createElement("div");
    div.className = "instructions-container"
    
    div.innerHTML = `
    <custom-text>
       Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los segundos.
    </custom-text>
    <custom-boton>¡Jugar!</custom-boton>
    <div class="play-hands-container">
        <custom-tijera></custom-tijera>
        <custom-piedra></custom-piedra>
        <custom-papel></custom-papel>
    </div>
    `

    const button:any = div.querySelector("custom-boton");
    button.addEventListener("click", (e) => {
      e.preventDefault()
      params.goTo("/play")
    })
    
    return div;
}