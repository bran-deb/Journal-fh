import {
    db,
    doc,
    setDoc,
    collection,
} from "../../firebase/firebase-config";

//inicia una nueva nota
export const startNewNote = () => {
    //getState es como el useSelector optiene el state
    return async (dispatch, getState) => {
        // const { uid } = getState().auth.uid
        const { uid } = getState().auth
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }
        //db contiene la referencia a firestore, seguido el path
        const ref = doc(collection(db, `${uid}/journal/notes`))
        //escribe nueva nota a la referencia(firestore)
        await setDoc(ref, newNote)
    }
};
