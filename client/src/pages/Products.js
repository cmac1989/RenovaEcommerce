import React from 'react'
import productData from '../data/product.json'
import ProductItem from '../components/ProductItem'
import classes from './Products.module.css'
import {PageItem} from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import ProductPagination from "../components/ProductPagination";

function Products(props) {

  return (
    <div>
      <h1>Products</h1>
        <ul className={classes.productList}>
          {productData.map((product) => {
            return <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          })}
        </ul>
      <ProductPagination />
    </div>
  )
}

export default Products
