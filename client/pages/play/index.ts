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
            if (cs.player === 1) {
                state.setStatus({ player: 1, online: true, start: false, name: cs.playerName })
                .then(() => params.goTo("/instruction"))
             } 
             if (cs.player === 2) {
                state.setStatus({ player: 2, online: true, start: false, name: cs.playerTwoName })
                .then(() => params.goTo("/instruction"))
             }
        }
    }
    
    setTimeout(()=> { redireccionar() }, 6000)
    
    
    const cs = state.getState();
    const piedra:any = div.querySelector("custom-piedra");
    const papel:any = div.querySelector("custom-papel");
    const tijera:any = div.querySelector("custom-tijera");

    tijera.addEventListener("click", (e) => {
        papel.style.opacity = "0.4";
        piedra.style.opacity = "0.4";
        
        state.setPlay({ player: cs.player, choise:"tijeras" })
        .then(() => {
            setTimeout(() => {
                params.goTo("/choose")
            }, 3000)
        })
    });
    
    piedra.addEventListener("click", (e) => {
        papel.style.opacity = "0.4";
        tijera.style.opacity = "0.4";

        state.setPlay({ player: cs.player, choise:"piedra" })
        .then( () => {
            setTimeout(() => {
                params.goTo("/choose")
            }, 3000)
        })
    });

    papel.addEventListener("click", (e) => {
        piedra.style.opacity = "0.4";
        tijera.style.opacity = "0.4";


        state.setPlay({ player: cs.player, choise:"papel" })
        .then(() => {
            setTimeout(() => {
                params.goTo("/choose")
            }, 3000)
        })
    })
        
    return div;
    
}
