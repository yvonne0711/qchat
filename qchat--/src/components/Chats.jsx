// Chats.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatEngine, IsTyping, ChatList, NewMessageForm, ChatFeed } from 'react-chat-engine';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';

import logo from '../assets/logo.png';

const Chats = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [chatInitialized, setChatInitialized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [socket, setSocket] = useState(null); 

  const handleLogout = async () => {
    try {
      if (user && signOut) {
        await signOut();
        disconnectChatEngineWebSocket(); 
      } else {
        console.error('Error: signOut function is not available or user object is null.');
      }
      navigate('/');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  const disconnectChatEngineWebSocket = () => {
    
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
    }
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' });
  };

  const connectToChatEngineWebSocket = () => {
    const newSocket = new WebSocket(
      `wss://api.chatengine.io/person/?publicKey=5f62edf9-dd50-4c2e-b35a-1dfee5ffcd44&username=${user.email}&secret=${user.uid}`
    );

    newSocket.onopen = (event) => console.log('WebSocket connected:', event);
    newSocket.onclose = (event) => console.log('WebSocket closed:', event);
    newSocket.onmessage = (event) => {
      console.log('WebSocket message:', event);
      const messageData = JSON.parse(event.data);
      if (messageData.event === 'typing_indicator') {
        setIsTyping(messageData.data.is_typing);
      }
    };
    newSocket.onerror = (error) => console.error('WebSocket error:', error);

    setSocket(newSocket); 
  };

  const refreshChat = () => {
    console.log('Chat refreshed');
  };

  const startTyping = async (chatID) => {
    const myHeaders = new Headers();
    myHeaders.append('Project-ID', '5f62edf9-dd50-4c2e-b35a-1dfee5ffcd44');
    myHeaders.append('User-Name', user.email);
    myHeaders.append('User-Secret', user.uid);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    try {
      await fetch(`https://api.chatengine.io/chats/${chatID}/typing/`, requestOptions);
    } catch (error) {
      console.log('Error while sending typing indicator:', error);
    }
  };

  const createChat = async () => {
    const myHeaders = new Headers();
    myHeaders.append('Project-ID', '5f62edf9-dd50-4c2e-b35a-1dfee5ffcd44');
    myHeaders.append('User-Name', user.email);
    myHeaders.append('User-Secret', user.uid);

    const raw = JSON.stringify({
      title: 'Surprise Party',
      is_direct_chat: false,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      const response = await fetch('https://api.chatengine.io/chats/', requestOptions);
      const result = await response.json();
      console.log(result);
      await addChatMember(result.id, 'bob_baker');
    } catch (error) {
      console.log('Error while creating a chat:', error);
    }
  };

  const addChatMember = async (chatID, username) => {
    const myHeaders = new Headers();
    myHeaders.append('Project-ID', '5f62edf9-dd50-4c2e-b35a-1dfee5ffcd44');
    myHeaders.append('User-Name', user.email);
    myHeaders.append('User-Secret', user.uid);

    const raw = JSON.stringify({
      username,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      const response = await fetch(`https://api.chatengine.io/chats/${chatID}/people/`, requestOptions);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log('Error while adding a chat member:', error);
    }
  };

  useEffect(() => {
    async function setupChatEngine() {
      if (!user) {
        navigate('/');
        return;
      }

      try {
        await axios.get('https://api.chatengine.io/users/me/', {
          headers: {
            'Project-ID': '5f62edf9-dd50-4c2e-b35a-1dfee5ffcd44',
            'User-Name': user.email,
            'User-Secret': user.uid,
          },
        });

        setLoading(false);
        setChatInitialized(true);
        connectToChatEngineWebSocket();
      } catch (error) {
        let formData = new FormData();
        formData.append('email', user.email);
        formData.append('username', user.email);
        formData.append('secret', user.uid);

        try {
          const avatar = await getFile(user.photoURL);
          formData.append('avatar', avatar, avatar.name);

          await axios.post(
            'https://api.chatengine.io/users/',
            formData,
            {
              headers: {
                'private-key': '4ee6af7f-2fd7-4c2c-be5e-f569ac48a478',
              },
            }
          );

          setLoading(false);
          setChatInitialized(true);
          connectToChatEngineWebSocket();
        } catch (error) {
          console.log(error);
        }
      }
    }

    setupChatEngine();

    
    return () => {
      disconnectChatEngineWebSocket();
    };
  }, [user, navigate]);

  if (!user || loading || !chatInitialized) return 'Loading...';

  return (
    <div className="Chat_page">
      <div className="Chat_Navbar">
        <div className="Logo_tab">
          <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '8px' }} />
          Chat
        </div>
        <div onClick={handleLogout} className="logout_tab">
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="5f62edf9-dd50-4c2e-b35a-1dfee5ffcd44"
        userName={user.email}
        userSecret={user.uid}
        onNewMessage={() => refreshChat()}
        onTyping={(data) => setIsTyping(data.is_typing)}
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        renderChatList={(chatAppProps) => <ChatList {...chatAppProps} />}
        renderNewMessageForm={(chatAppProps) => <NewMessageForm {...chatAppProps} />}
      >
        <IsTyping>{isTyping && 'Someone is typing...'}</IsTyping>
        
      </ChatEngine>
    </div>
  );
};

export default Chats;
