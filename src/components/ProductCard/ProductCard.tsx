import React from 'react';
import classes from './ProductCard.module.css';
import { iProduct } from '../../models';

export function ProductCard(props: iProduct) {
  return (
    <div className={classes.card}>
      <img src={props.image} />
      <p>{props.title}</p>
      <p>price($):{props.price}</p>
    </div>
  );
}
