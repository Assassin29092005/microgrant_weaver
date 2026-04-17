import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ButterflyRipple from './components/ui/ButterflyRipple';
import RippleNotice from './components/butterfly/RippleNotice';
import Home from './pages/Home';
import Discover from './pages/Discover';
import ProjectPage from './pages/ProjectPage';
import SubmitProject from './pages/SubmitProject';
import Profile from './pages/Profile';
import HowItWorks from './pages/HowItWorks';
import { useButterflyStore } from './store/butterflyStore';

export default function App() {
  const isRippling = useButterflyStore((s) => s.isRippling);
  const activeRipple = useButterflyStore((s) => s.activeRipple);
  const clearActiveRipple = useButterflyStore((s) => s.clearActiveRipple);
  const fontSizeScale = useButterflyStore((s) => s.settings.font_size_scale);

  return (
    <BrowserRouter>
      <div style={{ fontSize: `${fontSizeScale}rem` }}>
        <Header />

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/project/:id" element={<ProjectPage />} />
            <Route path="/submit" element={<SubmitProject />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
          </Routes>
        </AnimatePresence>

        <Footer />

        {/* Butterfly Effect overlays */}
        <ButterflyRipple
          isVisible={isRippling}
          onComplete={clearActiveRipple}
        />
        <RippleNotice
          ripple={activeRipple}
          onDismiss={clearActiveRipple}
        />
      </div>
    </BrowserRouter>
  );
}
