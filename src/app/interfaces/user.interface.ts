import { User } from '../auth/models/user.model';

export interface GetUser {
  totalUsers: number;
  users: User[];
}
