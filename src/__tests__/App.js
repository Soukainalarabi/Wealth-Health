import React from 'react';
import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import App from '../App';

test('renders App component', () => {
  render(
    <HashRouter>
      <App />
    </HashRouter>,
  );

  const navigationElement = screen.getByText('Navigation'); // Assurez-vous de correspondre au texte de votre composant Navigation
  const homeElement = screen.getByText('Home');
  const employeesListElement = screen.getByText('Employees List');

  // Vérifiez si les éléments sont présents dans le rendu
  expect(navigationElement).toBeInTheDocument();
  expect(homeElement).toBeInTheDocument();
  expect(employeesListElement).toBeInTheDocument();
});
