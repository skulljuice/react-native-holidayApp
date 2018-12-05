import db, { firebaseApp } from "../firebase";

// import firebase from 'firebase';


class Backend {
    uid = '';
    messagesRef = null;
    firestore = null;
    app = null;
    // initialize Firebase Backend
    constructor() {

    }
    setUid(value) {
        this.uid = value;
    }
    getUid() {
        return this.uid;
    }

    // retrieve the messages from the Backend
    loadMessages() {
        return db.collection('messages').get();
    }
    saveActivity(param) {
        return db.collection('activity').add(param);
    }
    // send the message to the Backend
    sendMessage(message) {
        return db.collection('messages').add(message);
    }
    // close the connection to the Backend
    closeChat() {
        if (this.messagesRef) {
            this.messagesRef.off();
        }
    }
}

export default new Backend();