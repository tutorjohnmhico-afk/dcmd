import Arrow from '../Arrow.jsx';

const priorities = [
  ['Secure infrastructure', '#service-03'],
  ['Reliable systems', '#systems'],
  ['Connected governance', '#service-01'],
  ['Continuous service', '#service-04'],
];

export default function CapabilityStrip() {
  return (
    <nav className="capability-strip" aria-label="Technology priorities">
      <div className="container strip-inner">
        {priorities.map(([label, href]) => (
          <a key={href} href={href}>{label} <Arrow diagonal /></a>
        ))}
      </div>
    </nav>
  );
}