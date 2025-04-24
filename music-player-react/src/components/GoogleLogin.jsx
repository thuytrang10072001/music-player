import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import ButtonLogin from "./button/ButtonLogin";
import axios from "axios";
import React from "react";

export default function GoogleLoginButton({ icon, title }) {
    const login = useGoogleLogin({
        onSuccess: async (credentialResponse) => {
            console.log(credentialResponse);
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                {
                    headers: {
                        Authorization: `Bearer ${credentialResponse.access_token}`,
                    },
                }
            );

            console.log(userInfo.data);

            // await axios.post('http://localhost:8080/api/social-login', {
            //     email: email,
            //     name: name,
            //     provider: 'google'
            // })
            //     .then(res => localStorage.setItem('token', res.data.token))
        },
        onError: () => {
            console.log('Login Failed');
        },
    });

    return (
        <ButtonLogin icon={icon} title={title} action={login}/>
    )}

