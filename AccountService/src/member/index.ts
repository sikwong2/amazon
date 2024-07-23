import { UUID } from '../types/express';
import { Email } from '../types/express';

// user entered from sign up
export interface MemberInput {
  name: string;
  email: Email;
  password: string;
  role: Role;
}

// returned from member service
export interface Member {
  id: UUID;
  email: Email;
  name: string;
  role: Role;
  status: boolean;
  
}

// getting member info for pages like checkout
export interface MemberInfo {
  name: string;
  address: string;
}

// can only be shopper or vendor
export type Role = 'shopper' | 'vendor';

// returned from browser history get 
export interface BrowserHistoryEntry {
  accountId: UUID,
  productId: UUID,
  timestamp: Date
}