import StaffToolsDirectory from './StaffToolsDirectory.jsx';

const groups = [
  ['Staff & collaboration', ['HRIS', 'DCMD ICT', 'SharePoint']],
  ['Monitoring & support', ['Zabbix', 'ITSM']],
  ['Network & security', ['BMC-FIREWALL', 'BCH-FIREWALL', 'Sophos-VPNPortal', 'BCH-WLC', 'BMC-WLC', 'BCH / BMC · Network Backup Manager']],
  ['Access', ['Login']],
];

const previewTools = groups.flatMap(([category, names]) => names.map(name => ({ id: name, name, category })));

export default function StaffToolsPreview() {
  return <StaffToolsDirectory tools={previewTools} preview />;
}
