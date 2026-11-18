import Arrow from '../Arrow.jsx';
export default function Contact() {
  return (
    <section className="contact section-pad" id="contact"><div className="container contact-panel"><div><p className="eyebrow light">05 <span className="eyebrow-divider">/</span> GET IN TOUCH</p><h2>Let's build a more <span>connected city.</span></h2><p>For inquiries regarding the Data Center Management Division and its services, reach out to our team.</p><a className="button button-primary" href="mailto:dcmd@butuan.gov.ph">Email our division <Arrow diagonal /></a></div><div className="contact-details"><div><small>DIVISION</small><strong>Data Center Management Division</strong></div><div><small>ORGANIZATION</small><strong>City Government of Butuan</strong></div><div><small>LOCATION</small><strong>Butuan City, Agusan del Norte</strong></div><div><small>EMAIL</small><a href="mailto:dcmd@butuan.gov.ph">dcmd@butuan.gov.ph</a></div></div></div></section>
  );
}
