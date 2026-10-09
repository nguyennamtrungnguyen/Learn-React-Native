export type RootStackParamList = {
  Movie: undefined;
  Detail: { id: string };
};

export interface Movie {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
}
