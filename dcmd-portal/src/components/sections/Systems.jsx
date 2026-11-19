
import { useRef, useState } from 'react';
import Arrow from '../Arrow.jsx';
import { systems } from '../../data/systems.js';

export default function Systems({ onInquire }) {
  const [query, setQuery] = useState('');
  const searchInput = useRef(null);

  // Remove extra spaces and make the search case-insensitive.
  const term = query.trim().toLowerCase();

  // Add a display number to each system.
  const entries = systems.map((system, index) => ({
    ...system,
    number: String(index + 1).padStart(2, '0'),
  }));

  // Filter systems based on the search input.
  const matches = entries.filter(({ name }) =>
    name.toLowerCase().includes(term)
  );

  function clearSearch() {
    setQuery('');
    searchInput.current?.focus();
  }

  return (
    <section className="systems section-pad" id="systems">
      <div className="systems-grid-decoration" aria-hidden="true" />

      <div className="container systems-layout">

        {/* LEFT SIDE: Systems introduction */}
        <div className="systems-intro">
          <p className="eyebrow light">
            03 <span className="eyebrow-divider">/</span> DIGITAL ECOSYSTEM
          </p>

          <h2>
            Systems behind
            <br />
            the <span>service.</span>
          </h2>

          <p>
            Enterprise platforms supported by the division to help enable
            coordinated and efficient government operations.
          </p>

          <div className="systems-count">
            <strong>{String(systems.length).padStart(2, '0')}</strong>
            <span>
              LISTED ENTERPRISE
              <br />
              SYSTEMS
            </span>
          </div>

          <a
            className="text-link systems-support"
            href="#service-inquiry"
            onClick={onInquire}
          >
            Get help with system access <Arrow diagonal />
          </a>
        </div>

        {/* RIGHT SIDE: Search and systems list */}
        <div>
          <div className="systems-search">
            <label htmlFor="system-search">Find a system</label>

            <div className="systems-search-field">
              <input
                ref={searchInput}
                id="system-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Escape' && query) {
                    event.preventDefault();
                    clearSearch();
                  }
                }}
                placeholder="Search by name, e.g. ePAY"
                autoComplete="off"
              />

              {query && (
                <button type="button" onClick={clearSearch}>
                  Clear
                </button>
              )}
            </div>
          </div>

          <p className="systems-search-status" role="status">
            {term &&
              (matches.length === 0
                ? 'No matching systems. Try a different name.'
                : `${matches.length} of ${systems.length} systems`)}
          </p>

          <div
            className="systems-list"
            aria-label="Supported information systems"
          >
            {matches.map((system) =>
              system.url ? (
                <a
                  className="system-item"
                  key={system.name}
                  href={system.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${system.name} (opens in a new tab)`}
                >
                  <span className="system-index">
                    {system.number}
                  </span>

                  <strong>{system.name}</strong>

                  <span className="system-symbol" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ) : (
                <div
                  className="system-item is-unavailable"
                  key={system.name}
                  title="Website URL not yet configured"
                >
                  <span className="system-index">
                    {system.number}
                  </span>

                  <strong>{system.name}</strong>

                  <span className="system-symbol" aria-hidden="true">
                    ↗
                  </span>
                </div>
              )
            )}

            {matches.length === 0 && (
              <p className="systems-empty">
                No systems found.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
