import React, {useEffect} from "react";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { useGoogleLoginMutation } from '../services/AuthApi';
import { AuthMessage } from "../utils/constants/message/AuthMessage";
import { setLoading } from '../store/LoadingSlice';
import ButtonLogin from "./button/ButtonLogin";
import {setItem} from "../utils/helper";

interface Props {
    icon: React.ReactNode,
    title: string
}
export default function GoogleLoginButton({ icon, title }: Props) {
    const [googleLogin, { isLoading }] = useGoogleLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const login = useGoogleLogin({
        onSuccess: async (credentialResponse) => {
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                {
                    headers: {
                        Authorization: `Bearer ${credentialResponse.access_token}`,
                    },
                }
            );

            console.log(userInfo.data)

            let user = {
                "picture": userInfo.data.picture,
                "email": userInfo.data.email,
                "provider": "google",
                "name": userInfo.data.name
            }

            try {
                const result = await googleLogin(user).unwrap()

                toast.success(AuthMessage.loginSuccess);
                setTimeout(() => navigate('/'), 3000)

                setItem('token', result.token);
                setItem("user",  {
                    "email": user.email,
                    "name": userInfo.data.name,
                    "picture": userInfo.data.picture
                })

            } catch (err: any) {
                if(err.status === 401){
                    toast.error(AuthMessage.loginFailed);
                }else{
                    toast.error(AuthMessage.loginError);
                }
            }
        },
        onError: () => {
            console.log('Login Failed');
        },
    });

    useEffect(() => {
        dispatch(setLoading(isLoading));
    }, [isLoading, dispatch]);

    return (
        <ButtonLogin icon={icon} title={title} action={login}/>
    )}

