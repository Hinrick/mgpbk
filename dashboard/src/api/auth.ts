// src/api/auth.ts

import axios from "axios";

// Define the shape of your login credentials
interface LoginCredentials {
  username: string;
  password: string;
}

// Define the shape of the response you expect from your login API
interface AuthResponse {
  token: string;
}

// A function to log in, which you would call from your components/pages
export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>("/api/login", credentials);
    // You might want to do something with the token here, like storing it for future requests
    return response.data;
  } catch (error) {
    // You can handle errors here, including returning a custom error object if needed
    throw error;
  }
};

// A function to sign up/register, similar to the login function
export const register = async (
  userInfo: Record<string, any>
): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>("/api/register", userInfo);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// A function to log out, if your API provides an endpoint for it
export const logout = async (): Promise<void> => {
  try {
    // You'll likely need to pass the token here in an authorization header
    await axios.post("/api/logout");
    // Perform any cleanup actions after logout, like clearing local storage
  } catch (error) {
    throw error;
  }
};

// You can add more auth-related functions as needed, for example:
// - refresh token
// - forgot password
// - verify email
// - etc.
