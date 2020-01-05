export interface UserDTO {
  username: string;
  date: string;
}

export interface IRegisterCode {
  id: number;
  user: UserDTO;
  realname: string;
  code: string;
  date: string;
}

export interface UserDTO {
  username: string;
}

export interface SessionDTO {
  id: string;
  userId: number;
  authority: number;
  allowedPaths: string[];
}
