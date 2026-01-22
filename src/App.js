import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import PrivacyPolicy from './components/PrivacyPolicy';
import FormModal from './components/FormModal';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Header onOpenForm={handleOpenForm} />
                <Home onOpenForm={handleOpenForm} />
              </>
            } 
          />
          <Route 
            path="/privacy-policy" 
            element={<PrivacyPolicy />} 
          />
        </Routes>
        <FormModal isOpen={isFormOpen} onClose={handleCloseForm} />
      </div>
    </Router>
  );
}

export default App;