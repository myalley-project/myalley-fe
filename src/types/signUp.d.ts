export interface Infos {
  email: string;
  pw: string;
  pwCheck: string;
  gender: string;
  birth: { year: string; month: string; day: string };
  nickName: string;
  adminNumber: number;
  name: string;
}
export interface Valids {
  email: boolean;
  pw: boolean;
  pwCheck: boolean;
  nickName: boolean;
  adminNumber: boolean;
}
export interface IsOnly {
  email: boolean;
  nickName: boolean;
  adminNumber: boolean;
}
