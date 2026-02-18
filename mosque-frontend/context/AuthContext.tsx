"use client";

import { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode'; // Correct import for named export or default depending on version, usually import { jwtDecode } from 'jwt-decode' or import jwtDecode from 'jwt-decode'
import api from '../utils/api';

interface User {
    _id: string;
    username?: string; // For admin
    name?: string; // For citizen
    role: 'admin' | 'citizen';
    membershipId?: string;
    profilePhoto?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string, userData: User) => void;
    logout: () => void;
    updateUser: (userData: User) => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        router.push('/');
    }, [router]);

    const login = useCallback((newToken: string, userData: User) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(newToken);
        setUser(userData);

        if (userData.role === 'admin') {
            router.push('/admin/dashboard');
        } else {
            router.push('/citizen/dashboard');
        }
    }, [router]);

    const updateUser = useCallback((userData: User) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decoded: any = jwtDecode(storedToken);
                // Check expiry
                if (decoded.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    setToken(storedToken);
                    // Ideally, you'd fetch the user profile here to ensure valid data
                    // For now, we rely on what we can decode or basic persistence if we stored user data
                    const storedUser = localStorage.getItem('user');
                    if (storedUser) {
                        setUser(JSON.parse(storedUser));
                    }
                }
            } catch (error) {
                console.error("Invalid token", error);
                logout();
            }
        }
        setLoading(false);
    }, [logout]);

    return (
        <AuthContext.Provider value={{ user, token, login, logout, updateUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
