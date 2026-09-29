import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Cart from './pages/Cart'
import { Orders, Customers, Analytics, Settings } from './pages/OtherPages'
import './index.css'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar open={sidebarOpen} />
        <div style={{ flex: 1, marginLeft: sidebarOpen ? 'var(--sidebar-w)' : 0, transition: 'margin-left 0.3s', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar toggleSidebar={() => setSidebarOpen(p => !p)} cartCount={cart.reduce((s, i) => s + i.qty, 0)} />
          <main style={{ flex: 1, padding: '5.5rem 1.5rem 2rem', maxWidth: 1200, width: '100%', margin: '0 auto', alignSelf: 'stretch' }}>
            <Routes>
              <Route path="/" element={<Dashboard onAddToCart={addToCart} />} />
              <Route path="/products" element={<Products onAddToCart={addToCart} />} />
              <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
