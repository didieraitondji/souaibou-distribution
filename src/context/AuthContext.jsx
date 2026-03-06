import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "sd_user";

function loadUser() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
    } catch {
        return null;
    }
}

function saveUser(user) {
    try {
        if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        else localStorage.removeItem(STORAGE_KEY);
    } catch { }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(loadUser);

    const login = useCallback((userData) => {
        const u = { ...userData, loginAt: new Date().toISOString() };
        setUser(u);
        saveUser(u);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        saveUser(null);
    }, []);

    const updateUser = useCallback((updates) => {
        setUser((prev) => {
            const updated = { ...prev, ...updates };
            saveUser(updated);
            return updated;
        });
    }, []);

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth doit être utilisé dans un <AuthProvider>");
    return ctx;
}