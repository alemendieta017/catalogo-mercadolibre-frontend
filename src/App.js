import styles from './App.module.css'
import Header from './components/Header/Header'
import ProductList from './components/productList/ProductList'
import ProductItem from './components/productItem/ProductItem'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState(null)

  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ProductList
              products={products}
              setProducts={setProducts}
              query={query}
              setQuery={setQuery}
            />
          }
        />
        <Route path="/product/:id" element={<ProductItem />} />
        <Route path="*" element={<p>not found</p>} />
      </Routes>
    </div>
  )
}

export default App
