export type Point = {
  lat: number;
  lng: number;
  name: string;
  address: string;
};

export type CourseType = {
  id: string;
  name: string;
  difficulty: 'easy' | 'normal' | 'hard';
  startPoint: Point;
  endPoint: Point;
  distance: number;
  duration: string;
  ratingAverage: string;
};


export type Course = {
  title: string;
  difficulty: string;
  time: string;
  distance: string;
  image: string;
};