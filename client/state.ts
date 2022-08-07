import {rtdb} from "../API/rtdb"
import map from "lodash/map"
import { json } from "express";

type Jugada = "piedra" |"papel" | "tijeras";

const API_BASE_URL = "http://localhost:3000";

export const state = {
    data:{
        playerName: "",
        playerOneId: "",
        rtdbData: {},
        rtdbRoomId: "",
        roomId: "",
        player: "",
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
    //Necesito el rtdbRoomId para "listenRoom()"
    listenRoom() {
        const cs = this.getState();
        const roomRef = rtdb.ref("/rooms/" + cs.rtdbRoomId)
        return roomRef.on("value", snapshot => {
            const value = snapshot.val()
            cs.rtdbData = value
            this.setState(cs)
            console.log("cambió la rtdb: ", value);
        })
    },
    getRtdbRoomId() {
        const cs = this.getState()
        return fetch(API_BASE_URL + "/rtdbRoomId", {
            method: "post",
            headers: { 'content-type': "application/json" },
            body: JSON.stringify({ roomId: cs.roomId })
        })
        .then(res => res.json())
        .then(data => {
            const {rtdbRoom} = data;
            cs.rtdbRoomId = rtdbRoom;
            this.setState(cs)
            console.log("paso por getRtdbRoomId()");
            
        })
    },
    //Funciona
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
    //Setea los names en la data
    //Funciona
    setName(name:string) {
        const cs = this.getState();
        cs.playerName = name
        this.setState(cs)
    },
    //Registra los jugadores en firestore(users)
    //Funciona
    signIn() {
        const cs = this.getState();
        return fetch(API_BASE_URL + "/signup", {
            method: "post",
            headers: { 'content-type': "application/json" },
            body: JSON.stringify({ nombre: cs.playerName })
        })
        .then(res => res.json())
        .then(data => {
            const {id} = data
            cs.playerOneId = id;
            this.setState(cs)
            return id
        })
    },
    //Crea room.
    //Funciona
    askNewRoom(playerId:string) {
        const cs = this.getState();
        if (playerId) {
            return fetch(API_BASE_URL + "/rooms",{
                method: "post",
                headers: { 'content-type': "application/json" },
                body: JSON.stringify({ userId: playerId })
            })
            .then(res => res.json())
            .then(data => {
                cs.roomId = data.id;
                this.setState(cs)
            })
        }
    },
    //Una vez que existe la room(firestore) con su ID, el 2do jugador podra acceder a ella
    accessToRoom(roomId) {
        return fetch(API_BASE_URL + "/new-player", {
            method: "post",
            headers: { 'content-type': "application/json" },
            body: JSON.stringify({
                roomId: roomId,
            })
        })
        .then(res => res.json())
    },
    //¿El otro jugador esta en la sala de instruciones? entonces esta "online:true"
    //¿El 2do jugador apretó jugar? Entonces está "start:true"
    setStatus(params:{ player:number, online:boolean, start:boolean }) {
        const cs = this.getState();
        
        return fetch(API_BASE_URL + "/status", {
            method: "post",
            headers: { 'content-type': "application/json" },
            body: JSON.stringify({
                roomId: cs.roomId,
                player: params.player,
                online: params.online,
                start: params.start
            })
        })
    },
    //mandarle al back quien juega(player 1 o 2) y qué eligió.
    setPlay(params: { player:number, choise:string,name:string }) {
        const cs = this.getState();
        fetch(API_BASE_URL + "/play", {
            method: "post",
            headers: { 'content-type': "application/json" },
            body: JSON.stringify({
                roomId: "11301",
                player: params.player,
                choise: params.choise,
                name: params.name
            })
        })
    },
}
