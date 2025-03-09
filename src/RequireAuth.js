import { useContext } from "react";
import { User } from "./context";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth(){
    const UserField = useContext(User);
    const UseLocation = useLocation();
    return UserField.auth.userDetails ? <Outlet /> : <Navigate state = {{ from: UseLocation}} replace to = "/login"/>
}