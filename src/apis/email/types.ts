export interface IEmailVerifyRequest {
  email: string,
}

export interface IEmailVerifyResponse {
  success: boolean
}

export interface IEmailAuthCodeRequest {
  email: string
}

export interface IEmailAuthCodeCheckRequest extends IEmailVerifyRequest {
  authCode: string,
}

export interface IEmailAuthCodeCheckResponse extends IEmailVerifyRequest {
  isVerified: boolean,
}