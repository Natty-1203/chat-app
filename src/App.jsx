import { useEffect } from "react";
import { List } from "./components/chatList/list";
import { Chat } from "./components/chat/chat";
import { Detail } from "./components/detail/detail";
import { LogIn } from "./components/login/login";
import { Notification } from "./components/notification/notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/library/fb";
import { userStore } from "./components/library/userStore";
import { chatStore } from "./components/library/chatStore";
const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = userStore();
  const { chatId } = chatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      fetchUserInfo(currentUser?.uid);
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);
  console.log("Current user:", currentUser);
  if (isLoading) return <div className="loading">Loading...</div>;
  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <LogIn />
      )}
      <Notification />
    </div>
  );
};

export default App;
