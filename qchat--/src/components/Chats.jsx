import React, { useRef, useState, useEffect } from 'react';

//add setLoading as a state field
const [loading, setLoading] = useState(true); //initial value to be true


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
            "project-id": "",
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

        getFile(user.photoUrl)
            .then((avatar) => {
                formdata.append('avatar', avatar, avatar.name)

                //create user
                axios.post('https://api.chatengine.io/users',
                    formdata,
                    { headers: { "private-key": ""}}
                )
                //if user creation was successful
                .then(() => setLoading(false))
                .catch((error) => console.log(error))

            })
    })
//dependency array
}, [user, history]);

if(!user || loading) return 'Loading..';