import * as express from "express";
import { firestore,rtdb } from "./db";
import * as cors from "cors"
import { v4 as uuidv4} from "uuid"
import { userController } from "./controllers/user-controllers";

const port = process.env.PORT || 3000
const app = express();

const usersCollection = firestore.collection("users")
const roomsCollection = firestore.collection("rooms")

app.use(cors())
app.use(express.json()) 
app.use(express.static("dist"))

//agrega user a firestore
//cuando agregue un segundo jugador va a pasar por este endpoint primero para obtener el userId para interactuar en "/new-player"
app.post('/signup', async (req, res) => {
    const {nombre} = req.body
    usersCollection.where("nombre", "==", nombre)
    .get()
    .then(searchResponse => {
        if(searchResponse) {
            usersCollection.add({ 
                nombre,
            }).then((newUserRef) => {
                res.json({
                    id: newUserRef.id,
                    new:true
                })
            })
        } else {
            res.json({
                message: "user already exist"
            })
        }
    })
});

//agrega una room rt a firestore
app.post('/rooms', (req, res) => {
    const {userId} = req.body
    usersCollection
      .doc(userId.toString())
      .get()
      .then(docUser => {
        if(docUser.exists) { 
            const roomRef = rtdb.ref("rooms/" + uuidv4())
            roomRef.set({
                playerOne: userId
            })
            .then(() => {
                const roomLongId = roomRef.key;
                const roomId = ( 10000 + Math.floor(Math.random() * 9999) ).toString();
                roomsCollection
                   .doc(roomId)
                   .set({
                    rtdbRoom: roomLongId
                   })
                   .then(() => {
                       res.json({
                          id: roomId
                       })
                   })    
            }) 
        } else {
            res.status(401).json({
                message:"no existe"
            })
        }
    });
});

//consigue el id de rtdbroom
app.post('/rtdbRoomId', (req, res) => {
    const {roomId} = req.body
    roomsCollection
        .doc(roomId)
        .get()
        .then(doc => {
            const rtdbRoomId = doc.data()
            if (!rtdbRoomId) {
                throw new Error()
            }   
            return res.json(rtdbRoomId)
        }).catch(err => {
            return res.status(401).send("Room inexistente")
        })
});

// agrega segundo jugador a rtdbRoom
app.post('/new-player', (req,res) => {
    const {roomId} = req.body;
    roomsCollection
    .doc(roomId)
    .get()
    .then(doc => {
        const rtdbRoom = doc.data()
        const rtdbRoomId = rtdbRoom.rtdbRoom
        const roomRef = rtdb.ref("/rooms/" + rtdbRoomId)
        roomRef.update({
        playerTwo: "new Player"
        })
        .then(() => {
            res.json({
                message:"ok"
            })
        })
    })     
})

//agregar los status (online y start) a los players
app.post("/status", (req,res) => {
    const roomId =  req.body.roomId
    const {player} = req.body
    const {online} = req.body
    const {start} = req.body
    const {name} = req.body
    
    roomsCollection
        .doc(roomId)
        .get()
        .then(doc => {
            if (player == 1) {
                const rtdbRoom = doc.data()
                const rtdbRoomId = rtdbRoom.rtdbRoom
                const roomRef = rtdb.ref("/rooms/" + rtdbRoomId + "/playerOne");
                roomRef.update({
                    online: Boolean(online),
                    start: Boolean(start),
                    name: name
                })    
            }
            if (player == 2) {
                const rtdbRoom = doc.data()
                const rtdbRoomId = rtdbRoom.rtdbRoom
                const roomRef = rtdb.ref("/rooms/" + rtdbRoomId + "/playerTwo");
                roomRef.update({
                    online: Boolean(online),
                    start: Boolean(start),
                    name: name
                })    
            }
        }).then(() => res.json({ message: "ok" }))
})

//Agrega lo que eligio el jugador ("piedra, papel o tijera"). La eleccion la recibo en "req.body"
app.post("/play", (req,res) => {
    const {roomId} = req.body
    const {player} = req.body
    const {choise} = req.body
    const {name} = req.body

    roomsCollection
        .doc(roomId)
        .get()
        .then(doc => {
            if (player == 1) {
                const rtdbRoom = doc.data()
                const rtdbRoomId = rtdbRoom.rtdbRoom
                const roomRef = rtdb.ref("/rooms/" + rtdbRoomId + "/playerOne");
                roomRef.update({
                    choise: choise,
                    name: name
                })    
            }
            if (player == 2) {
                const rtdbRoom = doc.data()
                const rtdbRoomId = rtdbRoom.rtdbRoom
                const roomRef = rtdb.ref("/rooms/" + rtdbRoomId + "/playerTwo");
                roomRef.update({
                    choise: choise,
                    name: name
                })    
            }
        }).then(() => res.json({ message: "ok" }))
})

app.listen(port, () => {
    console.log("El puerto funciona en el numero:" + port);
})
