import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';
import logo from '../assets/logo.png';

const Chats = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchUser = async () => {
      try {
        await axios.get('https://api.chatengine.io/users/me/', {
          headers: {
            'Project-ID': '5f62edf9-dd50-4c2e-b35a-1dfee5ffcd44',
            'User-Name': user.email,
            'User-Secret': user.uid,
          },
        });

        setLoading(false);
      } catch {
        // User does not exist, create user
        const formdata = new FormData();
        formdata.append('email', user.email);
        formdata.append('username', user.email);
        formdata.append('secret', user.uid);

        axios.post(
          'https://api.chatengine.io/users/',
          formdata,
          { headers: { 'Private-Key': '4ee6af7f-2fd7-4c2c-be5e-f569ac48a478' }}
        )
        .then(() => setLoading(false))
        .catch(error => console.error('Error creating user:', error));
      }
    };

    fetchUser();
  }, [user, navigate]);

  if (!user || loading) return 'Loading...';

  return (
    <div className="Chat_page">
      <div className="Chat_Navbar">
        <div className="Logo_tab">
          Welcome to <img src={logo} alt="Logo" style={{ marginRight: '8px' }} /> - CHAT
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
      />
    </div>
  );
};

export default Chats;