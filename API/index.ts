import * as express from "express";
import { firestore,rtdb } from "./db";
import * as cors from "cors"
import { v4 as uuidv4} from "uuid"
import { userController } from "./controllers/user-controllers";

const port = process.env.PORT || 3000
const app = express();

const usersCollection = firestore.collection("users")
const roomsCollection = firestore.collection("rooms")

app.use(express.json()) 
app.use(cors())

//agrega user a firestore
//cuando agregue un segundo jugador va a pasar por este endpoint primero 
app.post('/signup', async (req, res) => {
    const {nombre} = req.body
    usersCollection.where("nombre", "==", nombre)
    .get()
    .then(searchResponse => {
        if(searchResponse) {
            usersCollection.add({
                nombre,
            }).then((newUserRef) => {
                const user = newUserRef.id                
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
    const {userId} = req.body
    usersCollection
        .doc(userId)
        .get()
        .then(doc => {
            roomsCollection
               .doc(roomId)
               .get()
               .then(doc => {
                   const rtdbRoom = doc.data()
                   const rtdbRoomId = rtdbRoom.rtdbRoom
                   const roomRef = rtdb.ref("/rooms/" + rtdbRoomId )
                   roomRef.update({
                    playerTwo: userId
                })
                   .then(() => {
                    res.json({
                        message:"ok"
                })
            })
        })     
    })
})

//Vi que marce adentro dela rtdbRoomId pone una propiedad q se llama "current game" q tiene a los dos jugadores adentro
//vuelvo y veo que onda eso, si lo hago o no

//Ahora tengo que acceder al objeto de los players en la rtdb y agregarle los status com online, choise,name y start
app.post("/status", (req,res) => {
    
})

app.listen(port, () => {
    console.log("El puerto funciona en el numero:" + port);
})
