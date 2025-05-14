import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Form} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa6";


import FrameForm from "../components/FrameForm";
import {btnIcon} from "../utils/helper";

export default function ForgotPass(){
    const navigate = useNavigate();

    return(
        <FrameForm>
            <div>
                <h2 className="text-center text-2xl/9 font-bold tracking-tight text-white-900 mb-5">
                    Lấy lại mật khẩu
                </h2>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Nhập email" required/>
                        <Form.Text className="text-white">
                            Chúng tôi sẽ không chia sẽ với bất kỳ ai.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-full mt-3">
                        Gửi
                    </Button>
                    <div className="text-center mt-6">
                        <Button variant="primary" className={btnIcon()}
                                onClick={() => navigate(-1)}>
                            {FaArrowLeft ({className: "text-3xl"})}
                        </Button>
                    </div>
                </Form>
            </div>
        </FrameForm>
    )
}