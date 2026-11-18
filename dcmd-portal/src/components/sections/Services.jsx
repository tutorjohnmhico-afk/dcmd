import Arrow from '../Arrow.jsx';
import { services } from '../../data/services.js';
export default function Services() {
  return (
    <section className="services section-pad" id="services"><div className="container"><div className="section-heading"><div><p className="eyebrow">02 <span className="eyebrow-divider">/</span> WHAT WE DO</p><h2>Our core <span>capabilities.</span></h2></div><p>Essential technology services that support reliable, secure, and continuous government operations.</p></div><div className="service-grid">{services.map(service => <article className="service-card" key={service.id}><div className="service-card-top"><span className="service-icon" aria-hidden="true">{service.symbol}</span><span className="service-number">{service.id} / 04</span></div><h3>{service.title}</h3><p>{service.description}</p><div className="service-tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div><span className="service-rule" /></article>)}</div><div className="services-footer"><span>INFRASTRUCTURE <b>•</b> RESILIENCE <b>•</b> SECURITY</span><a href="#contact">Discuss a service request <Arrow diagonal /></a></div></div></section>
  );
}
