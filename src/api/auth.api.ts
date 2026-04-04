import { api } from './client';

type SignInPayload = { email: string; password: string };
type SignInResponse = { token: string; user: { id: string; email: string; name: string } };

type SignUpPayload = { email: string; password: string; name: string };

export const authApi = {
  signIn: (payload: SignInPayload) => api.post<SignInResponse>('/auth/sign-in', payload),
  signUp: (payload: SignUpPayload) => api.post<SignInResponse>('/auth/sign-up', payload),
  signOut: () => api.post<void>('/auth/sign-out'),
  me: () => api.get<SignInResponse['user']>('/auth/me'),
};
