const pages = {
  Orders: { icon: '📦', color: '#6366f1' },
  Customers: { icon: '👥', color: '#a855f7' },
  Analytics: { icon: '📈', color: '#10b981' },
  Settings: { icon: '⚙️', color: '#f59e0b' },
}

export function Orders() { return <Placeholder name="Orders" /> }
export function Customers() { return <Placeholder name="Customers" /> }
export function Analytics() { return <Placeholder name="Analytics" /> }
export function Settings() { return <Placeholder name="Settings" /> }

function Placeholder({ name }) {
  const { icon, color } = pages[name]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '1rem' }}>
      <div style={{ width: 80, height: 80, borderRadius: 20, background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>{icon}</div>
      <h2 style={{ fontWeight: 800, fontSize: '1.5rem' }}>{name}</h2>
      <p style={{ color: 'var(--muted)' }}>This section is coming soon...</p>
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '0.5rem 1.2rem', color: `${color}`, fontSize: '0.82rem', fontWeight: 600 }}>🚧 Under Construction</div>
    </div>
  )
}
