import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';

const testCard = {
  id: 22,
  title: 'test-card',
  price: 9.99,
  description: 'string description',
  category: 'test',
  image: 'test-url',
};

describe('product card', () => {
  it('card render', () => {
    render(<ProductCard {...testCard} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(testCard.title)).toBeInTheDocument();
    expect(screen.getByText('price($):' + testCard.price)).toBeInTheDocument();
  });
});
