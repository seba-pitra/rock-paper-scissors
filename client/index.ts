import { initRouter } from "./router";
import { initTextComp } from "./components/text";
import { initBotonComp }from "./components/button";
import {initTijeraComp} from "./components/tijeras";
import { initPiedraComp } from "./components/piedra";
import { initPapelComp } from "./components/papel";
import { initCounterComp } from "./components/counter";
import { state } from "./state";

(function() {
    const root = document.querySelector(".root")
    initRouter(root)
    initTijeraComp();
    initPiedraComp();
    initPapelComp();
    initBotonComp();
    initTextComp();
    initCounterComp();
    
    //PRUEBAS DEL STATE:
    const cs = state.getState();

    //  state.setName("Seba", 1)
    //  state.signIn(1)// => "/signup"
    //  state.signIn(2)

    //  state.accessToRoom()

    // state.setStatus({
    //     player: 1,
    //     online: true,
    //     start: true
    // })
    // state.setStatus({
    //     player: 2,
    //     online: true,
    //     start: true
    // })
    
    // state.setPlay({
    //     player: 1,
    //     choise: "piedra",
    //     name: "Seba"
    // })
    // state.setPlay({
    //     player: 2,
    //     choise: "piedra",
    //     name: "Fede"
    // })
    

    
    

    
    
})()