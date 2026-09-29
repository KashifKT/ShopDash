import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar({ toggleSidebar, cartCount }) {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) navigate(`/products?search=${search}`)
  }

  return (
    <header style={{
      position: 'fixed', top: 0, left: 'var(--sidebar-w)', right: 0, height: 64,
      background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)', display: 'flex',
      alignItems: 'center', justifyContent: 'space-between',
      padding: '0 1.5rem', zIndex: 99,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={toggleSidebar} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: '1.3rem', cursor: 'pointer' }}>☰</button>
        <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', background: 'var(--card2)', border: '1px solid var(--border)', borderRadius: 10, padding: '0.4rem 0.9rem', gap: '0.5rem' }}>
          <span style={{ color: 'var(--muted)' }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text)', fontSize: '0.88rem', width: 200 }} />
        </form>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button style={{ background: 'var(--card2)', border: '1px solid var(--border)', borderRadius: 10, padding: '0.45rem 0.8rem', color: 'var(--muted)', cursor: 'pointer', fontSize: '1rem', position: 'relative' }}>
          🔔
          <span style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, background: '#111', borderRadius: '50%' }}></span>
        </button>
        <button onClick={() => navigate('/cart')} style={{ background: '#111111', border: 'none', borderRadius: 10, padding: '0.45rem 1rem', color: '#fff', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          🛒 Cart <span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 20, padding: '0 6px', fontSize: '0.78rem' }}>{cartCount}</span>
        </button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>👤</div>
      </div>
    </header>
  )
}
