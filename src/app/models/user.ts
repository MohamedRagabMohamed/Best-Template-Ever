import { Role } from './roles';

export class User {
  id?: number;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  typeId?: number;
  email_id?: string;
  tokenType?: string;
  roles?: Role[];
  type?: string; // token type
}
