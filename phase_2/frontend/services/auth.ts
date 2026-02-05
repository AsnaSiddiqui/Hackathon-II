// Frontend authentication service using Better Auth

import { authClient } from '../util/auth-client';

class AuthService {
  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    try {
      const session = await authClient.getSession();
      return !!session?.data?.session;
    } catch (error) {
      console.error('Error checking authentication status:', error);
      return false;
    }
  }

  // Register a new user using Better Auth
  async register(name: string, email: string, password: string): Promise<any> {
    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL:'/dashboard'
      });

      if (result.error) {
        throw new Error(result.error.message || 'Registration failed');
      }

      console.log(result.data)
      return result.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Login user using Better Auth
  async login(email: string, password: string): Promise<any> {
    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        throw new Error(result.error.message || 'Login failed');
      }

      return result.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Logout user using Better Auth
  async logout(): Promise<void> {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, we should clear local state
      throw error;
    }
  }

  // Get current user session
  async getCurrentUser(): Promise<any> {
    try {
      const session = await authClient.getSession();
      return session?.data?.user || null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Get current session
  async getSession(): Promise<any> {
    try {
      const session = await authClient.getSession();
      return session?.data || null;
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  }

    async getToken(): Promise<any> {
    try {
      const token = await authClient.token();
      console.log("Token: ",token)
      return token?.data || null;
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  }

}

const authService = new AuthService();
export default authService;