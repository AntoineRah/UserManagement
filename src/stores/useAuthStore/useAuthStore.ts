import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthStore } from "./useAuthStore.type.ts";

const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            accessToken: null,
            expiresIn: null,
            setAuthData: (token: string, expiresIn: number) => set({ accessToken: token, expiresIn }),
            clearAuthData: () => set({ accessToken: null, expiresIn: null }),
        }),
        {
            name: "auth-storage",

        }
    )
);

export { useAuthStore };
