import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { AboutPage } from './pages/AboutPage';
import { AthleteGuidePage } from './pages/AthleteGuidePage';
import { RulesPage } from './pages/RulesPage';
import { ExpoPage } from './pages/ExpoPage';
import { JournalPage } from './pages/JournalPage';
import { AdminPage } from './pages/AdminPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/athlete" element={<AthleteGuidePage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/expo" element={<ExpoPage />} />
            <Route path="/blog" element={<JournalPage />} />
            <Route path="/blog/:slug" element={<JournalPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
