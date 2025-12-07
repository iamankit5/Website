import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Schedule from './pages/Schedule';
import Speakers from './pages/Speakers';
import Registration from './pages/Registration';
import Contact from './pages/Contact';
import Footer from './components/Footer/Footer';
import SuccessPage from './components/SuccessPage';
import './App.css';

// Function to create floating particles
const createParticles = () => {
  const particlesContainer = document.querySelector('.particles-container');
  if (!particlesContainer) return;

  // Clear existing particles
  particlesContainer.innerHTML = '';

  // Create new particles
  const particleCount = 30;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size between 2px and 8px
    const size = Math.random() * 6 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation duration between 10s and 30s
    const duration = Math.random() * 20 + 10;
    particle.style.animationDuration = `${duration}s`;
    
    // Random delay
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    particlesContainer.appendChild(particle);
  }
};

function App() {
  useEffect(() => {
    createParticles();
    
    // Recreate particles on resize
    const handleResize = () => {
      createParticles();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Particle Background */}
        <div className="particles-container"></div>
        
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;