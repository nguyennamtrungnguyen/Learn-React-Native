import { formatDate, getSeatLabel, groupByCity } from '../src/utils/tour';
import type { Tour } from '../src/interfaces/Tour';

const makeTour = (id: string, city: string, departure: string): Tour => ({
  id,
  name: `Tour ${id}`,
  city,
  days: 3,
  price: 3590000,
  seats: 8,
  departure,
  image: 'https://example.com/tour.jpg',
  isFavorite: false,
});

describe('tour utilities', () => {
  it('groups by city alphabetically and sorts departures within each city', () => {
    const sections = groupByCity([
      makeTour('1', 'Đà Lạt', '2026-12-12'),
      makeTour('2', 'Hà Nội', '2026-08-10'),
      makeTour('3', 'Đà Lạt', '2026-10-01'),
      makeTour('4', 'Cần Thơ', '2026-09-05'),
    ]);

    expect(sections).toHaveLength(3);
    expect(sections.map((section) => section.title)).toEqual([
      'Cần Thơ',
      'Đà Lạt',
      'Hà Nội',
    ]);
    expect(sections[1].data.map((tour) => tour.id)).toEqual(['3', '1']);
  });

  it('formats ISO dates for display', () => {
    expect(formatDate('2026-11-05')).toBe('05/11/2026');
  });

  it('labels zero, low, and regular seat counts', () => {
    expect(getSeatLabel(0)).toBe('Hết chỗ');
    expect(getSeatLabel(3)).toBe('Chỉ còn 3 chỗ');
    expect(getSeatLabel(4)).toBe('Còn 4 chỗ');
  });
});
