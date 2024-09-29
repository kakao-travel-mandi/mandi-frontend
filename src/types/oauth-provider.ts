export enum OauthProviderEnum {
  PROVIDER_GOOGLE = 'PROVIDER_GOOGLE',
  PROVIDER_KAKAO = 'PROVIDER_KAKAO',
}
export type OauthProvider = keyof typeof OauthProviderEnum;