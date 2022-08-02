import { firestore,rtdb } from "../db";
const usersCollection = firestore.collection("users")

export async function userController(nombre) {
    usersCollection.where("nombre", "==", nombre)
    .get()
    .then(searchResponse => {
        if(searchResponse) {
            usersCollection.add({
                nombre,
            }).then((newUserRef) => {
                const userId = newUserRef.id                
                return { id: userId }
            })
        } else {
            return {
                message: "user alreay exist"
            }
        }
    })
}