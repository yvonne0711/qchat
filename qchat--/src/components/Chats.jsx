import React from "react";
import { useNavigate } from "react-router-dom";
import {ChatEngine} from 'react-chat-engine';
// import firebase from 'firebase/app';
import 'firebase/auth';

import {useAuth} from '../Context/AuthContext';

const Chats= () =>{

    const history = useNavigate();
    const {user} = useAuth();

    const handleLogout = async()=>{
    await auth.signOut();
    history.push('/');
}

    return(
        <div className="Chat_page">
            <div className="Chat_Navbar">
                <div className="Logo_tab">Qchat</div>
                <div onclick={handleLogout} className="logout_tab">Logout</div>
            </div>
            <ChatEngine
            height="calc(100vh-66px)"
            projectId="5f62edf9-dd50-4c2e-b35a-1dfee5ffcd44"
            userName="."
            userSecret="."
            />
        </div>
    )

}

export default Chats