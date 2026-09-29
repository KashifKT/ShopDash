export default function StatCard({ icon, label, value, change, color }) {
  const isPositive = change >= 0
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16,
      padding: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.8rem',
      transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${color}22` }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>{icon}</div>
        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: isPositive ? '#222222' : '#888888', background: isPositive ? 'rgba(0,0,0,0.07)' : 'rgba(0,0,0,0.04)', padding: '0.2rem 0.6rem', borderRadius: 20 }}>
          {isPositive ? '▲' : '▼'} {Math.abs(change)}%
        </span>
      </div>
      <div>
        <p style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--text)' }}>{value}</p>
        <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.2rem' }}>{label}</p>
      </div>
    </div>
  )
}
