import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', icon: '📊', label: 'Dashboard' },
  { to: '/products', icon: '🛍️', label: 'Products' },
  { to: '/cart', icon: '🛒', label: 'Cart' },
  { to: '/orders', icon: '📦', label: 'Orders' },
  { to: '/customers', icon: '👥', label: 'Customers' },
  { to: '/analytics', icon: '📈', label: 'Analytics' },
  { to: '/settings', icon: '⚙️', label: 'Settings' },
]

export default function Sidebar({ open }) {
  return (
    <aside style={{
      position: 'fixed', top: 0, left: 0, height: '100vh',
      width: 'var(--sidebar-w)', background: 'var(--bg2)',
      borderRight: '1px solid var(--border)', padding: '1.5rem 1rem',
      display: 'flex', flexDirection: 'column', gap: '0.4rem',
      transform: open ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s', zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem', padding: '0 0.5rem' }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>🛒</div>
        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text)' }}>ShopDash</span>
      </div>

      <p style={{ fontSize: '0.7rem', color: 'var(--muted)', padding: '0 0.5rem', marginBottom: '0.3rem', letterSpacing: 1, textTransform: 'uppercase' }}>Main Menu</p>

      {links.map(({ to, icon, label }) => (
        <NavLink key={to} to={to} end={to === '/'}
          style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.65rem 0.75rem', borderRadius: 10, textDecoration: 'none',
            fontSize: '0.88rem', fontWeight: 500,
            background: isActive ? 'rgba(0,0,0,0.08)' : 'transparent',
            color: isActive ? '#111111' : 'var(--muted)',
            borderLeft: isActive ? '3px solid #111111' : '3px solid transparent',
            transition: 'all 0.2s',
          })}>
          <span>{icon}</span>{label}
        </NavLink>
      ))}

      <div style={{ marginTop: 'auto', padding: '1rem 0.5rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>👤</div>
          <div>
            <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Kashif Tariq</p>
            <p style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>Admin</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
