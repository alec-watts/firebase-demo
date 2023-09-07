import "./App.css";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDTa7vlRL-3091inyzjJlpzkZ_rz_XhGIw",
  authDomain: "superchat-demo-ee2bc.firebaseapp.com",
  projectId: "superchat-demo-ee2bc",
  storageBucket: "superchat-demo-ee2bc.appspot.com",
  messagingSenderId: "1043295652925",
  appId: "1:1043295652925:web:6f9a3b1c2d68b3c67f2e54",
  measurementId: "G-LKLFSZYCD0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);



function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header"></header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function ChatRoom() {

  const messagesRef = collection(db, "messages");
  const query = messagesRef.orderBy('createdAt').limit(25);

  // const [messages] = useCollectionData(query, { idField: 'id' });
  const messages = [];
  
  return (
    <>
      Chat ChatRoom
      <SignOut />
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid } = props.message;

  return <p>{text}</p>;
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => signOut(auth)}>Sign Out</button>
  );
}

export default App;
