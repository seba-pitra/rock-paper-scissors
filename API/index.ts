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
      .then(doc => {
        if(doc.exists) { 
            const roomRef = rtdb.ref("rooms/" + uuidv4())
            roomRef.set({
                owner: userId
            })
            .then(() => {
                const roomLongId = roomRef.key;
                const roomId = ( 1000 + Math.floor(Math.random() * 999) ).toString();
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


app.listen(port, () => {
    console.log("El puerto funciona en el numero:" + port);
})
