type Image = {
  id: number;
  src: string;
};

export type Review = {
  id: number;
  rating: number;
  date: string;
  content: string;
  images: Image[];
  user: {
    id: number;
    name: string;
    // 이미지도 있을 것
  };
};

export const dummyReviews: Review[] = [
  {
    id: 1,
    rating: 5.0,
    date: '2021.08.01',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    images: Array.from({ length: 2 }, (_, i) => ({
      id: i,
      src: '/dummy-image.png',
    })),
    user: {
      id: 1,
      name: 'John Doe',
      // 이미지도 있을 것
    },
  },
  {
    id: 2,
    rating: 5.0,
    date: '2021.08.01',
    content:
      'hello dmdmdm Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    images: Array.from({ length: 10 }, (_, i) => ({
      id: i,
      src: '/dummy-image.png',
    })),
    user: {
      id: 1,
      name: 'John Doe',
      // 이미지도 있을 것
    },
  },
  {
    id: 3,
    rating: 5.0,
    date: '2021.08.01',
    content: 'Great course!',
    images: Array.from({ length: 2 }, (_, i) => ({
      id: i,
      src: '/dummy-image.png',
    })),
    user: {
      id: 1,
      name: 'John Doe',
      // 이미지도 있을 것
    },
  },
  {
    id: 4,
    rating: 5.0,
    date: '2021.08.01',
    content: 'Great course!',
    images: Array.from({ length: 2 }, (_, i) => ({
      id: i,
      src: '/dummy-image.png',
    })),
    user: {
      id: 1,
      name: 'John Doe',
      // 이미지도 있을 것
    },
  },
];
