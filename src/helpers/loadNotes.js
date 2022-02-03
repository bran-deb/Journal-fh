// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase/firebase-config";
import { db, getDocs, collection } from "../firebase/firebase-config";

//funcion que se encarga de cargar las notas desde firestore
export const loadNotes = async (uid) => {
    const notesSnap = await getDocs(collection(db, `${uid}/journal/notes`))
    const notes = []
    //llena los datos en notes
    notesSnap.forEach(snapHijo => {
        notes.push({
            id: snapHijo.id,    //id
            ...snapHijo.data()  //title body date
        })
    })
    return notes
};
