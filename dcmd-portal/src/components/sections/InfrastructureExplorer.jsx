import { useRef, useState } from 'react';
import { services } from '../../data/services.js';
import { QuestNote } from './PortalQuest.jsx';
import './InfrastructureExplorer.css';

const layers = [
  { label: 'Network', color: '#78dbff', icon: 'network' },
  { label: 'Data center', color: '#83aaff', icon: 'server' },
  { label: 'Security', color: '#b9a7ff', icon: 'shield' },
  { label: 'Recovery', color: '#77edd3', icon: 'recovery' },
];

const iconShapes = {
  network: <>
    <path d="M20 18 12 31m32-13 8 13M17 36h30M13 42l13 10m25-10L38 52M27 14h10" />
    <circle cx="21" cy="14" r="5" /><circle cx="43" cy="14" r="5" />
    <circle cx="11" cy="36" r="5" /><circle cx="53" cy="36" r="5" />
    <circle cx="32" cy="55" r="6" />
  </>,
  server: <>
    <rect x="9" y="9" width="46" height="13" rx="3" />
    <rect x="9" y="26" width="46" height="13" rx="3" />
    <rect x="9" y="43" width="46" height="13" rx="3" />
    <path d="M17 15.5h1m-1 17h1m-1 17h1M33 15.5h13m-13 17h13m-13 17h13" />
  </>,
  shield: <>
    <path d="M32 6c8 6 15 8 23 10v14c0 13-8 22-23 29C17 52 9 43 9 30V16c8-2 15-4 23-10Z" />
    <path d="m22 32 7 7 14-15" />
  </>,
  recovery: <>
    <path d="M12 24a23 23 0 1 1 0 17M12 11v13h13" />
    <path d="M32 20v13l9 5" />
  </>,
};

function InfrastructureIcon({ icon }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" fill="none"
      stroke="currentColor" strokeWidth="3.25" strokeLinecap="round" strokeLinejoin="round">
      {iconShapes[icon]}
    </svg>
  );
}

const initialView = { pitch: 15, yaw: -22 };

function rotate(view, pitch, yaw) {
  return { pitch: Math.max(-75, Math.min(75, view.pitch + pitch)), yaw: view.yaw + yaw };
}

export default function InfrastructureExplorer({ quest }) {
  const [activeLayer, setActiveLayer] = useState(0);
  const [view, setView] = useState(initialView);
  const drag = useRef(null);
  const service = services[activeLayer];
  const { color, icon } = layers[activeLayer];

  function startDrag(event) {
    if (event.button !== 0 || drag.current) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, view };
  }

  function moveDrag(event) {
    const start = drag.current;
    if (start?.id !== event.pointerId) return;
    setView(rotate(start.view, (start.y - event.clientY) * .55, (event.clientX - start.x) * .7));
  }

  function stopDrag(event) {
    if (drag.current?.id === event.pointerId) drag.current = null;
  }

  function onViewKey(event) {
    const steps = { ArrowUp: [12, 0], ArrowDown: [-12, 0], ArrowLeft: [0, -15], ArrowRight: [0, 15] };
    if (!Object.hasOwn(steps, event.key)) return;
    event.preventDefault();
    setView(current => rotate(current, ...steps[event.key]));
  }

  return (
    <div className="infra-explorer" style={{ '--infra-accent': color }}>
      <div
        className="infra-scene"
        role="group"
        aria-label={`3D view of ${service.title}`}
        aria-description="Use arrow keys to rotate the model."
        tabIndex={0}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onLostPointerCapture={stopDrag}
        onKeyDown={onViewKey}
      >
        <div className="infra-orbit" aria-hidden="true"><span /><span /><span /></div>
        <div className="infra-model" aria-hidden="true"
          style={{ '--view-pitch': `${view.pitch}deg`, '--view-yaw': `${view.yaw}deg` }}>
          {Array.from({ length: 9 }, (_, depth) => (
            <span className="infra-icon-slice" key={depth} style={{ '--slice-depth': depth }}>
              <InfrastructureIcon icon={icon} />
            </span>
          ))}
        </div>
      </div>
      <p className="eyebrow light infra-heading">Explore DCMD infrastructure</p>
      <div className="infra-controls" id="infrastructure-controls" role="group" aria-label="Infrastructure services" tabIndex={-1}>
        {layers.map(({ label, icon }, index) => (
          <button
            key={label}
            type="button"
            aria-pressed={index === activeLayer}
            onClick={() => {
              setActiveLayer(index);
              if (layers[index].icon === 'recovery') quest?.complete('hero');
            }}
          >
            <InfrastructureIcon icon={icon} />
            {label}
          </button>
        ))}
      </div>
      <QuestNote quest={quest} id="hero">A service needs to come back after an interruption. Select Recovery.</QuestNote>
      <div className="infra-description">
        <div aria-live="polite">
          <strong>{service.title}</strong>
          <p>{service.description}</p>
        </div>
        <a href={`#service-${service.id}`}>View this service <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  );
}
