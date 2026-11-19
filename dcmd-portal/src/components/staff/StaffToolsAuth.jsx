import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import StaffToolsDirectory from './StaffToolsDirectory.jsx';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const authOptions = { detectSessionInUrl: false, flowType: 'pkce' };
const client = createClient(url, key, { auth: authOptions });

const forms = {
  login: { title: 'Log in', submit: 'Log in' },
  invite: { title: 'Set up your account', submit: 'Set password' },
  reset: { title: 'Reset your password', submit: 'Send reset code' },
  recovery: { title: 'Enter your reset code', submit: 'Set new password' },
};

function StaffAccountForm() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const form = forms[mode];
  const needsCode = mode === 'invite' || mode === 'recovery';

  function changeMode(next) {
    setMessage('');
    setMode(next);
  }

  async function submit(event) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const address = email.trim();
    const password = values.get('password');
    setBusy(true);
    setMessage('');

    try {
      if (mode === 'login') {
        const { error } = await client.auth.signInWithPassword({ email: address, password });
        if (error) setMessage('Could not log in. Check your email and password or reset your password.');
        return;
      }

      if (mode === 'reset') {
        const { error } = await client.auth.resetPasswordForEmail(address);
        if (error) {
          setMessage('Could not request a code right now. Try again later.');
        } else {
          setMode('recovery');
          setMessage('If this address has an account, a reset code will arrive by email.');
        }
        return;
      }

      const setupClient = createClient(url, key, {
        auth: { ...authOptions, storageKey: 'dcmd-staff-password-setup', persistSession: false, autoRefreshToken: false },
      });
      const { error: codeError } = await setupClient.auth.verifyOtp({
        email: address, token: values.get('code').trim(), type: mode,
      });
      if (codeError) {
        setMessage('That code could not be verified. Check it or request a new code.');
        return;
      }
      const { error: passwordError } = await setupClient.auth.updateUser({ password });
      await setupClient.auth.signOut({ scope: 'local' });
      if (passwordError) {
        setMode('reset');
        setMessage('The password could not be saved. Request a new code and choose a stronger password.');
      } else {
        setMode('login');
        setMessage('Password saved. Log in with your new password.');
      }
    } catch {
      setMessage('The account service is unavailable. Try again later.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="staff-tools-notice staff-auth" aria-labelledby="staff-auth-title">
      <h2 id="staff-auth-title">{form.title}</h2>
      {mode === 'login' && <p>Use the email address on your DCMD staff account.</p>}
      {needsCode && <p>Enter the code from your email and choose your own password.</p>}
      <form key={mode} onSubmit={submit}>
        <label>Work email
          <input name="email" type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="username" required />
        </label>
        {needsCode && (
          <label>Email verification code
            <input name="code" autoComplete="one-time-code" inputMode="numeric" pattern="[0-9]{6,10}" required />
          </label>
        )}
        {mode !== 'reset' && (
          <label>{needsCode ? 'New password (at least 12 characters)' : 'Password'}
            <input name="password" type="password" autoComplete={needsCode ? 'new-password' : 'current-password'}
              minLength={needsCode ? 12 : undefined} required />
          </label>
        )}
        <button className="staff-auth-primary" type="submit" disabled={busy}>{busy ? 'Please wait…' : form.submit}</button>
      </form>
      <p role="status">{message}</p>
      <div className="staff-auth-actions">
        {mode === 'login' ? (
          <>
            <button type="button" disabled={busy} onClick={() => changeMode('invite')}>I have an invitation code</button>
            <button type="button" disabled={busy} onClick={() => changeMode('reset')}>Forgot password?</button>
          </>
        ) : (
          <button type="button" disabled={busy} onClick={() => changeMode('login')}>Back to log in</button>
        )}
      </div>
    </section>
  );
}

function StaffWorkspace({ user }) {
  const [directory, setDirectory] = useState(null);
  const [signOutError, setSignOutError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function loadDirectory() {
      try {
        const membership = await client.from('dcmd_staff_members').select('user_id').eq('user_id', user.id).maybeSingle();
        if (membership.error) throw membership.error;
        if (!membership.data) {
          if (!cancelled) setDirectory({ message: 'This account has not been granted DCMD staff access.' });
          return;
        }
        const { data, error } = await client.from('dcmd_staff_tools').select('id, name, category, url').order('name');
        if (error) throw error;
        if (!cancelled) setDirectory({ tools: data });
      } catch {
        if (!cancelled) setDirectory({ message: 'The tools directory could not be loaded. Please refresh and try again.' });
      }
    }
    void loadDirectory();
    return () => { cancelled = true; };
  }, [user.id]);

  async function signOut() {
    try {
      const { error } = await client.auth.signOut({ scope: 'local' });
      if (error) throw error;
    } catch {
      setSignOutError('Could not log out. Try again before leaving a shared device.');
    }
  }

  return (
    <>
      <div className="staff-tools-notice staff-auth-session">
        <p>Signed in as <strong>{user.email}</strong></p>
        <button className="staff-auth-primary" type="button" onClick={signOut}>Log out</button>
        <p role="status">{signOutError}</p>
      </div>
      {directory?.tools
        ? <StaffToolsDirectory tools={directory.tools} />
        : <p className="staff-tools-count" role="status">{directory?.message ?? 'Checking staff access…'}</p>}
    </>
  );
}

export default function StaffToolsAuth() {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    const { data: { subscription } } = client.auth.onAuthStateChange((_event, current) => setSession(current));
    return () => subscription.unsubscribe();
  }, []);

  if (session === undefined) return <p className="staff-tools-count" role="status">Checking your session…</p>;
  return session
    ? <StaffWorkspace key={session.user.id} user={session.user} />
    : <StaffAccountForm />;
}
