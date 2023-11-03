import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App.js';

test('renders App component', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  // You can use queries from @testing-library/react to assert elements in your component
  const homeLink = screen.getByText('Home');
  const employeesListLink = screen.getByText('Employees List');

  // Assert that the links are present in the rendered component
  expect(homeLink).toBeInTheDocument();
  expect(employeesListLink).toBeInTheDocument();
});
