import "./list.css"
import { UserInfo } from "./userInfo/userInfo"
import { ChatList } from "./userChatList/chatList"

export function List(){
    return(
        <div className="list">
            <UserInfo />
            <ChatList />
        </div>
        
        
    )
}