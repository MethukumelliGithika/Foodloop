import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { FoodProvider } from './context/FoodContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastAlert from './components/ToastAlert';

// Pages
import Home from './pages/Home';
import ExploreFood from './pages/ExploreFood';
import DonateFood from './pages/DonateFood';
import FoodDetails from './pages/FoodDetails';
import MyRescues from './pages/MyRescues';
import ImpactDashboard from './pages/ImpactDashboard';

// Helper to scroll to top whenever navigation changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// 404 Not Found Page
const NotFound = () => (
  <div className="container py-5 text-center my-5">
    <div className="empty-state-box p-5 max-w-500 mx-auto">
      <i className="bi bi-compass text-forest display-1 mb-3 d-block"></i>
      <h2 className="fw-bold text-dark mb-2">Page Not Found</h2>
      <p className="text-secondary mb-4">
        The page you are looking for does not exist or may have been moved.
      </p>
      <a href="/" className="btn btn-forest rounded-pill px-4 py-2">
        <i className="bi bi-house-door me-1.5"></i> Return to Home
      </a>
    </div>
  </div>
);

function App() {
  return (
    <FoodProvider>
      <Router>
        <ScrollToTop />
        <ToastAlert />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<ExploreFood />} />
            <Route path="/donate" element={<DonateFood />} />
            <Route path="/food/:id" element={<FoodDetails />} />
            <Route path="/my-rescues" element={<MyRescues />} />
            <Route path="/impact" element={<ImpactDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </FoodProvider>
  );
}

export default App;
