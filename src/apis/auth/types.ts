export interface ILoginRequestType {
  email: string;
  password: string;
}

export interface ILoginResponseType {
  accessToken: string;
  refreshToken: string;
}

export interface ISignupRequestType {
  name: string;
  email: string;
  password: string;
}

