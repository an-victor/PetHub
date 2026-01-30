// PetHub Authentication Service - Clerk Integration
import { supabase } from './supabase';

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    accountType: 'tutor' | 'vet' | 'clinic' | 'business';
    isPremium: boolean;
    createdAt: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

// Legacy storage key for fallback
const STORAGE_KEY = 'pethub-auth';

// Helper to map Clerk User to PetHub User
export const mapClerkUser = (clerkUser: any): User => {
    return {
        id: clerkUser.id,
        name: clerkUser.fullName || clerkUser.firstName || 'User',
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        phone: clerkUser.primaryPhoneNumber?.phoneNumber || '',
        avatar: clerkUser.imageUrl || '',
        accountType: (clerkUser.publicMetadata?.role as any) || 'tutor',
        isPremium: (clerkUser.publicMetadata?.isPremium as boolean) || false,
        createdAt: clerkUser.createdAt ? new Date(clerkUser.createdAt).toISOString() : new Date().toISOString(),
    };
};

// Deprecated in favor of useAuth() from Clerk
export const getStoredAuth = (): AuthState => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const data = JSON.parse(stored);
            return {
                user: data.user,
                isAuthenticated: !!data.user,
                isLoading: false,
            };
        }
    } catch {
        console.error('Error reading auth state');
    }
    return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
    };
};

/**
 * @deprecated Use Clerk's useAuth() hook in components instead.
 */
export const isAuthenticated = (): boolean => {
    // Check local storage fallback
    const auth = getStoredAuth();
    return auth.isAuthenticated;
};

/**
 * @deprecated Use Clerk's useUser() hook in components instead.
 */
export const getCurrentUser = (): User | null => {
    const auth = getStoredAuth();
    return auth.user;
};

// Sync Clerk user to Supabase Profiles for data consistency
export const syncUserToSupabase = async (clerkUser: any) => {
    if (!clerkUser) return;

    try {
        const user = mapClerkUser(clerkUser);

        const { error } = await supabase
            .from('profiles')
            .upsert({
                id: user.id, // We'll use Clerk ID as the PK in this new model
                email: user.email,
                full_name: user.name,
                avatar_url: user.avatar,
                role: user.accountType,
                updated_at: new Date().toISOString()
            }, { onConflict: 'id' });

        if (error) {
            console.error('Supabase Sync Error:', error);
        } else {
            // Update local storage for legacy compatibility
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ user }));
        }
    } catch (err) {
        console.error('Sync failed:', err);
    }
};

// The following functions are now primarily handled by Clerk UI components
// but we keep them as stubs or wrappers where useful.

export const logout = async (): Promise<void> => {
    // Clerk handles this via useClerk().signOut()
    localStorage.removeItem(STORAGE_KEY);
};

export const updatePremiumStatus = (isPremium: boolean): void => {
    const auth = getStoredAuth();
    if (auth.user) {
        auth.user.isPremium = isPremium;
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: auth.user }));
    }
};

export default {
    getStoredAuth,
    isAuthenticated,
    getCurrentUser,
    logout,
    updatePremiumStatus,
    syncUserToSupabase,
    mapClerkUser
};
