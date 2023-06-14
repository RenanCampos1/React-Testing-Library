import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';

import App from '../App';
import data from '../data';

const checkNextPokemon = (filterBtn, arrayPok) => {
  arrayPok.forEach((elem, idx, array) => {
    const last = array.length - 1;
    if (idx !== last) {
      const pok = screen.getByText(elem.name);
      expect(pok).toBeInTheDocument();
      userEvent.click(filterBtn);
      const nextElem = array[idx + 1];
      const nextPok = screen.getByText(nextElem.name);
      expect(nextPok).toBeInTheDocument();
    } else {
      const pok = screen.getByText(elem.name);
      expect(pok).toBeInTheDocument();
      userEvent.click(filterBtn);
      const nextElem = array[0];
      const nextPok = screen.getByText(nextElem.name);
      expect(nextPok).toBeInTheDocument();
    }
  });
};

describe('Teste componente Pokemons', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');

    const encountered = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(encountered).toBeInTheDocument();
  });
  test('Teste se percorre os elementos array ao clicar em proximo', () => {
    const { history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');

    const nextPokButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextPokButton).toBeInTheDocument();
    checkNextPokemon(nextPokButton, data);
  });
  test('Teste botao resetar filtro', () => {
    const { history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');

    const nextPokButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const clearButton = screen.getByRole('button', { name: /all/i });
    expect(clearButton).toBeInTheDocument();
    userEvent.click(clearButton);
    checkNextPokemon(nextPokButton, data);
  });
  test('Teste se renderiza botoes de filtros', () => {
    const { history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const checkFilters = filterButtons.reduce((acum, { innerHTML }) => {
      if (!acum[innerHTML]) {
        acum[innerHTML] = 0;
      } acum[innerHTML] += 1;
      return acum;
    }, {});

    const cont = Object.entries(checkFilters);
    const checkCont = cont.some((e) => e[1] === 1);
    expect(checkCont).toBeTruthy();

    userEvent.click(filterButtons[0]);
    const typePok = screen.getByTestId('pokemon-type');
    expect(typePok.innerHTML).toBe('Electric');
  });
});
