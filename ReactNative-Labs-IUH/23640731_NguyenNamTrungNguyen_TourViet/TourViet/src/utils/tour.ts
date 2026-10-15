import type { Tour } from '../interfaces/Tour';

export interface TourSection {
  title: string;
  data: Tour[];
}

export function groupByCity(tours: Tour[]): TourSection[] {
  const groups = new Map<string, Tour[]>();

  for (const tour of tours) {
    const cityTours = groups.get(tour.city) ?? [];
    cityTours.push(tour);
    groups.set(tour.city, cityTours);
  }

  return Array.from(groups, ([title, data]) => ({
    title,
    data: data.sort((a, b) => a.departure.localeCompare(b.departure)),
  })).sort((a, b) => a.title.localeCompare(b.title, 'vi'));
}

export function formatDate(date: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : date;
}

export function getSeatLabel(seats: number): string {
  if (seats <= 0) return 'Hết chỗ';
  if (seats <= 3) return `Chỉ còn ${seats} chỗ`;
  return `Còn ${seats} chỗ`;
}
