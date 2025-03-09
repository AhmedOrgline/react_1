import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "./context";
import Loading from "./component/Loading";
import axios from "axios";
import Cookies from "universal-cookie";

export default function PersistLogin(){
    const context = useContext(User);
    const token = context.auth.token;
    const [loading , setLoading] = useState(true);
    // Send Refresh Token
    const cookie = new Cookies();
    //const tokenCookie = cookie.set("Bearer" , token);

    const getToken = cookie.get("Bearer");

    useEffect(() => {
    async function Refresh() {
        try{
            await axios.post('http://127.0.0.1:8000/api/refresh' ,null , {
            headers : {
                Authorization: "Bearer " + getToken,
            },
        }).then((data) => {
            cookie.set("Bearer", data.data.token);
            context.setAuth((prev) => {
                return { userDetails:data.data.user,token:data.data.token};
            })
        })
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }
        !token ? Refresh() : setLoading(false);
    },[])

    return loading ? <Loading/> : <Outlet/>;
}