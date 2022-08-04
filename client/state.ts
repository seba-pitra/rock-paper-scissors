type Jugada = "piedra" |"papel" | "tijeras";

const API_BASE_URL = "http://localhost:3000";

export const state = {
    data:{
        playerOneName: "",
        playerTwoName: "",
        rtdbData: {},
        userId: "",
        rtdbRoomId: "",
        roomId: "",
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
    suscribe(cb: (any) => any) {
        this.listeners.push(cb);
    },
    setState(newState) {
        this.data = newState;
        for (const cb of this.listeners) {
            cb();  
        }
    },
    setName(name:string, player:number) {
        const cs = this.getState();
        if (player == 1) {
            cs.playerOneName = name
        }
        if (player == 2) {
            cs.playerTwoName = name
        }
        this.setState(cs)
    },
    async askNewRoom() {
        const cs = this.getState();
        console.log(cs);
        cs.userId = "1muR7dm93AlImDV8BBKe"
        if (true) {
            const res = await fetch(API_BASE_URL + "/rooms",{
                method: "post",
                headers: { 'content-type': "application/json" },
                body: JSON.stringify({ userId: cs.userId })
            })
            const { id } = await res.json()
            cs.roomId = id;
            
            
        }
    },
    getRtdbRoomId() {
        const cs = this.getState();
    },
    //En este metodo si player es 1 va a "/signup". Si es 2 va a hacia "/new-player"
    signIn() {
        const cs = this.getState();
        fetch(API_BASE_URL + "/signup", {
            method: "post",
            headers: { 'content-type': "application/json" },
            body: JSON.stringify({ nombre: cs.playerOneName })
        })
        .then(res => res.json())
        .then((data) => {
            const cs = this.getState()
            cs.userId = data.id 
            this.setState(cs)
        })
    },
    accessToRomm() {
        
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
    //mandarle al back quien juega(player 1 o 2)=> "setPlay"
}
