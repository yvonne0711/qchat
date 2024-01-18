// App.jsx
import React from 'react';
import Registration from './components/Registration';
import { AuthProvider } from './Context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Chats from './components/Chats';
const App = () => {
  return (

      <Router>
      {/* <AuthProvider> */}
        <Routes>
          <Route path="/" Component={Login}/>
          <Route path="/registration" element={<Registration/>}></Route>
          <Route path="/Chats" element={<Chats/>}></Route>
        </Routes>
      {/* </AuthProvider> */}
    </Router>

   
  );
};

export default App;
