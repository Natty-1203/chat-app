import "./chat.css"
import { useState, useRef, useEffect } from "react"
import EmojiPicker from "emoji-picker-react"

export function Chat(){
    const [eneble, setEneble] = useState(false);
    const [text, setText] = useState("");
    function handleEmoji(e){
        console.log(e)
        setText(prev=> prev + e.emoji);
        setEneble(false);
    }

    const endRef = useRef(null);
    useEffect(
        ()=>{
            endRef.current?.scrollIntoView({behavior:"smooth"});
        },[])
    return(
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
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="text">
                        <p>bla bla bla bla </p>
                        <span>2 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="text">
                        <p>bla bla bla bla </p>
                        <span>2 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="text">
                        <p>bla bla bla bla </p>
                        <span>2 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="text">
                        <img src="./bg.jpg" alt="" />
                        <p>bla bla bla bla sewwwwwwwwwwwww bhhhhh </p>
                        <span>2 min ago</span>
                    </div>
                </div>
                <div ref={endRef}></div>
            </div>

            <div className="bottom">
                <div className="icons">
                    <img src="./img.png" alt="" />
                    <img src="./camera.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>
                <input type="text" placeholder="Type a message..." value={text} onChange={e=> setText(e.target.value)}/>
                <div className="emojis">
                    <img src="./emoji.png" alt="" onClick={()=>setEneble(prev=> !prev)} />
                    <div className="picker">
                      <EmojiPicker open={eneble} onEmojiClick={handleEmoji} />
                    </div>
                    
                    
                </div>
                <button className="sendButton">sent</button>
            </div>
        </div>
        
        
    )
}