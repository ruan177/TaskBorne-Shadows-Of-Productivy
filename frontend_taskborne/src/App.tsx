import './App.css'

import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Login } from './pages/login';
import { Registro } from './pages/registro';
import { Home } from './pages/home';
import { SettingsProjeto } from './pages/config';
import { Conta } from './pages/conta';

import { AuthProvider  } from './context/authContext';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './lib/queryClient';

import { Board } from './pages/board';


function App() {
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        < Route path="/" element={<Navigate to="/login" />} />,
                        < Route path="/login" element={<Login />} />,
                        < Route path="/registro" element={<Registro />} />,
                        < Route path="/projeto/:id" element={<Board />} />,
                    
                        < Route path="/config/:id" element={<SettingsProjeto />} />,
                        < Route path="/home" element={<Home />} />,
                        < Route path="/projeto/:id/conta" element={<Conta />} />,
                    
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </AuthProvider>

    )
}

export default App

