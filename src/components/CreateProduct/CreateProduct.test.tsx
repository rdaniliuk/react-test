import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CreateProduct from './CreateProduct';
import userEvent from '@testing-library/user-event';

describe('form', () => {
  it('form render', () => {
    render(<CreateProduct submitDisabled={true} />);
    expect(screen.getByText('fill the form...')).toBeInTheDocument();
    expect(screen.getByText('your date of birth')).toBeInTheDocument();
  });
  it('enable submit button', () => {
    render(<CreateProduct submitDisabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
    userEvent.type(screen.getByPlaceholderText('name'), 'testName');
    expect(screen.getByDisplayValue('testName')).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toBeDisabled();
  });
  it('country input', () => {
    render(<CreateProduct submitDisabled={true} />);
    expect(screen.getByText('Country')).toBeInTheDocument();
    fireEvent.change(screen.getByText('Country'), { target: { value: 'Belarus' } });
    expect(screen.getByText('Belarus')).toBeInTheDocument();
  });
  it('adding a new user card', () => {
    render(<CreateProduct submitDisabled={true} />);
    userEvent.type(screen.getByPlaceholderText('name'), 'testName');
    fireEvent.change(screen.getByText('Country'), { target: { value: 'Belarus' } });
    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByDisplayValue('Naruto'));
    fireEvent.change(screen.getByTitle('test-date'), { target: { value: '2019-01-23' } });
    fireEvent.change(screen.getByTitle('test-file'));
    expect(screen.getByRole('button')).not.toBeDisabled();
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
