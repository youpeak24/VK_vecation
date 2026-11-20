import { useSyncExternalStore } from 'react';
import { authService, type AuthState } from '../services/auth';

/** Reactive admin session: `{ user, ready }`. `ready` is false until a saved session is checked. */
export function useAuth(): AuthState {
  return useSyncExternalStore(authService.subscribe, authService.getState, authService.getState);
}
