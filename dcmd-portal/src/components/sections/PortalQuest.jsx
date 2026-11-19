import { useState } from 'react';
import Arrow from '../Arrow.jsx';
import './PortalQuest.css';

const checkpoints = [
  { id: 'hero', href: '#infrastructure-controls', hint: 'Choose Recovery on the 3D explorer.' },
  { id: 'about', href: '#quest-about', hint: 'Match the About clue to a DCMD objective.' },
  { id: 'services', href: '#dcmd-challenge', hint: 'Finish the four service scenarios.' },
  { id: 'systems', href: '#system-search', hint: 'Find ePAY using the systems search.' },
  { id: 'vision', href: '#quest-vision', hint: 'Solve the service continuity scenario.' },
  { id: 'contact', href: '#service-inquiry', hint: 'Open the inquiry form to find the support channel.' },
];

export function QuestNote({ quest, id, children }) {
  if (!quest) return null;

  return (
    <div className="quest-note">
      <span className="quest-marker" aria-hidden="true">{quest.completed.includes(id) ? '✓' : '◇'}</span>
      <div role="status">{quest.completed.includes(id) ? 'Checkpoint earned' : children}</div>
    </div>
  );
}

export function QuestPuzzle({ quest, id, prompt, options }) {
  const [incorrect, setIncorrect] = useState(false);
  if (!quest) return null;
  const solved = quest.completed.includes(id);

  return (
    <div className="quest-puzzle" id={`quest-${id}`} tabIndex={-1}>
      <div className="quest-puzzle-options" role="group" aria-label={prompt}>
        <p>{prompt}</p>
        {options.map(([label, correct]) => (
          <button key={label} type="button" aria-disabled={solved} onClick={() => {
            if (solved) return;
            if (correct) {
              setIncorrect(false);
              quest.complete(id);
            } else {
              setIncorrect(true);
            }
          }}>{label}</button>
        ))}
      </div>
      <p role="status">{solved ? 'Correct. Checkpoint earned.' : incorrect ? 'Try another answer.' : ''}</p>
    </div>
  );
}

export function QuestProgress({ quest, onExit, onReplay }) {
  const earned = quest.completed.length;
  const next = checkpoints.find(checkpoint => !quest.completed.includes(checkpoint.id));

  return (
    <aside className="quest-progress" aria-label="DCMD quest progress">
      <div className="quest-progress-content">
        <strong role="status">{next ? `${earned}/${checkpoints.length} checkpoints` : `Quest complete · ${earned}/${checkpoints.length}`}</strong>
        <progress max={checkpoints.length} value={earned} aria-label="Checkpoints earned" />
        {next && <small>{next.hint}</small>}
      </div>
      {next
        ? <a href={next.href}>Next <Arrow /></a>
        : <button type="button" onClick={onReplay}>Replay</button>}
      <button type="button" onClick={onExit}>Exit</button>
    </aside>
  );
}
