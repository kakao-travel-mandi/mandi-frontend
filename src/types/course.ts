export type Point = {
  lat: number;
  lng: number;
  name: string;
  address: string;
};

export type Course = {
  id: string;
  name: string;
  difficulty: 'easy' | 'normal' | 'hard';
  startPoint: Point;
  endPoint: Point;
  distance: number;
  duration: string;
  ratingAverage: string;
};
