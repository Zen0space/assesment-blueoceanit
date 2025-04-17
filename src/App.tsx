import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import TrainsPage from './pages/TrainList';
import CoachSelectionPage from './pages/CoachSelection';
import SeatSelectionPage from './pages/SeatSelection';
import PaymentPage from './pages/Payment';
import ConfirmationPage from './pages/Confirmation';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trains" element={<TrainsPage />} />
            <Route path="/train/:trainId/coaches" element={<CoachSelectionPage />} />
            <Route path="/train/:trainId/coach/:coachId/seats" element={<SeatSelectionPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
