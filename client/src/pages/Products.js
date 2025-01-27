import React from 'react'
import ProductItem from '../components/ProductItem'
import '../styles/productsPage.css'

function Products(props) {

  return (
    <div className="products-page">
      <h1>Products</h1>
        {/*<ul className="productList">*/}
        {/*  {productData.map((product) => {*/}
        {/*    return <ProductItem*/}
        {/*      key={product.id}*/}
        {/*      id={product.id}*/}
        {/*      name={product.name}*/}
        {/*      price={product.price}*/}
        {/*      image={product.image}*/}
        {/*    />*/}
        {/*  })}*/}
        {/*</ul>*/}
        <ProductItem />
    </div>
  )
}

export default Products
