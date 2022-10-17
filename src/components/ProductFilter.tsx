import axios from 'axios';
import { iProduct } from '../models';

export async function getProducts() {
  const response = await axios.get<iProduct[]>('https://fakestoreapi.com/products/');
  return response.data;
}
