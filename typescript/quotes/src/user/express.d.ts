import { User } from './user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        photo: string;
        createdAt: Date;
      };
    }
  }
}
