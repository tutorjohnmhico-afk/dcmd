import { useState } from 'react';
import './App.css';
import './Motion.css';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/sections/Hero.jsx';
import CapabilityStrip from './components/sections/CapabilityStrip.jsx';
import About from './components/sections/About.jsx';
import Services from './components/sections/Services.jsx';
import PortalChallenge from './components/sections/PortalChallenge.jsx';
import Systems from './components/sections/Systems.jsx';
import Vision from './components/sections/Vision.jsx';
import Contact from './components/sections/Contact.jsx';
import { QuestProgress } from './components/sections/PortalQuest.jsx';

export default function App() {
  const [inquiry, setInquiry] = useState(null);
  const [earned, setEarned] = useState(null);

  const quest = earned && {
    completed: earned,
    complete(id) {
      setEarned(current => current && !current.includes(id) ? [...current, id] : current);
    },
  };

  return (
    <div className={quest ? 'site-shell quest-active' : 'site-shell'} id="top">
      <a className="skip-link" href="#main">Skip to main content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <div className="landing">
          <Hero quest={quest} onStartQuest={() => setEarned([])} />
          <CapabilityStrip />
        </div>
        <About quest={quest} />
        <Services onInquire={topic => setInquiry({ topic })} />
        <PortalChallenge quest={quest} />
        <Systems quest={quest} onInquire={() => setInquiry({ topic: 'System access' })} />
        <Vision quest={quest} />
        <Contact quest={quest} inquiry={inquiry} />
      </main>
      <Footer />
      {quest && <QuestProgress quest={quest} onExit={() => setEarned(null)} onReplay={() => setEarned([])} />}
    </div>
  );
}
