export type SessionUser = {
  id: string
}

declare module 'next' {
  export interface NextApiRequest {
    req: any
    user: SessionUser
  }
}
