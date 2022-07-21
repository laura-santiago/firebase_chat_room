import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCeXdlqKa5Sg5IlD7xzig7dn02F_vqhZZQ",
    authDomain: "chatroom-ae1d4.firebaseapp.com",
    projectId: "chatroom-ae1d4",
    storageBucket: "chatroom-ae1d4.appspot.com",
    messagingSenderId: "244319716749",
    appId: "1:244319716749:web:c274da89d81c35795be9c4"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        const { user } = await signInWithPopup(auth, provider);

        return { uid: user.uid, displayName: user.displayName };
    } catch (error) {
        if (error.code !== 'auth/cancelled-popup-request') {
            console.error(error);
        }
        return null;
    }
}

async function sendMessage(roomId, user, text) {
    try {
        await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
            uid: user.uid,
            displayName: user.displayName,
            text: text.trim(),
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error(error);
    }
}

function getMessages(roomId, callback) {
    return onSnapshot(
        query(
            collection(db, 'chat-rooms', roomId, 'messages'),
            orderBy('timestamp', 'asc')
        ),
        (querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            callback(messages);
        }
    );
}

export { loginWithGoogle, sendMessage, getMessages };