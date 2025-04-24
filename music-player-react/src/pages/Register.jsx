import React from 'react'
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Form, Button } from "react-bootstrap";

import FrameForm from "../components/FrameForm";
import GoogleLoginButton from "../components/GoogleLogin";

export default function Register(){
    return(
        <FrameForm>
            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-white-900 mb-3 lg:mb-5 ">
                Đăng ký
            </h2>
            <Form>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Nhập email" required/>
                    <Form.Text className="text-white">
                        Chúng tôi sẽ không chia sẽ với bất kỳ ai.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPassword">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type="password" placeholder="Nhập mật khẩu" required/>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPassword">
                    <Form.Label>Xác nhận mật khẩu</Form.Label>
                    <Form.Control type="password" placeholder="Nhập xác nhận mật khẩu" required/>
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
                    <GoogleLoginButton icon={<FcGoogle className="text-2xl"/>} title="Google"/>
                </div>
            </Form>
        </FrameForm>
    )
}