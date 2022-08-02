type Jugada = "piedra" |"papel" | "tijeras";

export const state = {
    data:{
        currentGame: {
            computerPlay:"",
            myPlay:""
        },
        history: {
            computerPlay: 0,
            myPlay: 0
        }
    },
    listeners:[],
    getState() {
        return this.data;
    },
    setState(newState) {
        this.data = newState;
        for (const cb of this.listeners) {
            cb();  
        }
    },
    suscribe(cb: (any) => any) {
        this.listeners.push(cb);
    },
    whoWins(myPlay:Jugada, computerPlay:Jugada) {
        if (computerPlay === "piedra" && myPlay === "tijeras") {
            return "perdiste"
        }else if(computerPlay === "papel" && myPlay === "piedra") {
            return "perdiste"
        }else if(computerPlay === "tijeras" && myPlay === "papel") {
            return "perdiste"
        }else if(myPlay === computerPlay) {
            return "empate"
        } else {
            return "ganaste"
        }
    },
}
