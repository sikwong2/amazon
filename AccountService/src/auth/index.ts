export interface Authenticated {
  id: string,
  name: string,
  role: string,
  accessToken: string
}

export interface Credentials {
  email: string,
  password: string
}

export type SessionUser = {
  id: string,
  role: string
}
