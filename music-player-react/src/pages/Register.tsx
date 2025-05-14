import React, {useEffect} from 'react'
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Form, Button } from "react-bootstrap";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import FrameForm from "../components/FrameForm";
import GoogleLoginButton from "../components/GoogleLogin";
import { RegisterSchema } from "../utils/yup";
import { useRegisterMutation } from "../services/AuthApi";
import { setLoading } from "../store/LoadingSlice";
import { AuthMessage } from "../utils/constants/message/AuthMessage";

export default function Register(){
    const [register, {isLoading, isSuccess, isError}] = useRegisterMutation();
    const navigate = useNavigate();
    const {
        register: registerForm,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(RegisterSchema)
    })
    const dispatch = useDispatch();

    const onSubmit = async (data : any) => {
        try {
            const resutl = await register(data);
        }catch (e) {
            toast.error(AuthMessage.registerFailed);
            console.log(e);
        }
    }

    useEffect(() => {
        dispatch(setLoading(isLoading))
        if(isSuccess){
            toast.success(AuthMessage.registerSuccess);
            setTimeout(() => navigate('/sign-in'), 2000);
        }
        if(isError){
            toast.error(AuthMessage.registerFailed);
        }
    }, [dispatch, isLoading, isSuccess, isError]);

    return(
        <FrameForm>
            <div>
                <h2 className="text-center text-2xl/9 font-bold tracking-tight text-white-900 mb-3 lg:mb-5 ">
                    Đăng ký
                </h2>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-2">
                        <Form.Label>Tên</Form.Label>
                        <Form.Control type="text" {...registerForm('name')} />
                        {errors.name && <p className="text-danger">{errors.name.message}</p>}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" {...registerForm('email')} />
                        {errors.email && <p className="text-danger">{errors.email.message}</p>}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control type="password" {...registerForm('password')} />
                        {errors.password && <p className="text-danger">{errors.password.message}</p>}
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Xác nhận mật khẩu</Form.Label>
                        <Form.Control type="password" {...registerForm('confirmPassword')} />
                        {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-full mt-3">
                        Đăng ký
                    </Button>
                    <div className="mt-2 flex justify-content-between">
                        <a href="/sign-in" className="">Đăng nhập</a>
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
                        <GoogleLoginButton
                            icon={FcGoogle ({className:"text-2xl"})}
                            title="Google"/>
                    </div>
                </Form>
            </div>
        </FrameForm>
    )
}