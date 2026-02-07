import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
