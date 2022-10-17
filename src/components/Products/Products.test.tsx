import React from 'react';
import { render } from '@testing-library/react';
import Products from './Products';
import { getProducts } from '../ProductFilter';

const productsList = getProducts();

describe('product cards', () => {
  it('cards list render', () => {
    render(<Products />);
    expect(
      productsList.then((products) => {
        products.length === 20;
      })
    );
  });
});
