import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import SelectComponent
  from '../components/SelectComponent';
import { states } from '../stateApi';

const departements = ['Sales', 'Marketing', 'Engineering', 'Human Resources', 'Legal'];
let container = null;
let root = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container); // Create a root element
});

afterEach(() => {
  root.unmount(container);
  container.remove();
  container = null;
});

it('afficher le menu déroulant state', () => {
  act(() => {
    root.render(<SelectComponent name="state" id="state" options={states} />);
  });
  expect(states).toContainEqual({ abbreviation: 'AL', name: 'Alabama' });
});
it('afficher le menu déroulant departement', () => {
  act(() => {
    root.render(<SelectComponent name="departement" id="departement" options={departements} />);
    expect(departements).toContain('Marketing');
  });
});
