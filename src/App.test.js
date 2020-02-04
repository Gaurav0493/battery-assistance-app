import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders all batteries from list', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
