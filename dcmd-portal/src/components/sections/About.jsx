import Arrow from '../Arrow.jsx';
export default function About() {
  return (
    <section className="intro section-pad" id="about"><div className="container intro-grid"><div><p className="eyebrow">01 <span className="eyebrow-divider">/</span> WHO WE ARE</p><h2>Technology<br />that serves <span>people.</span></h2><div className="intro-accent" aria-hidden="true"><span>DCMD</span><span>01 — 05</span></div></div><div className="intro-content"><p className="lead">Building the digital foundation for better public service.</p><p className="intro-justified">The Data Center Management Division (DCMD) manages the City Government's network infrastructure, data center facilities, cybersecurity initiatives, enterprise platforms, and information systems that enable digital governance.</p><p className="intro-justified">Our work supports the essential technologies that help government teams operate securely, consistently, and efficiently.</p><a className="text-link" href="#contact">Connect with our division <Arrow diagonal /></a></div></div></section>
  );
}
