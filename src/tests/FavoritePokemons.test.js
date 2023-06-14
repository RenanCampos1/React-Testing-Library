import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

import FavoritePokemons from '../pages/FavoritePokemons';

describe('Teste links de navegação: FavoritePokemons', () => {
  test('Teste se link de navegação: FavoritePokemons é renderizado', () => {
    const { history } = renderWithRouter(<FavoritePokemons />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');

    const found = screen.getByText(/no favorite pokemon found/i);
    expect(found).toBeInTheDocument();
  });
});
