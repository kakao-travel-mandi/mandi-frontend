export type GetListRequest = {
  page: number;
  size: number;
};

export type SignupRequest = {
  token: string;
  nickname: string;
  description: string;
};

export type LoginRequest = {
  token: string;
};
