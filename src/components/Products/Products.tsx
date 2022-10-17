import React from 'react';
import { getProducts } from '../ProductFilter';
import { iProduct } from '../../models';
import { ProductCard } from '../ProductCard/ProductCard';
import classes from './Products.module.css';

class Products extends React.Component<unknown, { products: iProduct[] }> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount(): void {
    getProducts().then((products) => {
      this.setState({ products });
    });
  }

  render(): React.ReactNode {
    return (
      <div className={classes.products}>
        {this.state.products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    );
  }
}
export default Products;
