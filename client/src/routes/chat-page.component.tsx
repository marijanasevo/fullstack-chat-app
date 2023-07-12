import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

type User = {
  name: string;
  email: string;
};

type Chat = {
  isGroupChat: boolean;
  users: User[];
  _id: string;
  chatName: string;
};

const ChatPage = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  const fetchChats = async () => {
    const { data }: { data: Chat[] } = await axios.get(API_URL + '/api/chats');

    setChats(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <ul>
      {chats.map((chat, i) => (
        <li key={i}>- {chat.chatName}</li>
      ))}
    </ul>
  );
};

export default ChatPage;
