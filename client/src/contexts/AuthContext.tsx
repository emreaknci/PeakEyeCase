import React, { createContext, useEffect, useState } from 'react'
import AuthService from '../services/auth.service';
import StorageService from '../services/storage.service';
import { useNavigate } from 'react-router-dom';
import { User } from '../models/user';
import { toast } from 'react-toastify';
import { SignInDto } from '../dtos/users/signInDto';
import { JwtHelper } from '../utils/security/jwtHelper';

export const AuthContext = createContext({
    currentUserId: null as number | null,
    isAuthenticated: false,
    isTokenChecked: false,
    isAdmin: false,
    signIn: (dto:SignInDto) => { },
    logout: () => { },
})


export const AuthProvider = ({ children }: any) => {
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isTokenChecked, setIsTokenChecked] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);


    useEffect(() => {
        const checkToken = async () => {
            const token = StorageService.getAccessToken();
            if (token) {
                setIsAdmin(JwtHelper.isAdministrator(token));
                setIsAuthenticated(true);
                setIsTokenChecked(true);
                setCurrentUserId(JwtHelper.getUserId(token));

                return;
            }
            setIsAuthenticated(false);
            setIsTokenChecked(true);
            setCurrentUserId(null);
            return;
        }

        checkToken();
    }, [isAuthenticated])

    useEffect(() => {
        const token = StorageService.getAccessToken();
        if (token && isAuthenticated && isTokenChecked) {
            const exp = JwtHelper.getTokenInfos(token).exp;

            const remainingTime = exp * 1000 - new Date().getTime();
            console.log(remainingTime / 1000)
            if (remainingTime <= 0) {
                logout();
                toast.info("Your session has expired. Please sign in again.");
                return;
            } else {
                setTimeout(() => {
                    logout();
                    toast.info("Your session has expired. Please sign in again.");
                }, remainingTime)
            }
        }
    }, [isAuthenticated, isTokenChecked])
 

    const signIn = async (dto:SignInDto) => {
        await AuthService.signIn(dto).then(res => {
            StorageService.setAccessToken(res.data.data);
            setIsAuthenticated(true);
            setIsTokenChecked(true);
        }).catch(err => {
            setIsAuthenticated(false);
            setIsTokenChecked(true);
        })
    }

    const logout = () => {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setIsTokenChecked(false);
        setCurrentUserId(null);
        StorageService.clearAccessToken();
    }

 

    return (
        <AuthContext.Provider value={{
            currentUserId,
            isAuthenticated,
            isTokenChecked,
            isAdmin,
            signIn,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}