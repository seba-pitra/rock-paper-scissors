import {rtdb} from "../API/rtdb"
import map from "lodash/map"
import { json } from "express";

type Jugada = "piedra" |"papel" | "tijeras";

const API_BASE_URL = "https://piedra-papel-tijeras-juego.herokuapp.com";

export const state = {
    data:{
        playerName: "",
        playerOneId: "",
        playerTwoName : "",
        rtdbData: {},
        rtdbRoomId: "",
        roomId: "",
        player: "",
        history: {
            playerOne: 0,
            playerTwo: 0
        }
    },
    listeners:[],
    init() {
        const lastStorage = localStorage.getItem("state")
        return lastStorage;
    },
    listenRoom() {
        const cs = this.getState();
        const roomRef = rtdb.ref("/rooms/" + cs.rtdbRoomId)
        return roomRef.on("value", snapshot => {
            const value = snapshot.val()
            cs.rtdbData = value
            this.setState(cs)
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
        })
    },
    getState() {
        return this.data;
    },
    setState(newState) {
        this.data = newState;
        for (const cb of this.listeners) {
            cb();  
        }
        localStorage.setItem("state", JSON.stringify(newState))
    },
    suscribe(cb: (any) => any) {
        this.listeners.push(cb);
    },
    whoWins(myPlay:Jugada, playerTwoPlay:Jugada) {
        if (playerTwoPlay === "piedra" && myPlay === "tijeras") {
            return "perdiste"
        }else if(playerTwoPlay === "papel" && myPlay === "piedra") {
            return "perdiste"
        }else if(playerTwoPlay === "tijeras" && myPlay === "papel") {
            return "perdiste"
        }else if(myPlay === playerTwoPlay) {
            return "empate"
        } else {
            return "ganaste"
        }
    },
    setName(player:number, name:string) {
        const cs = this.getState();
        if (player == 1) {
            cs.playerName = name;
            return this.setState(cs);
        } else if(player == 2) {
            cs.playerTwoName = name;
            return this.setState(cs);
        }
    },
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
    setStatus(params:{ player:number, online?:boolean, start:boolean, name?:string }) {
        const cs = this.getState();
        
        return fetch(API_BASE_URL + "/status", {
            method: "post",
            headers: { 'content-type': "application/json" },
            body: JSON.stringify({
                roomId: cs.roomId,
                player: params.player,
                online: params.online,
                start: params.start,
                name: params.name
            })
        })
    },
    setPlay(params: { player:number, choise:string }) {
        const cs = this.getState();
        return fetch(API_BASE_URL + "/play", {
            method: "post",
            headers: { 'content-type': "application/json" },
            body: JSON.stringify({
                roomId: cs.roomId,
                player: params.player,
                choise: params.choise,
            })
        })
    },    
    setHistory(victories, player) {
        const cs = this.getState()
        
        return fetch(API_BASE_URL + "/history", {
            method: "post",
            headers: { 'content-type': "application/json" },
            body: JSON.stringify({
                rtdbRoomId: cs.rtdbRoomId,
                victories,
                player,
            })
        })
    },
    cleanPlay() {
        const cs = this.getState();
        return fetch(API_BASE_URL + "/clean-play", {
            method: "put",
            headers: { 'content-type': "application/json" },
            body: JSON.stringify({
                rtdbRoomId: cs.rtdbRoomId,
                player: cs.player
            })
        })
    }
}






//Cuando un jugador elige y el otro no, el que no eligio le muestra al que si eligio q su eleccion fue "undefined".
//Estoy pensando en construir una condicional que si uno de los jugadores no eligió nada vuelva a la pagina de "instructions"
//cambiando el state y borrando las choises de cada uno asi no se aparecen cuando no eligen.

//Tambien buscar esa manera de borrar las choises. Tengo que ver la forma de borrar de la base de datos esa eleccion