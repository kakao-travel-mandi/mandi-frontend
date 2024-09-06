export type SignupRequest = {
  token: string;
  nickname: string;
  description: string;
};

export type LoginRequest = {
  token: string;
};

export type CheckNicknameRequest = {
  nickname: string;
};
