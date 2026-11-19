import { useState } from 'react';
import './App.css';
import './Motion.css';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/sections/Hero.jsx';
import CapabilityStrip from './components/sections/CapabilityStrip.jsx';
import About from './components/sections/About.jsx';
import Services from './components/sections/Services.jsx';
import Systems from './components/sections/Systems.jsx';
import Vision from './components/sections/Vision.jsx';
import Contact from './components/sections/Contact.jsx';

export default function App() {
  const [inquiry, setInquiry] = useState(null);

  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#main">Skip to main content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <div className="landing">
          <Hero />
          <CapabilityStrip />
        </div>
        <About />
        <Services onInquire={topic => setInquiry({ topic })} />
        <Systems onInquire={() => setInquiry({ topic: 'System access' })} />
        <Vision />
        <Contact inquiry={inquiry} />
      </main>
      <Footer />
    </div>
  );
}
