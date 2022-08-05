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
    // init() {
    //     const lastStorageState = localStorage.getItem("state")
    // },
    // listenRoom() {
    //     const cs = this.getState();
    //     const chatRoomRef = rtdb.ref("/rooms/" + cs.rtdbRoomId)

    //     chatRoomRef.on("value", snapshot => {
    //         const value = snapshot.val()
    //         cs.rtdbData = value
    //         this.setState(cs)
    //         console.log(cs.rtdbData);
            
    //     })
    // },
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
        console.log("soy el state,cambié",this.getState());
        
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
    //Registra los jugadores en firestore(users)
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
    //Crea room
    askNewRoom() {
        const cs = this.getState();
        if (cs.playerOneId) {
            console.log("entra al if");
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
            // const res = await fetch(API_BASE_URL + "/rooms",{
            //     method: "post",
            //     headers: { 'content-type': "application/json" },
            //     body: JSON.stringify({ userId: cs.playerOneId })
            // })
            // const { id } = await res.json()
            // cs.roomId = id;
            // console.log("lo logre? lo logró señor");
        }
    },
    //Una vez que existe la room su ID, el 2do jugador podra acceder a ella
    accessToRoom() {
        const cs = this.getState();
        fetch(API_BASE_URL + "/new-player", {
            method: "post",
            headers: { 'content-type': "application/json" },
            body: JSON.stringify({
                roomId: cs.roomId,
            })
        })
        .then(res => res.json())
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
    setPlay(player:number) {

    }
}
