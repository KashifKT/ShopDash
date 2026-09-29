import { useEffect, useState } from 'react'
import axios from 'axios'
import StatCard from '../components/StatCard'
import ProductCard from '../components/ProductCard'

const stats = [
  { icon: '💰', label: 'Total Revenue', value: '$48,295', change: 12.5, color: '#111111' },
  { icon: '🛒', label: 'Total Orders', value: '1,284', change: 8.2, color: '#333333' },
  { icon: '👥', label: 'Customers', value: '3,920', change: 5.1, color: '#555555' },
  { icon: '📦', label: 'Products', value: '284', change: -2.4, color: '#888888' },
]

const recentOrders = [
  { id: '#ORD-001', customer: 'Ali Hassan', product: 'Wireless Headphones', amount: '$129', status: 'Delivered' },
  { id: '#ORD-002', customer: 'Sara Khan', product: 'Smart Watch', amount: '$249', status: 'Pending' },
  { id: '#ORD-003', customer: 'Usman Malik', product: 'Running Shoes', amount: '$89', status: 'Processing' },
  { id: '#ORD-004', customer: 'Fatima Noor', product: 'Laptop Bag', amount: '$59', status: 'Delivered' },
  { id: '#ORD-005', customer: 'Bilal Ahmed', product: 'Phone Case', amount: '$19', status: 'Cancelled' },
]

const statusColor = { Delivered: '#111111', Pending: '#555555', Processing: '#333333', Cancelled: '#888888' }

export default function Dashboard({ onAddToCart }) {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=4')
      .then(r => { setFeatured(r.data.products); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Dashboard Overview</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginTop: '0.3rem' }}>Welcome back, Kashif 👋</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem' }}>
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Recent Orders */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontWeight: 700 }}>Recent Orders</h3>
          <button style={{ background: 'rgba(0,0,0,0.07)', border: '1px solid var(--border)', borderRadius: 8, padding: '0.35rem 0.9rem', color: '#111', fontSize: '0.82rem', cursor: 'pointer' }}>View All</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg)' }}>
                {['Order ID', 'Customer', 'Product', 'Amount', 'Status'].map(h => (
                  <th key={h} style={{ padding: '0.9rem 1.5rem', textAlign: 'left', fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o, i) => (
                <tr key={o.id} style={{ borderTop: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', color: '#111111', fontWeight: 600 }}>{o.id}</td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem' }}>{o.customer}</td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', color: 'var(--muted)' }}>{o.product}</td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', fontWeight: 700 }}>{o.amount}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ background: `${statusColor[o.status]}22`, color: statusColor[o.status], padding: '0.25rem 0.75rem', borderRadius: 20, fontSize: '0.78rem', fontWeight: 600 }}>{o.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Featured Products */}
      <div>
        <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Featured Products</h3>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1rem' }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ background: 'var(--card)', borderRadius: 16, height: 300, animation: 'pulse 1.5s infinite', border: '1px solid var(--border)' }} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1rem' }}>
            {featured.map(p => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />)}
          </div>
        )}
      </div>
    </div>
  )
}
