import "./chat.css";
import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { dataBase } from "../library/fb";
import { chatStore } from "../library/chatStore";
import { userStore } from "../library/userStore";
import { getDoc } from "firebase/firestore";
import axios from "axios";

export function Chat() {
  const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_URL;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET;
  const [eneble, setEneble] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState(null);
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const { chatId, user, isCurrentUserBlocked, isRecieverUserBlocked } =
    chatStore();
  const { currentUser } = userStore();

  function handleEmoji(e) {
    console.log(e);
    setText((prev) => prev + e.emoji);
    setEneble(false);
  }

  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(dataBase, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const handleSend = async () => {
    if (text === "" && img.file === null) return;
    let imgUrl = null;

    try {
      if (img.file) {
        const formData = new FormData();
        formData.append("file", img.file);
        formData.append("upload_preset", uploadPreset);

        const cloudinaryres = await axios.post(cloudinaryUrl, formData);
        imgUrl = cloudinaryres.data.secure_url;
        console.log("Uploaded:", cloudinaryres.data.secure_url);
      }

      await updateDoc(doc(dataBase, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createAt: Date.now(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIds = [currentUser.id, user.id];
      userIds.forEach(async (id) => {
        const userChatRef = doc(dataBase, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatRef);

        if (userChatsSnapshot.exists()) {
          const userChatData = userChatsSnapshot.data();
          const chatIndex = userChatData.chats.findIndex(
            (c) => c.chatId === chatId
          );
          userChatData.chats[chatIndex].lastMessage = text;
          userChatData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatData.chats[chatIndex].updateAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
    setText("");
    setImg({
      file: null,
      url: "",
    });
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>bla new teta yemilut sewochu </p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="middle">
        {chat?.messages.map((message) => (
          <div
            className={
              message.senderId === currentUser.id ? "message own" : "message"
            }
            key={message?.createAt}
          >
            <div className="text">
              {message.img && <img src={message.img} alt="" />}
              {message.text && <p>{message.text}</p>}
              <span>2 min ago</span>
            </div>
          </div>
        ))}
        <div className="message own">
          <div className="text">{img.file && <img src={img.url} alt="" />}</div>
        </div>
        <div ref={endRef}></div>
      </div>

      <div className="bottom">
        <div className="icons">
          <label htmlFor="imgFill">
            <img src="./img.png" alt="" />
          </label>
          <input
            type="file"
            id="imgFill"
            style={{ display: "none" }}
            onChange={handleImg}
          />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder={
            isCurrentUserBlocked || isRecieverUserBlocked
              ? "You can't send a message"
              : "Type a message..."
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isRecieverUserBlocked}
        />
        <div className="emojis">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setEneble((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={eneble} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button
          className="sendButton"
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isRecieverUserBlocked}
        >
          sent
        </button>
      </div>
    </div>
  );
}
