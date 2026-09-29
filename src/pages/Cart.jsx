import { useNavigate } from 'react-router-dom'

export default function Cart({ cart, setCart }) {
  const navigate = useNavigate()

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
  }
  const remove = (id) => setCart(prev => prev.filter(i => i.id !== id))
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)

  if (cart.length === 0) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '1rem' }}>
      <div style={{ fontSize: '5rem' }}>🛒</div>
      <h2 style={{ fontWeight: 700 }}>Your cart is empty</h2>
      <p style={{ color: 'var(--muted)' }}>Add some products to get started</p>
      <button onClick={() => navigate('/products')} style={{ background: '#111111', border: 'none', borderRadius: 12, padding: '0.75rem 2rem', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>
        Browse Products
      </button>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Shopping Cart <span style={{ color: 'var(--muted)', fontSize: '1rem', fontWeight: 400 }}>({cart.length} items)</span></h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cart.map(item => (
            <div key={item.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ background: '#fff', borderRadius: 12, width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '0.5rem' }}>
                <img src={item.thumbnail} alt={item.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.3rem' }}>{item.title.substring(0, 50)}...</p>
                <p style={{ color: '#111111', fontWeight: 800, fontSize: '1rem' }}>${item.price}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button onClick={() => updateQty(item.id, -1)} style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--card2)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer', fontSize: '1rem' }}>−</button>
                <span style={{ fontWeight: 700, minWidth: 24, textAlign: 'center' }}>{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)} style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--card2)', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer', fontSize: '1rem' }}>+</button>
              </div>
              <p style={{ fontWeight: 800, minWidth: 70, textAlign: 'right' }}>${(item.price * item.qty).toFixed(2)}</p>
              <button onClick={() => remove(item.id)} style={{ background: 'rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.15)', borderRadius: 8, width: 32, height: 32, color: '#111', cursor: 'pointer', fontSize: '1rem' }}>✕</button>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'sticky', top: 80 }}>
          <h3 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Order Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--muted)' }}><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--muted)' }}><span>Shipping</span><span style={{ color: '#111' }}>Free</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--muted)' }}><span>Tax (8%)</span><span>${(total * 0.08).toFixed(2)}</span></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem' }}>
            <span>Total</span><span style={{ color: '#111111' }}>${(total * 1.08).toFixed(2)}</span>
          </div>
          <button style={{ background: '#111111', border: 'none', borderRadius: 12, padding: '0.85rem', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>
            Checkout →
          </button>
          <button onClick={() => navigate('/products')} style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: 12, padding: '0.75rem', color: 'var(--muted)', cursor: 'pointer', fontSize: '0.88rem' }}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}
