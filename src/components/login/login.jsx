import { useState } from "react"
import "./login.css"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { setDoc, doc } from "firebase/firestore"
import { dataBase, auth } from "../library/fb"

export function LogIn(){
const [avatar, setAvatar] = useState(
    {
        file: null,
        url:""
    }
)

const handleAvatar = e=>{
    if (e.target.files[0]){
        setAvatar(
            {
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            }
        )
    }
}
const handleRegister =async (e)=>{
    e.preventDefault()
    const form = new FormData(e.target)
    const {username, email, password} = Object.fromEntries(form)

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        await setDoc(doc(dataBase, "users", res.user.uid), {
            username,
            email,
            id: res.user.uid,
            blocked:[]
        });

        await setDoc(doc(dataBase, "userchats", res.user.uid), {
            chats:[]
        });
    }catch (error) {
        console.log(error)
    }

}
const handleLogin = e=>{
    e.preventDefault()
}

    return(
        <div className="login">
            <div className="item">
                <h2>Welcome back!</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="email" name="email" />
                    <input type="password" placeholder="password" name="password" />
                    <button>Sign In</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>Create Account</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={avatar.url || "./avatar.png"} alt="" />
                        Upload the file</label>
                    
                     <input type="file" id="file" style={{display:"none"}} onChange={handleAvatar} />
                     <input type="text" placeholder="username" name="username" />
                    <input type="text" placeholder="email" name="email" />
                    <input type="text" placeholder="password" name="password" />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    )
}