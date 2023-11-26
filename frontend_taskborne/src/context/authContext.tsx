import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios, { AxiosResponse } from 'axios';

 //coment 1234
export interface User {
    id: string;
    username: string;
    email: string;
    profileImageUrl: string;
  }

interface AuthContextType{
    user: User | null;
    login: (username: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() =>
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null
  );
  

  const login = async (email: string, password: string) => {
    try {
      const response: AxiosResponse<{
        user: User;

      }> = await axios.post('http://localhost:3333/login', { email, password });
      if (response.status === 200) {
        const { user } = response.data;
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/home';
       
      }
    } catch (error: any) {
      throw Error(error.response.data.error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout}}
    >
      {children}
    </AuthContext.Provider>
  );
};