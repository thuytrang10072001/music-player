import React, { useEffect } from "react";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { useLogoutMutation } from "../services/AuthApi";
import { getItem } from "../utils/helper";
import { setLoading } from "../store/LoadingSlice";

export default function DropdownLogout(){
    const [logout, {isLoading}] = useLogoutMutation();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try{
            const result = await logout();
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.reload();
        }catch (e) {
        }
    }

    useEffect(() => {
        dispatch(setLoading(isLoading))
    }, [dispatch, isLoading]);

    return (
        <>
            <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle split id="dropdown-split-basic">
                    <div className="relative group inline-block">
                        <img
                            src={getItem("user")?.picture}
                            alt="avatar"
                            className="w-10 h-10 rounded-full cursor-pointer"
                        />
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <div className="text-center font-medium">
                        {getItem("user")?.name}
                    </div>
                    <Dropdown.Item onClick={handleLogout}>
                        Đăng xuất
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}