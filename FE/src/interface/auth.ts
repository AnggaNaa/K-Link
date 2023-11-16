export interface IAUTH {
  id: number;
  username?: string;
  firstname?: string;
  email?: string;
  lastname?: string;
  password?: string;
}

export interface IUSER {
  id: number;
  username?: string;
  firstname?: string;
  email?: string;
  lastname?: string;
  password?: string;
  auth: IAUTH;
}
