
/**
 * Universally Unique Identifier
 * @pattern ^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$
 * @example "81c689b1-b7a7-4100-8b2d-309908b444f5"
 */
export type UUID = string;

export type SessionUser = {
  id: UUID;
}

declare global {
namespace Express {
  export interface Request {
    user?: SessionUser;
  }
}
}