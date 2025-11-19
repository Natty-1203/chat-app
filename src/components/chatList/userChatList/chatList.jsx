import "./chatList.css"
import { useEffect, useState } from "react"
import { AddUser } from "../../addUser/addUser"
import { userStore } from "../../library/userStore";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { dataBase } from "../../library/fb";

export function ChatList(){
const [addMode, setAddMode] =useState(false);
const [chats, setChats] = useState([])
const {currentUser} = userStore()

useEffect(()=>{
    const unSub = onSnapshot(doc(dataBase, "userchats", currentUser.id), async (res)=>{
        const items =res.data().chats;
        const promises = items.map(async (item)=>{
            const userDocRef = doc(dataBase, "users", item.receiverId);
            const userDocSnap = await getDoc(userDocRef);

            const user = userDocSnap.data();
            return {...item, user};
        })
        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b)=> b.updatedAt - a.updatedAt)); 
    });
    return ()=>{
        unSub()
    }
}, [currentUser.id])



    return(
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt="" />
                    <input type="text" placeholder="search" />
                </div>
                <img src={addMode ? "./minus.png" : "./plus.png"} alt="" className="plus"
                onClick={()=>{setAddMode((prev)=> !prev)}} />
            </div>
           {chats.map((chat) => (
            <div className="item" key={chat.chatId}>
                <img src={chat.user.avatar} alt="User Avatar" />
                <div className="texts">
                    <span>{chat.user.username}</span>
                    <p>{chat.lastMessage}</p>
                </div>
            </div>
           ))}

           
            {addMode && <AddUser />}
        </div>
        
        
    )
}