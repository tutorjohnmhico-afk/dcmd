import { systems } from '../../data/systems.js';
export default function Systems() {
  return (
    <section className="systems section-pad" id="systems"><div className="systems-grid-decoration" aria-hidden="true"/><div className="container systems-layout"><div className="systems-intro"><p className="eyebrow light">03 <span className="eyebrow-divider">/</span> DIGITAL ECOSYSTEM</p><h2>Systems behind<br />the <span>service.</span></h2><p>Enterprise platforms supported by the division to help enable coordinated and efficient government operations.</p><div className="systems-count"><strong>08</strong><span>LISTED ENTERPRISE<br />SYSTEMS</span></div></div><div className="systems-list" aria-label="Supported information systems">{systems.map((name, index) => <div className="system-item" key={name}><span className="system-index">{String(index + 1).padStart(2, '0')}</span><strong>{name}</strong><span className="system-symbol" aria-hidden="true">↗</span></div>)}</div></div></section>
  );
}
