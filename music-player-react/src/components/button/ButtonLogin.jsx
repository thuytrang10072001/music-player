import React from 'react';
import { Button } from 'react-bootstrap';
export default function ButtonLogin(props){
    const className = "flex bg-white text-black h-10 rounded-md gap-2 justify-center items-center"
    return (
        <Button className={className}>
            {props.icon}
            <span className="font-semibold">{props.title}</span>
        </Button>
    )
}