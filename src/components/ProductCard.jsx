import { useState } from 'react'

export default function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false)
  const [wishlist, setWishlist] = useState(false)

  const handleAdd = () => {
    onAddToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const stars = Math.round(product.rating || 4)

  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16,
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 16px 50px rgba(0,0,0,0.12)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>

      <div style={{ position: 'relative', background: '#fff', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <img src={product.thumbnail} alt={product.title} style={{ maxHeight: 150, maxWidth: '100%', objectFit: 'contain' }} />
        <button onClick={() => setWishlist(!wishlist)} style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: '1rem' }}>
          {wishlist ? '❤️' : '🤍'}
        </button>
        <span style={{ position: 'absolute', top: 10, left: 10, background: '#111111', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 20 }}>
          {product.category}
        </span>
      </div>

      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.title}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          {'★'.repeat(stars)}<span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>({product.stock} in stock)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111111' }}>${product.price}</span>
          <button onClick={handleAdd} style={{
            background: added ? '#444444' : '#111111',
            border: 'none', borderRadius: 10, padding: '0.5rem 1rem',
            color: '#fff', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.3s',
          }}>
            {added ? '✓ Added' : '+ Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
