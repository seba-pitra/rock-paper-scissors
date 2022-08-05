import {rtdb} from "../API/rtdb"
import map from "lodash/map"
import { json } from "express";

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
    init() {
        const lastStorage = localStorage.getItem("state")
        return lastStorage;
    },
    //funciona
    getState() {
        return this.data;
    },
    //Funciona
    setState(newState) {
        this.data = newState;
        for (const cb of this.listeners) {
            cb();  
        }        
        localStorage.setItem("state", JSON.stringify(newState))
        console.log("soy el state,cambié",this.getState());
    },
    //Funciona
    suscribe(cb: (any) => any) {
        this.listeners.push(cb);
    },
    //Funciona
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
    //Crea room. Se ejecuta en "this.signin()" en "player == 1"
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



    //Las siguientes no funcionan si les paso el roomId que esta en la data del state. El "roomId" llega vacio O.o


    //Una vez que existe la room(firestore) con su ID, el 2do jugador podra acceder a ella
    accessToRoom() {
        const cs = this.getState();
        
        fetch(API_BASE_URL + "/new-player", {
            method: "post",
            headers: { 'content-type': "application/json" },
            body: JSON.stringify({
                roomId: "13412",
            })
        })
        .then(res => res.json())
    },
    //¿El otro jugador esta en la sala de instruciones? entonces esta "online:true"
    //¿El 2do jugador apretó jugar? Entonces está "start:true"
    setStatus(params:{ player:number, online:boolean, start:boolean }) {
        const cs = this.getState();
        
        fetch(API_BASE_URL + "/status", {
            method: "post",
            headers: { 'content-type': "application/json" },
            body: JSON.stringify({
                roomId: "12658",
                player: params.player,
                online: params.online,
                start: params.start
            })
        })
    },
    //mandarle al back quien juega(player 1 o 2) y qué eligió.
    setPlay(params: { player:number, choise:string }) {
        const cs = this.getState();
        fetch(API_BASE_URL + "/play", {
            method: "post",
            headers: { 'content-type': "application/json" },
            body: JSON.stringify({
                roomId: "12658",
                player: params.player,
                choise: params.choise
            })
        })
    },
}
