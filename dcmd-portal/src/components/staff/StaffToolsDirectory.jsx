import { useState } from 'react';

export default function StaffToolsDirectory({ tools, preview = false }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const term = query.trim().toLowerCase();
  const categories = [...new Set(tools.map(tool => tool.category))];
  const results = categories
    .filter(name => !category || name === category)
    .map(name => ({ name, tools: tools.filter(tool => tool.category === name && tool.name.toLowerCase().includes(term)) }))
    .filter(group => group.tools.length > 0);
  const count = results.reduce((total, group) => total + group.tools.length, 0);

  return (
    <section className="staff-tools-directory" aria-labelledby="staff-tools-directory-title">
      <div className="staff-tools-notice">
        <h2 id="staff-tools-directory-title">{preview ? 'Local integration preview' : 'Your tools'}</h2>
        {preview && <p>This preview uses bookmark names. Link destinations are pending.</p>}
      </div>
      <div className="staff-tools-controls">
        <label>
          Find a tool
          <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search by name" />
        </label>
        <label>
          Category
          <select value={category} onChange={event => setCategory(event.target.value)}>
            <option value="">All categories</option>
            {categories.map(name => <option key={name}>{name}</option>)}
          </select>
        </label>
      </div>
      <p className="staff-tools-count" role="status">
        {count ? `${count} ${count === 1 ? 'tool' : 'tools'}` : tools.length ? 'No tools match your filters.' : 'No tools have been assigned to your account.'}
      </p>
      {results.map(group => (
        <section className="staff-tools-group" key={group.name}>
          <h3>{group.name}</h3>
          <ul>
            {group.tools.map(tool => (
              <li key={tool.id}>
                {preview
                  ? <><strong>{tool.name}</strong><span>Link pending</span></>
                  : <a href={tool.url} target="_blank" rel="noopener noreferrer">{tool.name} ↗</a>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </section>
  );
}
