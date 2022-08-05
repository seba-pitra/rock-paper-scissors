import {rtdb} from "../API/rtdb"
import map from "lodash/map"

type Jugada = "piedra" |"papel" | "tijeras";

const API_BASE_URL = "http://localhost:3000";

export const state = {
    data:{
        playerOneName: "",
        playerTwoName: "",
        playerOneId: "",
        playerTwoId: "",
        rtdbData: {},
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
    //funciona
    getState() {
        return this.data;
    },
    //Funciona
    suscribe(cb: (any) => any) {
        this.listeners.push(cb);
    },
    //Funciona
    setState(newState) {
        this.data = newState;
        for (const cb of this.listeners) {
            cb();  
        }
        console.log("soy el state,cambié",this.getState());
        
    },
    //Funciona
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
    //Registra los jugadores en firestore(users)
    //Funciona
    signIn(player:number) {
        const cs = this.getState();
        if (player == 1) {
            fetch(API_BASE_URL + "/signup", {
                method: "post",
                headers: { 'content-type': "application/json" },
                body: JSON.stringify({ nombre: cs.playerOneName })
            })
            .then(res => res.json())
            .then(data => {
                cs.playerOneId = data.id;
                this.setState(cs)
                this.askNewRoom()
            })
        }
        if (player == 2) {
            fetch(API_BASE_URL + "/signup", {
                method: "post",
                headers: { 'content-type': "application/json" },
                body: JSON.stringify({ nombre: cs.playerTwoName })
            })
            .then(res => res.json())
            .then((data) => {
                const cs = this.getState()
                cs.playerTwoId = data.id 
                this.setState(cs)
            })
        }
        
    },
    //Crea room. Se ejecuta en "this.signin()"
    //Funciona
    askNewRoom() {
        const cs = this.getState();
        if (cs.playerOneId) {
            fetch(API_BASE_URL + "/rooms",{
                method: "post",
                headers: { 'content-type': "application/json" },
                body: JSON.stringify({ userId: cs.playerOneId })
            })
            .then(res => res.json())
            .then(data => {
                cs.roomId = data.id;
                this.setState(cs)
            })
        }
    },
    //Una vez que existe la room(firestore) con su ID, el 2do jugador podra acceder a ella
    //Funciona. Creo que tanto el endpoint como esta funcion necesitan un nombre.
    //Hasta ahora no subi a la BD ningun nombre
    accessToRoom() {
        const cs = this.getState();
        
        fetch(API_BASE_URL + "/new-player", {
            method: "post",
            headers: { 'content-type': "application/json" },
            body: JSON.stringify({
                roomId: "cs.roomId",
            })
        })
        .then(res => res.json())
    },
    //¿El otro jugador esta en la sala de instruciones? entonces esta "online:true"
    //¿El 2do jugador apretó jugar? Entonces está "start:true"
    setStatus() {

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
    //mandarle al back quien juega(player 1 o 2). No funciona
}
