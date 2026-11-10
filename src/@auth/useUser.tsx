import { User } from '@auth/user';
import { signOut } from 'next-auth/react';

type useUser = {
  data: User | null;
  isGuest: boolean;
  isLoading: boolean;
  updateUser: (updates: Partial<User>) => Promise<User | undefined>;
  updateUserSettings: (newSettings: User['settings']) => Promise<User['settings'] | undefined>;
  signOut: typeof signOut;
};

function useUser(): useUser {
  // Permanent public user mock — completely bypasses auth session checks
  const mockUser: User = {
    id: 'public-user-id',
    email: 'xixaux@gmail.com',
    firstName: 'Dennis',
    lastName: 'Williams',
    role: ['admin', 'user'],
    displayName: 'Dennis Williams',
    photoURL: '',
    shortcuts: [],
    settings: {},
    loginRedirectUrl: '/apps/environment-developer',
  } as unknown as User;

  console.log('[useUser - Public Mode] Bypassed auth. User active.');

  return {
    data: mockUser,
    isGuest: false,
    isLoading: false,
    signOut: async () => {},
    updateUser: async (_data) => mockUser,
    updateUserSettings: async (newSettings) => newSettings,
  };
}

export default useUser;