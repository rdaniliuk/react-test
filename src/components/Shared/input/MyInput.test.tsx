import React from 'react';
import { render, screen } from '@testing-library/react';
import MyInput from './MyInput';
import userEvent from '@testing-library/user-event';

class LocalStorageMock {
  storage: { [key: string]: string };
  length: number;

  constructor() {
    this.storage = {};
    this.length = 0;
  }

  clear() {
    this.storage = {};
  }

  getItem(key: string) {
    return this.storage[key] || null;
  }

  setItem(key: string, value: string) {
    this.storage[key] = value;
  }

  removeItem(key: string) {
    delete this.storage[key];
  }

  key(i: number): string | null {
    if (typeof i === 'undefined') {
      throw new Error();
    }
    if (i >= Object.keys(this.storage).length) {
      return null;
    }
    return Object.keys(this.storage)[i];
  }
}

describe('input', () => {
  it('input render', () => {
    const onChange = jest.fn();
    render(<MyInput onChange={onChange} value={''} />);
    expect(screen.getAllByPlaceholderText(/search product.../i));
  });

  it('input render with local storage value', async () => {
    const onChange = jest.fn();
    localStorage = new LocalStorageMock();
    render(<MyInput onChange={onChange} />);
    userEvent.type(screen.getByDisplayValue(''), 'TV LG');
    location.reload();
    render(<MyInput onChange={onChange} />);
    expect(screen.getByDisplayValue('TV LG')).toBeInTheDocument();
  });
});
