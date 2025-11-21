import { arrayRemove, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { chatStore } from "../library/chatStore";
import { userStore } from "../library/userStore";
import { dataBase } from "../library/fb";
import "./detail.css";

export function Detail() {
  const { user, isCurrentUserBlocked, isRecieverUserBlocked, changeBlock } =
    chatStore();
  const { currentUser } = userStore();

  const handleBlock = async () => {
    if (!user) return;
    const userRef = doc(dataBase, "users", currentUser.id);

    try {
      await updateDoc(userRef, {
        blocked: isRecieverUserBlocked
          ? arrayRemove(user.id)
          : arrayUnion(user.id),
      });
      changeBlock();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>user description</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>chat settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>shared photo</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icons" />
            </div>
          </div>

          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icons" />
            </div>
          </div>

          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icons" />
            </div>
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are blocked"
            : isRecieverUserBlocked
            ? "User blocked"
            : "Block User"}
        </button>
        <button className="logout">Log out</button>
      </div>
    </div>
  );
}
