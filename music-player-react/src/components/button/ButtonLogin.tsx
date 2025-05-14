import React from 'react';
import { Button } from 'react-bootstrap';

interface ButtonLoginProps {
    action: () => void;
    icon: React.ReactNode;
    title: string;
}
export default function ButtonLogin(props: ButtonLoginProps){
    const className = "flex bg-white text-black h-10 rounded-md gap-2 justify-center items-center"
    return (
        <Button className={className} onClick={() => props.action()}>
            {props.icon}
            <span className="font-semibold">{props.title}</span>
        </Button>
    )
}