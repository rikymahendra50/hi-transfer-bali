export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  AGEN = "AGEN",
}
export enum Provider {
  GOOGLE = "GOOGLE",
  FACEBOOK = "FACEBOOK",
  LOCAL = "LOCAL",
}
export interface AuthUser {
  id: number;
  uuid?: string;
  first_name: string;
  last_name: string;
  profile_picture: string | null;
  email: string;
  is_active: 0 | 1;
  phone: string | null;
  username: string | null;
  country?: string | null;
  city?: string | null;
  is_able_without_payment?: 0 | 1;
}

export interface AuthLogin {
  email: string | undefined;
  password: string | undefined;
  remember_me?: boolean | number;
}

export interface AuthRegister {
  first_name: string;
  last_name: string;
  email: string;
  phoner: string;
  password: string;
  comfirm_password: string;
}

export interface AuthCredential {
  token: AuthToken;
  provider: AuthProvider;
  role: AuthRole;
}

export interface ErrorObject {
  [key: string]: string[];
}

export interface ResponseErrorObject {
  message: string;
  errors?: ErrorObject;
}

export type AuthToken = string;
export type AuthRole = Role;
export type AuthProvider = Provider;

interface LinksAPI {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}

interface MetaAPI {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface MetaResponse<T> {
  data: T;
  links: LinksAPI;
  meta: MetaAPI;
}

export interface CommonResponse<T> {
  message: string;
  data: T;
}
