export interface LoginResponse {
  token: string;
  refreshToken: string;
  type: string;
  id: number;
  uuid: string;
  email: string;
  fullName: string;
  role: "JOB_SEEKER" | "EMPLOYER" | "RECRUITER" | "ADMIN";
  isFirstLogin: boolean;
  isPremium: boolean;
}

export interface User {
  id: number;
  uuid: string;
  email: string;
  fullName: string;
  role: "JOB_SEEKER" | "EMPLOYER" | "RECRUITER" | "ADMIN";
  isPremium: boolean;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken?: string;
}
