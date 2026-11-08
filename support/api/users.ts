import type { APIRequestContext } from '@playwright/test';
import { apiUrl } from '@support/config';
import type { User } from '@support/models';
import { readJson } from '@support/lib';

export interface CreateUserResponse {
  id: number;
  username: string;
  email: string;
  bio: string | null;
  image: string | null;
  token: string;
}

export async function createUser(request: APIRequestContext, user: User): Promise<CreateUserResponse> {
  const response = await request.post(`${apiUrl}/users`, { data: { user } });
  const body = await readJson(response, 'create user');
  return body.user;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  username: string;
  email: string;
  bio: string | null;
  image: string | null;
  token: string;
}

export async function loginUser(request: APIRequestContext, credentials: LoginUserRequest): Promise<LoginUserResponse> {
  const response = await request.post(`${apiUrl}/users/login`, { data: { user: { email: credentials.email, password: credentials.password } } });
  const body = await readJson(response, 'login user');
  return body.user;
}
