// App.jsx
import React from 'react';
import Registration from './components/Registration';
import { AuthProvider } from './Context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/loginPage';
import Chats from './components/Chats';
import HomePage from './components/HomePage'; // Import HomePage component
import Particale_confiq from './components/Particale_config';
const App = () => {
  return (
    <Router>
      <AuthProvider>
      <Particale_confiq/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;