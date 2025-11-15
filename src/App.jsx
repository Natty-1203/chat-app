import { List } from "./components/chatList/list";
import { Chat } from "./components/chat/chat";
import { Detail } from "./components/detail/detail";
import { LogIn } from "./components/login/login";
import { Notification } from "./components/notification/notification";
const App = () => {
  const user = false;
  return (
    <div className="container">
      {user ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <LogIn />
      )}
      <Notification />
    </div>
  );
};

export default App;
