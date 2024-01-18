import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {ChatEngine} from 'react-chat-engine';
// import firebase from 'firebase/app';
import 'firebase/auth';

import {useAuth} from '../Context/AuthContext';

const Chats= () =>{

    const history = useNavigate();
    const {user} = useAuth();
    //add setLoading as a state field
    const [loading, setLoading] = useState(true); //initial value to be true

    const handleLogout = async()=>{
    await auth.signOut();
    history.push('/');
    }

    //handle user image
    const getFile = async(url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: 'image/jpeg '});
    }


    //useEffect 
    useEffect(() => {
        //if there is no user, call history to push the user to login
        if(!user) {
            history.push('/');

            return;
        }

        //if there is a user, we want the axios get call to the chat engine
        //first parameter is a url seeing if the user has already been created
        axios.get('https://api.chatengine.io/users/me', {
            //options object
            headers: {
                "project-id": "5f62edf9-dd50-4c2e-b35a-1dfee5ffcd44",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        //so our chat engine chat will load
        .then(() => {
            setLoading(false);
        })
        //if we dont have an existing user, create one 
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name)

                    //create user
                    axios.post('https://api.chatengine.io/users',
                        formdata,
                        { headers: { "private-key": "4ee6af7f-2fd7-4c2c-be5e-f569ac48a478"}}
                    )
                    //if user creation was successful
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))

                })
        })
    //dependency array
    }, [user, history]);

    if(!user || loading) return 'Loading..';

    return(
        <div className="Chat_page">
            <div className="Chat_Navbar">
                <div className="Logo_tab">Qchat</div>
                <div onclick={handleLogout} className="logout_tab">Logout</div>
            </div>
            <ChatEngine
            height="calc(100vh-66px)"
            projectID="5f62edf9-dd50-4c2e-b35a-1dfee5ffcd44"
            userName={user.email}
            userSecret={user.uid}
            />
        </div>
    )

}

export default Chats;