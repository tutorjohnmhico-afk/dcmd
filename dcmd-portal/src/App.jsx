import './App.css';
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
  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#main">Skip to main content</a>
      <Header />
      <main id="main">
        <Hero />
        <CapabilityStrip />
        <About />
        <Services />
        <Systems />
        <Vision />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
