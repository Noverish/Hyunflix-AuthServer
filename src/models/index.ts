export interface IUser {
  id: number;
  username: string;
  token: string;
  authority: string[];
  allowedPaths: string[];
}

export interface IRegisterCode {
  id: number;
  user: IUser;
  realname: string;
  code: string;
  date: string;
}

export interface ISession {

}
