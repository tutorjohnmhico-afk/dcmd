import Arrow from '../Arrow.jsx';
import { services } from '../../data/services.js';

export default function Services({ onInquire }) {
  return (
    <section className="services section-pad" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 <span className="eyebrow-divider">/</span> WHAT WE DO</p>
            <h2 id="services-title">Our core <span>capabilities.</span></h2>
          </div>
          <p>Essential technology services that support reliable, secure, and continuous government operations.</p>
        </div>
        <div className="service-grid">
          {services.map(service => (
            <article className="service-card" id={`service-${service.id}`} tabIndex={-1} key={service.id}>
              <div className="service-card-top">
                <span className="service-icon" aria-hidden="true">{service.symbol}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-tags">
                {service.tags.map(tag => <span key={tag}>{tag}</span>)}
              </div>
              <a className="service-inquiry-link" href="#service-inquiry"
                aria-label={`Ask about ${service.title}`}
                onClick={() => onInquire(service.title)}>
                Ask about this service <Arrow diagonal />
              </a>
              <span className="service-rule" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}