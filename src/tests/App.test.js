import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';

import App from '../App';

describe('Teste links de navegação: home', () => {
  test('Teste se link de navegação: home é renderizado', () => {
    const { history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');

    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    expect(linkHome).toBeInTheDocument();

    userEvent.click(linkHome);

    const home = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });
    expect(home).toBeInTheDocument();
  });
  test('Teste links de navegação: About', () => {
    const { history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');

    const linkAbout = screen.getByRole('link', {
      name: /About/i,
    });
    expect(linkAbout).toBeInTheDocument();

    userEvent.click(linkAbout);

    const about = screen.getByRole('heading', {
      name: /about pokédex/i,
    });

    expect(about).toBeInTheDocument();
  });
  test('Teste links de navegação: Favorites', () => {
    const { history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');

    const linkFavPoks = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(linkFavPoks).toBeInTheDocument();

    userEvent.click(linkFavPoks);

    const fav = screen.getByRole('heading', {
      name: /favorite pokémons/i,
    });

    expect(fav).toBeInTheDocument();
  });
  test('renderiza a página não encontrada with renderWithRouter', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/rota-que-não-existe');
    });

    const notFoundText = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
