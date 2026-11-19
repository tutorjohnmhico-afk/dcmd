import { useRef, useState } from 'react';
import Arrow from '../Arrow.jsx';
import { systems } from '../../data/systems.js';

export default function Systems({ onInquire }) {
  const [query, setQuery] = useState('');
  const searchInput = useRef(null);
  const term = query.trim().toLowerCase();
  const entries = systems.map((name, index) => ({ name, number: String(index + 1).padStart(2, '0') }));
  const matches = entries.filter(({ name }) => name.toLowerCase().includes(term));

  function clearSearch() {
    setQuery('');
    searchInput.current?.focus();
  }

  return (
    <section className="systems section-pad" id="systems">
      <div className="systems-grid-decoration" aria-hidden="true" />
      <div className="container systems-layout">
        <div className="systems-intro">
          <p className="eyebrow light">03 <span className="eyebrow-divider">/</span> DIGITAL ECOSYSTEM</p>
          <h2>Systems behind<br />the <span>service.</span></h2>
          <p>Enterprise platforms supported by the division to help enable coordinated and efficient government operations.</p>
          <div className="systems-count">
            <strong>{String(systems.length).padStart(2, '0')}</strong>
            <span>LISTED ENTERPRISE<br />SYSTEMS</span>
          </div>
          <a className="text-link systems-support" href="#service-inquiry" onClick={onInquire}>
            Get help with system access <Arrow diagonal />
          </a>
        </div>
        <div>
          <div className="systems-search">
            <label htmlFor="system-search">Find a system</label>
            <div className="systems-search-field">
              <input
                ref={searchInput}
                id="system-search"
                type="search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                onKeyDown={event => {
                  if (event.key === 'Escape' && query) {
                    event.preventDefault();
                    clearSearch();
                  }
                }}
                placeholder="Search by name, e.g. ePAY"
                autoComplete="off"
              />
              {query && <button type="button" onClick={clearSearch}>Clear</button>}
            </div>
          </div>
          <p className="systems-search-status" role="status">
            {term && (matches.length === 0 ? 'No matching systems. Try a different name.' : `${matches.length} of ${systems.length} systems`)}
          </p>
          <div className="systems-list" role="list" aria-label="Supported information systems">
            {matches.map(({ name, number }) => (
              <div className="system-item" key={name} role="listitem">
                <span className="system-index" aria-hidden="true">{number}</span>
                <strong>{name}</strong>
                <a
                  className="system-symbol system-inquiry"
                  href={`mailto:dcmd@butuan.gov.ph?subject=${encodeURIComponent(`DCMD system inquiry: ${name}`)}`}
                  aria-label={`Email DCMD about ${name}`}
                  title={`Email DCMD about ${name}`}
                >
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
