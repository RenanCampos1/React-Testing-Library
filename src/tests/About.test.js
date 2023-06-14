import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

import About from '../pages/About';

describe('Teste links de navegação: about', () => {
  test('Teste se link de navegação: about é renderizado', () => {
    const { history } = renderWithRouter(<About />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');

    const about = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(about).toBeInTheDocument();

    // const text1 = screen.getByText(
    //   /this application simulates a pokédex, a digital encyclopedia containing all pokémons/i,
    // );

    // expect(text1).toBeInTheDocument();

    const text2 = screen.getByText(
      /one can filter pokémons by type, and see more details for each one of them/i,
    );

    expect(text2).toBeInTheDocument();

    const path = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(path);
  });
});
