import { ILoginResponse } from './login-response.interface';
import { IUser } from './user.interface';

export interface IAuthState {
  currentUser: ILoginResponse | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  isSubmitting: boolean;
}
