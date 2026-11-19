import { useSyncExternalStore } from 'react';
import Arrow from '../Arrow.jsx';

const priorities = [
  ['Digital Infrastructure', '#hero'],
  ['Secure infrastructure', '#service-03'],
  ['Reliable systems', '#systems'],
  ['Connected governance', '#service-01'],
  ['Continuous service', '#service-04'],
];

function subscribeToLocation(listener) {
  window.addEventListener('hashchange', listener);
  return () => window.removeEventListener('hashchange', listener);
}

function getCurrentLocation() {
  return window.location.hash || '#hero';
}

function getInitialLocation() {
  return '#hero';
}

export default function CapabilityStrip() {
  const location = useSyncExternalStore(subscribeToLocation, getCurrentLocation, getInitialLocation);

  return (
    <nav className="capability-strip" aria-label="Technology priorities">
      <div className="container strip-inner">
        {priorities.map(([label, href]) => (
          <a key={href} className={location === href ? 'active' : ''} aria-current={location === href ? 'location' : undefined} href={href}>{label} <Arrow diagonal /></a>
        ))}
      </div>
    </nav>
  );
}
