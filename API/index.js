"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
const usersCollection = db_1.firestore.collection("users");
const roomsCollection = db_1.firestore.collection("rooms");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static("dist"));
app.post('/signup', async (req, res) => {
    const { nombre } = req.body;
    usersCollection.where("nombre", "==", nombre)
        .get()
        .then(searchResponse => {
        if (searchResponse) {
            usersCollection.add({
                nombre,
            }).then((newUserRef) => {
                res.json({
                    id: newUserRef.id,
                    new: true
                });
            });
        }
        else {
            res.json({
                message: "user already exist"
            });
        }
    });
});
app.post('/rooms', (req, res) => {
    const { userId } = req.body;
    usersCollection
        .doc(userId.toString())
        .get()
        .then(docUser => {
        if (docUser.exists) {
            const roomRef = db_1.rtdb.ref("rooms/" + (0, uuid_1.v4)());
            roomRef.set({
                playerOne: userId
            })
                .then(() => {
                const roomLongId = roomRef.key;
                const roomId = (10000 + Math.floor(Math.random() * 9999)).toString();
                roomsCollection
                    .doc(roomId)
                    .set({
                    rtdbRoom: roomLongId
                })
                    .then(() => {
                    res.json({
                        id: roomId
                    });
                });
            });
        }
        else {
            res.status(401).json({
                message: "no existe"
            });
        }
    });
});
app.post('/rtdbRoomId', (req, res) => {
    const { roomId } = req.body;
    roomsCollection
        .doc(roomId)
        .get()
        .then(doc => {
        const rtdbRoomId = doc.data();
        if (!rtdbRoomId) {
            throw new Error();
        }
        return res.json(rtdbRoomId);
    }).catch(err => {
        return res.status(401).send("Room inexistente");
    });
});
app.post('/new-player', (req, res) => {
    const { roomId } = req.body;
    roomsCollection
        .doc(roomId)
        .get()
        .then(doc => {
        const rtdbRoom = doc.data();
        const rtdbRoomId = rtdbRoom.rtdbRoom;
        const roomRef = db_1.rtdb.ref("/rooms/" + rtdbRoomId);
        roomRef.update({
            playerTwo: "new Player"
        })
            .then(() => {
            res.json({
                message: "ok"
            });
        });
    });
});
app.post("/status", (req, res) => {
    const roomId = req.body.roomId;
    const { player } = req.body;
    const { online } = req.body;
    const { start } = req.body;
    const { name } = req.body;
    roomsCollection
        .doc(roomId)
        .get()
        .then(doc => {
        if (player == 1) {
            const rtdbRoom = doc.data();
            const rtdbRoomId = rtdbRoom.rtdbRoom;
            const roomRef = db_1.rtdb.ref("/rooms/" + rtdbRoomId + "/playerOne");
            roomRef.update({
                online: Boolean(online),
                start: Boolean(start),
                name: name
            });
        }
        if (player == 2) {
            const rtdbRoom = doc.data();
            const rtdbRoomId = rtdbRoom.rtdbRoom;
            const roomRef = db_1.rtdb.ref("/rooms/" + rtdbRoomId + "/playerTwo");
            roomRef.update({
                online: Boolean(online),
                start: Boolean(start),
                name: name
            });
        }
    }).then(() => res.json({ message: "ok" }));
});
app.post("/play", (req, res) => {
    const { roomId } = req.body;
    const { player } = req.body;
    const { choise } = req.body;
    const { name } = req.body;
    roomsCollection
        .doc(roomId)
        .get()
        .then(doc => {
        if (player == 1) {
            const rtdbRoom = doc.data();
            const rtdbRoomId = rtdbRoom.rtdbRoom;
            const roomRef = db_1.rtdb.ref("/rooms/" + rtdbRoomId + "/playerOne");
            roomRef.update({
                choise: choise,
            });
        }
        if (player == 2) {
            const rtdbRoom = doc.data();
            const rtdbRoomId = rtdbRoom.rtdbRoom;
            const roomRef = db_1.rtdb.ref("/rooms/" + rtdbRoomId + "/playerTwo");
            roomRef.update({
                choise: choise,
            });
        }
    }).then(() => res.json({ message: "ok" }));
});
app.listen(port, () => {
    console.log("El puerto funciona en el numero:" + port);
});
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../dist/index.html"));
});
