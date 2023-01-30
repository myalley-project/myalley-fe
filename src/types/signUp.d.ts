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
  email: boolean | null;
  password: boolean | null;
  pwCheck: boolean | null;
  nickname: boolean | null;
  adminNo: boolean | null;
  name: boolean | null;
}
export interface IsOnly {
  email: boolean | null;
  nickname: boolean | null;
  adminNo: boolean | null;
}
