import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import TourItem from '../src/components/TourItem';
import type { Tour } from '../src/interfaces/Tour';

const tour: Tour = {
  id: 'tour-1',
  name: 'Đà Lạt mộng mơ',
  city: 'Đà Lạt',
  days: 3,
  price: 3590000,
  seats: 2,
  departure: '2026-11-05',
  image: 'https://example.com/da-lat.jpg',
  isFavorite: false,
};

describe('TourItem', () => {
  const onPress = jest.fn();
  const onToggleFavorite = jest.fn();

  beforeEach(() => {
    onPress.mockClear();
    onToggleFavorite.mockClear();
  });

  it('hides the city in compact mode and displays it in the regular layout', () => {
    const compact = render(
      <TourItem
        tour={tour}
        compact
        onPress={onPress}
        onToggleFavorite={onToggleFavorite}
      />,
    );
    expect(compact.queryByText('Đà Lạt')).toBeNull();
    compact.unmount();

    const regular = render(
      <TourItem
        tour={tour}
        onPress={onPress}
        onToggleFavorite={onToggleFavorite}
      />,
    );
    expect(regular.getByText('Đà Lạt')).toBeTruthy();
  });

  it('toggles the favorite without opening the tour', () => {
    const { getByTestId } = render(
      <TourItem
        tour={tour}
        onPress={onPress}
        onToggleFavorite={onToggleFavorite}
      />,
    );

    fireEvent.press(getByTestId('fav-btn'));

    expect(onToggleFavorite).toHaveBeenCalledTimes(1);
    expect(onToggleFavorite).toHaveBeenCalledWith('tour-1', true);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('opens the selected tour when its card is pressed', () => {
    const { getByText } = render(
      <TourItem
        tour={tour}
        onPress={onPress}
        onToggleFavorite={onToggleFavorite}
      />,
    );

    fireEvent.press(getByText(tour.name));

    expect(onPress).toHaveBeenCalledWith(tour);
  });
});
