import React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';
import Modal from '../components/Modal';

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

it('afficher la modale', () => {
  act(() => {
    root.render(<Modal
      close={() => { }}
      erreur={false}
      redirection={() => { }}
      show
    />); // Show the modal
  });

  // Expect the presence of the modal's elements when it's shown
  expect(container.querySelector('.centered')).not.toBeNull();
  expect(container.querySelector('.modal')).not.toBeNull();
  expect(container.querySelector('.modal-header')).not.toBeNull();

  act(() => {
    root.render(<Modal
      close={() => { }}
      erreur={false}
      redirection={() => { }}
      show={false}
    />); // Hide the modal
  });

  // Expect the absence of the modal's elements when it's hidden
  expect(container.querySelector('.centered')).toBeNull();
  expect(container.querySelector('.modal')).toBeNull();
  expect(container.querySelector('.modal-header')).toBeNull();

  act(() => {
    root.render(<Modal
      close={() => { }}
      erreur
      redirection={() => { }}
      show={false}
    />); // Hide the modal
  });

  // Expect the absence of the modal's elements when it's hidden
  expect(container.querySelector('.centered')).toBeNull();
  expect(container.querySelector('.modal')).toBeNull();
  expect(container.querySelector('.modal-header')).toBeNull();
});
