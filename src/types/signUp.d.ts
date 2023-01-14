export interface Infos {
  email: string;
  password: string;
  pwCheck: string;
  gender: string;
  birth: { year: string; month: string; day: string };
  nickname: string;
  adminNo: number;
  name: string;
}
export interface Valids {
  email: boolean;
  password: boolean;
  pwCheck: boolean;
  nickname: boolean;
  adminNo: boolean;
  name: boolean;
}
export interface IsOnly {
  email: boolean | null;
  nickname: boolean | null;
  adminNo: boolean | null;
}
