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
    
    //Pruebas del state
    const cs = state.getState();

    state.setName("Seba", 1)
    state.setName("fede", 2)
    state.signIn(1)// => "/signup"
    state.signIn(2)

    state.accessToRoom()
    
    
})()