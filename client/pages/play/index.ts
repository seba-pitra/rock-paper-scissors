import { state } from "../../state"

export function initPlayPage(params) {
    const div = document.createElement("div");
    div.className = "play-container";
    
    div.innerHTML = `
    <counter-comp></counter-comp>
    <div class="play-hands-container">
        <custom-tijera></custom-tijera>
        <custom-piedra></custom-piedra>
        <custom-papel></custom-papel>
    </div>
    `;
    
    function redireccionar() {
        if (location.pathname === "/play") {
            params.goTo("/instruction");
        }
    }
    setTimeout(()=> { redireccionar() },7000)
    
    function machinePlay() {
        const options = ["piedra","papel","tijeras"]
        const choose =  options[Math.floor(Math.random() * options.length)];
        return choose;
    }
    
    const currentState = state.getState();
    const piedra:any = div.querySelector("custom-piedra");
    const papel:any = div.querySelector("custom-papel");
    const tijera:any = div.querySelector("custom-tijera");

    tijera.addEventListener("click", (e) => {
        papel.style.opacity = "0.4";
        piedra.style.opacity = "0.4";
        
        currentState.currentGame.computerPlay = machinePlay(); 
        currentState.currentGame.myPlay = "tijeras";
        state.setState(currentState);
        setTimeout(() => {
            params.goTo("/choose")
        }, 2000)
    });
    
    piedra.addEventListener("click", (e) => {
        papel.style.opacity = "0.4";
        tijera.style.opacity = "0.4";

        currentState.currentGame.computerPlay = machinePlay(); 
        currentState.currentGame.myPlay = "piedra";
        state.setState(currentState);

        setTimeout(() => {
            return params.goTo("/choose")
        }, 2000)
    });

    papel.addEventListener("click", (e) => {
        piedra.style.opacity = "0.4";
        tijera.style.opacity = "0.4";

        currentState.currentGame.computerPlay = machinePlay(); 
        currentState.currentGame.myPlay = "papel";
        state.setState(currentState);

        setTimeout(() => {
            return params.goTo("/choose")
        }, 2000)
    })
        
    return div;
    
}