import Arrow from '../Arrow.jsx';
import { QuestPuzzle } from './PortalQuest.jsx';

const objectives = [
  ['Connect city offices', 'Maintain the network infrastructure that lets city teams work together.', '#services'],
  ['Support government systems', 'Help keep the enterprise platforms behind city operations available.', '#systems'],
  ['Protect service continuity', 'Use security controls, backups, and recovery planning to reduce disruption.', '#service-04'],
];

export default function About({ quest }) {
  return (
    <section className="intro section-pad" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="intro-grid">
          <div>
            <p className="eyebrow">01 <span className="eyebrow-divider">/</span> WHO WE ARE</p>
            <h2 id="about-title">Technology<br />that serves <span>people.</span></h2>
          </div>
          <div className="intro-content">
            <p className="lead">Building the digital foundation for better public service.</p>
            <p>The Data Center Management Division manages the City Government of Butuan’s networks, data center, cybersecurity, and enterprise platforms.</p>
          </div>
        </div>
        <div className="objective-grid">
          {objectives.map(([title, description, href]) => (
            <a className="objective-link" key={href} href={href}>
              <strong>{title} <Arrow diagonal /></strong>
              <span>{description}</span>
            </a>
          ))}
        </div>
        {quest && <QuestPuzzle quest={quest} id="about"
          prompt="City offices need to work together across separate locations. Which objective fits?"
          options={objectives.map(([title], index) => [title, index === 0])} />}
      </div>
    </section>
  );
}
