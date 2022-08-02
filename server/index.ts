import * as express from "express";
import { firestore,rtdb } from "./db";
import * as cors from "cors"
import { v4 as uuidv4} from "uuid"

const port = process.env.PORT || 3000

const app = express();

app.use(express.json()) 
app.use(cors())

app.post('/users', (req, res) => {
    console.log(port);
    res.json(port)
});


app.listen(port, () => {
    console.log("El puerto funciona en el numero:" + port);
})
