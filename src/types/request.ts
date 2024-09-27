export type SignupRequest = {
  token: string;
  nickname: string;
  description: string;
};

export type LoginRequest = {
  token: string;
};

export type UpdateMyInfoRequest = {
  nickname: string;
  description: string;
};

export type UpdateMyInfoImageRequest = {
  Base64EncodedImage: string;
};
export type CheckNicknameRequest = {
  nickname: string;
};

export type PostsCreateRequest = {
  category: string;
  content: string;
  title: string;
  Base64EncodedImageList: string[];
};
export type PutCreateRequest = {
  category: string;
  content: string;
  title: string;
  Base64EncodedImageList: string[];
};
export type WeatherRequest = {
  lat: number;
  lon: number;
  appid: string;
};
