import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserPage from './pages/userPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserPage />} />
      </Routes>
    </Router>
  );
};

export default App;