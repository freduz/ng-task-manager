import { ILoginResponse } from './login-response.interface';
import { IUser } from './user.interface';

export interface IAuthState {
  currentUser: IUser | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  isSubmitting: boolean;
  accessToken: string | undefined;
}
