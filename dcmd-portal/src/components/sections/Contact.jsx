import { useEffect, useRef, useState } from 'react';
import Arrow from '../Arrow.jsx';
import { services } from '../../data/services.js';
import './Contact.css';

const email = 'dcmd@butuan.gov.ph';
const maxDetailsLength = 600;

function openInquiry(event) {
  event.preventDefault();
  const values = new FormData(event.currentTarget);
  const topic = values.get('topic');
  const details = values.get('details').trim();
  const subject = encodeURIComponent(`DCMD inquiry: ${topic}`);
  const body = encodeURIComponent(details.replace(/\r?\n/g, '\r\n'));

  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}

export default function Contact({ inquiry }) {
  const [details, setDetails] = useState('');
  const inquiryPanel = useRef(null);
  const inquiryTopic = useRef(null);

  useEffect(() => {
    if (!inquiry) return;

    inquiryPanel.current.open = true;
    inquiryTopic.current.value = inquiry.topic;
    inquiryTopic.current.focus({ preventScroll: true });
  }, [inquiry]);

  return (
    <section className="contact section-pad" id="contact">
      <div className="container contact-panel">
        <div>
          <p className="eyebrow light">05 <span className="eyebrow-divider">/</span> GET IN TOUCH</p>
          <h2>Let's build a more <span>connected city.</span></h2>
          <p>For inquiries regarding the Data Center Management Division and its services, reach out to our team.</p>
          <a className="button button-primary" href={`mailto:${email}`}>Email our division <Arrow diagonal /></a>
          <details ref={inquiryPanel} className="contact-inquiry" id="service-inquiry">
            <summary>Prepare a service inquiry</summary>
            <form onSubmit={openInquiry}>
              <label htmlFor="inquiry-topic">Topic</label>
              <select ref={inquiryTopic} id="inquiry-topic" name="topic">
                <option>General inquiry</option>
                {services.map(service => <option key={service.id}>{service.title}</option>)}
                <option>System access</option>
              </select>
              <label htmlFor="inquiry-details">What do you need help with?</label>
              <textarea
                id="inquiry-details"
                name="details"
                rows={4}
                maxLength={maxDetailsLength}
                value={details}
                onChange={event => setDetails(event.target.value)}
                aria-describedby="inquiry-length"
              />
              <p className="inquiry-length" id="inquiry-length">{details.length}/{maxDetailsLength} characters</p>
              <p>This opens a draft in your email app for you to review and send.</p>
              <button className="button button-outline" type="submit">Open email draft <Arrow diagonal /></button>
            </form>
          </details>
        </div>
        <div className="contact-details">
          <div><small>DIVISION</small><strong>Data Center Management Division</strong></div>
          <div><small>ORGANIZATION</small><strong>City Government of Butuan</strong></div>
          <div><small>LOCATION</small><strong>Butuan City, Agusan del Norte</strong></div>
          <div><small>EMAIL</small><a href={`mailto:${email}`}>{email}</a></div>
        </div>
      </div>
    </section>
  );
}
