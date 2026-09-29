import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import ProductCard from '../components/ProductCard'

export default function Products({ onAddToCart }) {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [sort, setSort] = useState('default')
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const searchQuery = new URLSearchParams(location.search).get('search') || ''
  const [search, setSearch] = useState(searchQuery)

  useEffect(() => {
    Promise.all([
      axios.get('https://dummyjson.com/products?limit=100'),
      axios.get('https://dummyjson.com/products/category-list'),
    ]).then(([p, c]) => {
      setProducts(p.data.products)
      setCategories(c.data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    let result = [...products]
    if (activeCategory !== 'all') result = result.filter(p => p.category === activeCategory)
    if (search) result = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (sort === 'rating') result.sort((a, b) => b.rating.rate - a.rating.rate)
    setFiltered(result)
  }, [products, activeCategory, search, sort])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Products</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>{filtered.length} products found</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Search..."
            style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: '0.5rem 1rem', color: 'var(--text)', outline: 'none', fontSize: '0.88rem' }} />
          <select value={sort} onChange={e => setSort(e.target.value)}
            style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: '0.5rem 1rem', color: 'var(--text)', outline: 'none', fontSize: '0.88rem', cursor: 'pointer' }}>
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
        {['all', ...categories].map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{
            padding: '0.45rem 1.1rem', borderRadius: 20, border: '1px solid var(--border)',
            background: activeCategory === cat ? '#111111' : 'var(--card)',
            color: activeCategory === cat ? '#fff' : 'var(--muted)',
            fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.2s',
          }}>{cat}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1rem' }}>
          {[...Array(8)].map((_, i) => <div key={i} style={{ background: 'var(--card)', borderRadius: 16, height: 300, border: '1px solid var(--border)' }} />)}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1rem' }}>
          {filtered.map(p => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />)}
        </div>
      )}
    </div>
  )
}
