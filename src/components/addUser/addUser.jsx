import {
  collection,
  query,
  where,
  getDocs,
  doc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import { dataBase } from "../library/fb";
import { useState } from "react";
import { userStore } from "../library/userStore";
import "./addUser.css";

export function AddUser() {
  const [user, setUser] = useState(null);
  const { currentUser } = userStore();
  const handleSearch = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const username = form.get("username");

    try {
      const userRef = collection(dataBase, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(dataBase, "chats");
    const userChatsRef = collection(dataBase, "userchats");

    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          receiverId: currentUser.id,
          lastMessage: "",
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          receiverId: user.id,
          lastMessage: "",
          updatedAt: Date.now(),
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="user name" name="username" />
        <button>search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "./avatar.png"} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
}
