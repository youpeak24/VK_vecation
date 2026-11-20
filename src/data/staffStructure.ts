import type { AdminUser } from '../types';

/**
 * Single source of truth for how staff are organised.
 * Roles are the same four used for sign-in (`admins/{uid}.role`) and permissions;
 * each department only offers the roles that belong to it.
 */
export type StaffRole = AdminUser['role'];

export const DEPARTMENT_ROLES: Record<string, StaffRole[]> = {
  Management: ['Super Admin'],
  Operations: ['Tour Manager'],
  Sales: ['Sales Specialist'],
  'Customer Support': ['Sales Specialist'],
  Finance: ['Accounts Executive'],
};

export const DEPARTMENTS = Object.keys(DEPARTMENT_ROLES);
