import { AdminUser } from '../types';

const AUTH_USER_KEY = 'vk_admin_user';

const DEFAULT_ADMIN: AdminUser = {
  id: 'usr-admin-01',
  name: 'Vignesh Kumar',
  email: 'admin@vkvacations.in',
  role: 'Super Admin',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  token: 'vk_jwt_admin_token_secure_2026'
};

export const authService = {
  login(email: string, password: string): Promise<AdminUser> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Accept admin credentials or any verified demo staff login
        const normalized = email.toLowerCase();
        if (
          ((normalized === 'admin@vkvacations.in' || normalized === 'admin@vkvacations.com') && password === 'admin123') ||
          ((normalized === 'manager@vkvacations.in' || normalized === 'manager@vkvacations.com') && password === 'manager123') ||
          (password.length >= 6 && email.includes('@'))
        ) {
          const user: AdminUser = {
            ...DEFAULT_ADMIN,
            email: normalized,
            name: normalized.includes('manager') ? 'Kavitha Ranganathan' : 'Vignesh Kumar',
            role: normalized.includes('manager') ? 'Tour Manager' : 'Super Admin'
          };
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Invalid email or password. Use admin@vkvacations.in / admin123'));
        }
      }, 500);
    });
  },

  getCurrentUser(): AdminUser | null {
    try {
      const raw = localStorage.getItem(AUTH_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },

  logout(): void {
    localStorage.removeItem(AUTH_USER_KEY);
  }
};
