import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test component pokémon:', () => {
  test('whether a card is rendered with information from a particular Pokémon:', () => {
    renderWithRouter(<App />);
    const pokName = screen.getByTestId('pokemon-name');
    expect(pokName).toBeInTheDocument();
    expect(pokName.innerHTML).toBe('Pikachu');
    const pokType = screen.getByTestId('pokemon-type');
    expect(pokType).toBeInTheDocument();
    expect(pokType.innerHTML).toBe('Electric');
    const pokWeight = screen.getByTestId('pokemon-weight');
    expect(pokWeight).toBeInTheDocument();
    expect(pokWeight.innerHTML).toBe('Average weight: 6.0 kg');
    const pokImg = screen.getByRole('img', { name: /Pikachu sprite/i });
    expect(pokImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test(`Test whether the Pokémon card listed on Pokédex contains a navigation link to
  display details of this Pokémon. The link must have the URL /pokemons/, where is the
  pokémon id displayed`, () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });
  test('if there is a star icon in favorite Pokémon:', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemons/25');
    });
    const checkBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkBox);
    const pokIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(pokIcon).toBeInTheDocument();
    expect(pokIcon.src.endsWith('/star-icon.svg')).toBeTruthy();
    expect(pokIcon.alt).toBe('Pikachu is marked as favorite');
  });
});
