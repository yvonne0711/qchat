// App.jsx
import React from 'react';
import Registration from './components/Registration';
import { AuthProvider } from './Context/AuthContext';


const App = () => {
  return (
    <div>
      <h1>Your App</h1>
      <Registration />
      {/* Other components or content */}
    </div>
  );
};

export default App;
