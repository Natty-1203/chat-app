import "./chatList.css";
import { useEffect, useState } from "react";
import { AddUser } from "../../addUser/addUser";
import { userStore } from "../../library/userStore";
import { doc, onSnapshot, getDoc, updateDoc } from "firebase/firestore";
import { dataBase } from "../../library/fb";
import { chatStore } from "../../library/chatStore";

export function ChatList() {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const { currentUser } = userStore();
  const { changeChat } = chatStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(dataBase, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chats;
        const promises = items.map(async (item) => {
          const userDocRef = doc(dataBase, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();
          return { ...item, user };
        });
        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );
    userChats[chatIndex].isSeen = true;

    try {
      await updateDoc(doc(dataBase, "userchats", currentUser.id), {
        chats: userChats,
      });
    } catch (err) {
      console.log(err);
    }

    changeChat(chat.chatId, chat.user);
  };

  const filteredChats = chats.filter((chat) =>
    chat.user.username.toLowerCase().includes(inputSearch.toLowerCase())
  );

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input
            type="text"
            placeholder="search"
            onChange={(e) => setInputSearch(e.target.value)}
          />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="plus"
          onClick={() => {
            setAddMode((prev) => !prev);
          }}
        />
      </div>
      {filteredChats.map((chat) => (
        <div
          className="item"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{ backgroundColor: chat?.isSeen ? "transparent" : "#5183fe" }}
        >
          <img
            src={
              chat?.user?.blocked.includes(currentUser.id)
                ? "./avatar.png"
                : chat.user.avatar || "./avatar.png"
            }
            alt="User Avatar"
          />
          <div className="texts">
            <span>
              {chat?.user?.blocked.includes(currentUser.id)
                ? "user"
                : chat.user.username}
            </span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
}
