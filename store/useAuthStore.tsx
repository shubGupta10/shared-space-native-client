import { User } from '@/type/User'
import { create } from 'zustand'

type AuthStore = {
  user: User | null
  token: string | null
  loading: boolean
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void 
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  loading: true,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setLoading: (loading) => set({ loading }),
  logout: () => set({ user: null, token: null, loading: false }), 
}))
