import React, { useEffect, useState } from 'react'
import { fetchData } from '../../utils/utils'
import styles from './ProductList.module.css'
import globals from '../../index.module.css'
import { Link } from 'react-router-dom'
import config from '../../config/config'

const ProductList = ({ products, setProducts, query, setQuery }) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchData(`${config.API_URL}/api/items?q=${query}`)
      setProducts(data.items)
      setLoading(false)
    }

    getProducts()
  }, [query, setProducts])

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setQuery(e.target.userQuery.value)
  }

  return (
    <div className={globals.container}>
      <div className={styles['search-container']}></div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Busca productos" name="userQuery" />
        <input type="submit" />
      </form>
      {loading && <p>Loading...</p>}
      {products.map((item) => {
        return (
          <Link
            to={`/product/${item.id}`}
            className={styles.productInfo}
            key={item.id}
          >
            <img src={item.picture} alt="thumbnail"></img>
            <div>
              <p>{item.price.currency + item.price.amount + '.00'}</p>
              <h2>{item.title}</h2>
            </div>
            <span>{item.city}</span>
          </Link>
        )
      })}
    </div>
  )
}

export default ProductList
