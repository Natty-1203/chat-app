import "./login.css";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { dataBase, auth } from "../library/fb";
import { toast } from "react-toastify";
import axios from "axios";

export function LogIn() {
  const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_URL;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET;
  const [Loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(form);

    try {
      if (!avatar.file) {
        toast.error("Please select an avatar image.");
        return;
      }

      const formData = new FormData();
      formData.append("file", avatar.file);
      formData.append("upload_preset", uploadPreset);

      const cloudinaryres = await axios.post(cloudinaryUrl, formData);
      const imgUrl = cloudinaryres.data.secure_url;
      console.log("Uploaded:", cloudinaryres.data.secure_url);

      const fireres = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(dataBase, "users", fireres.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: fireres.user.uid,
        blocked: [],
      });

      await setDoc(doc(dataBase, "userchats", fireres.user.uid), {
        chats: [],
      });
    } catch (error) {
      console.log(error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    const { email, password } = Object.fromEntries(form);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("you are logged in successfully");
    } catch (error) {
      console.log(error);
      toast.error("you have error in login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back!</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <button type="submit" disabled={Loading}>
            {Loading ? "Loading..." : "Log In"}
          </button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload the file
          </label>

          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" placeholder="username" name="username" />
          <input type="text" placeholder="email" name="email" />
          <input type="text" placeholder="password" name="password" />
          <button type="submit" disabled={Loading}>
            {Loading ? "Loading..." : "Sign Un"}
          </button>
        </form>
      </div>
    </div>
  );
}
