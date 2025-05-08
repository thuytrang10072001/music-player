import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';

import FrameForm from "../components/FrameForm";
import GoogleLoginButton from "../components/GoogleLogin";
import { useLoginMutation } from '../services/AuthApi';
import { AuthMessage } from "../utils/constants/message/AuthMessage";
import { setLoading } from '../store/LoadingSlice';
import { setItem } from "../utils/helper";

export default function Login(){
    const [login, { isLoading , isSuccess}] = useLoginMutation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate()


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const result = await login({ email, password }).unwrap()
            setItem('token', result.token);
            setItem("user", {
                "email": email,
                "name": result.name,
                "picture": result.picture
            })
        } catch (err) {
            if(err.status === 401){
                toast.error(AuthMessage.loginFailed);
            }else{
                toast.error(AuthMessage.loginError);
            }
        }
    }

    useEffect(() => {
        dispatch(setLoading(isLoading));
        if(isSuccess){
            toast.success(AuthMessage.loginSuccess);
            setTimeout(() => navigate('/'), 3000)
        }
    }, [isLoading, dispatch, isSuccess]);

    return(
        <FrameForm>
            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-white-900 mb-5">
                Đăng nhập
            </h2>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Nhập email"
                                  required value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-white">
                        Chúng tôi sẽ không chia sẽ với bất kỳ ai.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type="password" placeholder="Nhập mật khẩu"
                                  value={password} required
                                  onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me"/>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-full mt-3">
                    Đăng nhập
                </Button>
                <div className="mt-2 flex justify-content-between">
                    <a href="/sign-up" className="">Đăng ký</a>
                    <a href="/forgot-password" className="">Quên mật khẩu?</a>
                </div>
                <div className="flex items-center gap-4 mt-4">
                    <div className="flex-grow h-px bg-white"></div>
                    <span className="text-white text-sm whitespace-nowrap">Hoặc tiếp tục với</span>
                    <div className="flex-grow h-px bg-white"></div>
                </div>
                {/*<div className="grid grid-cols-1 sml:grid-cols-2 gap-3 mt-4">*/}
                {/*    <GoogleLoginButton icon={<FcGoogle className="text-2xl"/>} title="Google"/>*/}
                {/*    <ButtonLogin icon={<FaGithub className="text-2xl"/>} title="Github"/>*/}
                {/*</div>*/}
                <div className="mt-4 grid grid-cols-1">
                    <GoogleLoginButton icon={<FcGoogle className="text-2xl"/>} title="Google"/>
                </div>
            </Form>
        </FrameForm>
    )
}