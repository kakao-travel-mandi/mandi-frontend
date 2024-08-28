export const PATHNAME = {
  HOME: '/home',
  COURSE: '/course',
  SCRAP: '/scrap',
  RANKING: '/ranking',
  MY_INFO: '/my-info',
} as const;

export const VALID_PATHS = [
  PATHNAME.HOME,
  PATHNAME.COURSE,
  PATHNAME.SCRAP,
  PATHNAME.RANKING,
  PATHNAME.MY_INFO,
];
