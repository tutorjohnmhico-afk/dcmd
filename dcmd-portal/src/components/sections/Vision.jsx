import Arrow from '../Arrow.jsx';

export default function Vision() {
  return (
    <section className="vision section-pad" id="vision" aria-labelledby="vision-title">
      <div className="container vision-layout">
        <div>
          <p className="eyebrow">04 <span className="eyebrow-divider">/</span> OUR DIRECTION</p>
          <h2 id="vision-title">Driven by purpose.<br /><span>Built for progress.</span></h2>
          <p className="vision-subtext">Reliable infrastructure helps city teams deliver services consistently. Secure systems help protect the information those services depend on.</p>
          <a className="text-link" href="#services">Explore the services behind this work <Arrow diagonal /></a>
        </div>
        <div className="vision-statement">
          <span className="quote-mark" aria-hidden="true">“</span>
          <blockquote>To be a leading technology division that enables efficient, transparent, innovative, and citizen-centered governance through modern information and communications technology.</blockquote>
          <p>OUR VISION</p>
        </div>
      </div>
    </section>
  );
}