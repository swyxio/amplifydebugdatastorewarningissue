
import React from "react";
import { DataStore } from "@aws-amplify/datastore";
import { User, Message } from "./models";
import { Chat } from "react-demos";
// import Amplify from 'aws-amplify';
// import awsconfig from './aws-exports';
// Amplify.configure(awsconfig);

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [usersOnline, setUsersOnline] = React.useState([]);
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    fetchMessage();
    DataStore.observe(Message).subscribe(fetchMessage);
  }, []);
  React.useEffect(() => {
    fetchMessage();
    DataStore.observe(User).subscribe(() => 
      DataStore.query(User).then(setUsersOnline)
    );
  }, []);
  async function fetchMessage() {
    const _Messages = await DataStore.query(Message);
    setMessages(_Messages);
  }

  async function loginUser(name) {
    const user = await DataStore.save(new User({ name, isOnline: true }));
    setCurrentUser(user);
  }
  async function sendMessage(text) {
    await DataStore.save(
      new Message({
        user: currentUser.name,
        text,
      })
    );
  }

  return (
    <div>
      <Chat
        {...{
          currentUser,
          sendMessage,
          loginUser,
          messages,
          usersOnline,
        }}
      />
    </div>
  );
}

export default App;