import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

import NotFound from '../pages/NotFound';

describe('Teste componente NotFound', () => {
  test('Teste se a heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<NotFound />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');

    const found = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(found).toBeInTheDocument();
  });
  test('Teste se a página mostra a imagem', () => {
    const { history } = renderWithRouter(<NotFound />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');

    const path = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(path);
  });
});
