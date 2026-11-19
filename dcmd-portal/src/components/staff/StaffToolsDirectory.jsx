import { useState } from 'react';

const groups = [
  { name: 'Staff & collaboration', tools: ['HRIS', 'DCMD ICT', 'SharePoint'] },
  { name: 'Monitoring & support', tools: ['Zabbix', 'ITSM'] },
  { name: 'Network & security', tools: ['BMC-FIREWALL', 'BCH-FIREWALL', 'Sophos-VPNPortal', 'BCH-WLC', 'BMC-WLC', 'BCH / BMC · Network Backup Manager'] },
  { name: 'Access', tools: ['Login'] },
];

export default function StaffToolsDirectory() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const term = query.trim().toLowerCase();
  const results = groups
    .filter(group => !category || group.name === category)
    .map(group => ({ ...group, tools: group.tools.filter(tool => tool.toLowerCase().includes(term)) }))
    .filter(group => group.tools.length > 0);
  const count = results.reduce((total, group) => total + group.tools.length, 0);

  return (
    <section className="staff-tools-directory" aria-labelledby="staff-tools-directory-title">
      <div className="staff-tools-notice">
        <h2 id="staff-tools-directory-title">Local integration preview</h2>
        <p>Sign-in and tool links are pending. This preview uses the names from the project bookmark list.</p>
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
            {groups.map(group => <option key={group.name}>{group.name}</option>)}
          </select>
        </label>
      </div>
      <p className="staff-tools-count" role="status">{count ? `${count} ${count === 1 ? 'tool' : 'tools'}` : 'No tools match your filters.'}</p>
      {results.map(group => (
        <section className="staff-tools-group" key={group.name}>
          <h3>{group.name}</h3>
          <ul>
            {group.tools.map(tool => <li key={tool}><strong>{tool}</strong><span>Link pending</span></li>)}
          </ul>
        </section>
      ))}
    </section>
  );
}
