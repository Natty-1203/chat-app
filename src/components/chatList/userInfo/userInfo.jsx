import "./userInfo.css"
import {userStore} from "../../library/userStore";

export function UserInfo(){
    const {currentUser} = userStore();
    return(
        <div className="userInfo">
            <div className="user">
                <img src={currentUser.avatar || "./avatar.png"} alt="" />
                <h2>{currentUser.username || "John Doe"}</h2>
            </div>
            <div className="icons">
                <img src="./more.png" alt="" />
                <img src="./video.png" alt="" />
                <img src="./edit.png" alt="" />
            </div>
        </div>
        
        
    )
}