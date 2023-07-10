export enum ActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login success',
  LOGIN_FAILURE = '[Auth] Login failure',

  LOGOUT = '[Auth] Logout',
  LOGOUT_SUCCESS = '[Auth] Logout success',
  LOGOUT_FAILURE = '[Auth] Logout failure',

  GET_CURRENT_USER = '[Auth] Get current User',
  GET_CURRENT_USER_SUCCESS = '[Auth] Get current user success',
  GET_CURRENT_USER_FAILURE = '[Auth] Get current user failure',

  REGISTER_USER = '[Auth] Register user',
  REGISTER_USER_SUCCESS = '[Auth] Register success',
  REGISTER_USER_FAILURE = '[Auth] Register failure',
}
