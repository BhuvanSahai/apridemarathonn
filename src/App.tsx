import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './views/HomePage';
import { CategoriesPage } from './views/CategoriesPage';
import { RegistrationPage } from './views/RegistrationPage';
import { AboutPage } from './views/AboutPage';
import { AthleteGuidePage } from './views/AthleteGuidePage';
import { RulesPage } from './views/RulesPage';
import { ExpoPage } from './views/ExpoPage';
import { JournalPage } from './views/JournalPage';
import { AdminPage } from './views/AdminPage';

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
