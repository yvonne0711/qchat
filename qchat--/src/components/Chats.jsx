// Chats.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Corrected import
import { ChatEngine } from 'react-chat-engine';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';

const Chats = () => {
  const navigate = useNavigate(); 
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    // Add your logout logic here
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' });
  };

  useEffect(() => {
    const setupChatEngine = async () => {
      if (!user) {
        navigate('/'); 
        return;
      }

      try {
        await axios.get('https://api.chatengine.io/users/me', {
          headers: {
            'project-id': '5f62edf9-dd50-4c2e-b35a-1dfee5ffcd44',
            'User-Name': user.email,
            'User-Secret': user.uid,
          },
        });

        setLoading(false);
      } catch (error) {
        let formData = new FormData();
        formData.append('email', user.email);
        formData.append('username', user.email);
        formData.append('secret', user.uid);

        try {
          const avatar = await getFile(user.photoURL);
          formData.append('avatar', avatar, avatar.name);

          await axios.post(
            'https://api.chatengine.io/users',
            formData,
            {
              headers: {
                'private-key': '4ee6af7f-2fd7-4c2c-be5e-f569ac48a478',
              },
            }
          );

          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };

    setupChatEngine();
  }, [user, navigate]); 

  if (!user || loading) return 'Loading...';

  return (
    <div className="Chat_page">
      <div className="Chat_Navbar">
        <div className="Logo_tab">Qchat</div>
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
