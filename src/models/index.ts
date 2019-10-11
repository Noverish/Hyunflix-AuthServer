export interface IUser {
  id: number;
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
