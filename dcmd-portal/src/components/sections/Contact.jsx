import { useEffect, useRef, useState } from 'react';
import Arrow from '../Arrow.jsx';
import { services } from '../../data/services.js';
import { QuestNote } from './PortalQuest.jsx';
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

export default function Contact({ inquiry, quest }) {
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
          <QuestNote quest={quest} id="contact">Open the inquiry form to discover the support channel. Sending an email is optional.</QuestNote>
          <details ref={inquiryPanel} className="contact-inquiry" id="service-inquiry" onToggle={event => {
            if (event.currentTarget.open) quest?.complete('contact');
          }}>
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
              <div className="inquiry-actions">
                <p className="inquiry-length" id="inquiry-length">{details.length}/{maxDetailsLength} characters</p>
                <button className="button button-outline" type="submit">Send <Arrow diagonal /></button>
              </div>
            </form>
          </details>
        </div>
        <div className="contact-details">
          <div>
            <small>SECTION</small>
            <strong>Convergence Network Management Section</strong>
            <strong>Server &amp; System Management Section</strong>
          </div>
          <div><small>DIVISION</small><strong>Data Center Management Division</strong></div>
          <div><small>DEPARTMENT</small><strong>City ICT Department</strong></div>
          <div><small>ORGANIZATION</small><strong>City Government of Butuan</strong></div>
          <div><small>LOCATION</small><strong>Butuan City, Agusan del Norte</strong></div>
          <div><small>EMAIL</small><a href={`mailto:${email}`}>{email}</a></div>
        </div>
      </div>
    </section>
  );
}
