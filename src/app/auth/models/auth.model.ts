export interface NewUser {
  name?: string;
  login: string;
  password: string;
}

export interface TokenModel {
  token: string;
}
