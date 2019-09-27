export interface IUser {
  userId: number;
  token: string;
  authority: string[];
}

export interface IRegisterCode {
  codeId: number;
  user: IUser;
  realname: string;
  code: string;
  date: string;
}

export interface ISession {

}
