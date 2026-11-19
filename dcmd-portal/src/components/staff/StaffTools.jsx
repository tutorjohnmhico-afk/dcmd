import { lazy, Suspense } from 'react';
import './StaffTools.css';

const LocalDirectory = import.meta.env.DEV ? lazy(() => import('./StaffToolsDirectory.jsx')) : null;

export default function StaffTools() {
  return (
    <main className="staff-tools">
      <header className="staff-tools-header">
        <div className="staff-tools-width">
          <a href="/">← DCMD homepage</a>
          <span>DCMD · City Government of Butuan</span>
        </div>
      </header>
      <div className="staff-tools-width staff-tools-content">
        <h1>DCMD staff tools</h1>
        <p className="staff-tools-summary">
          One place for DCMD staff to find and open the systems they use.
        </p>
        {LocalDirectory ? (
          <Suspense fallback={<p role="status">Loading the local directory preview…</p>}>
            <LocalDirectory />
          </Suspense>
        ) : (
          <section className="staff-tools-notice" aria-labelledby="staff-tools-status">
            <h2 id="staff-tools-status">Staff access is being prepared</h2>
            <p>The directory will be available after the organization’s sign-in and tool access are configured.</p>
          </section>
        )}
      </div>
    </main>
  );
}
