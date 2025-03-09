import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { User } from "../context";
import axios from "axios";
import Cookies from "universal-cookie";

export default function Header(){
    const [status , setStatus] = useState(false)
    let Toggle =() => setStatus((v) => !v);

    const cookieIP = new Cookies();
    const User_Info = useContext(User);
    const User_Delails = User_Info.auth.userDetails;
    const Token = User_Info.auth.token;
    const getToken = cookieIP.get('Bearer');

    async function LogOut(){
        await axios.post('http://127.0.0.1:8000/api/logout' , null , {
            headers:{
                Authorization: "Bearer " + getToken,
            }
        })
        window.location.pathname = "/login";
        cookieIP.remove('Bearer');
    }
    return (
        <nav className="" style={{padding : "10px 10px"}}>
            <div style={{padding: "0px 5px", cursor:"pointer"}}>
                <h2>DataBase</h2>
            </div>
            <ul className={status ? "links active" : "links"}>
                <li>
                    <Link className="link" to = "/">Home</Link>
                </li>
                <li>
                    <Link className="link" to = "/about">About</Link>
                </li>
                <li>
                    <Link className="link" to = "/contact">Contact</Link>
                </li>
                <li>
                    <Link className="link" to = "/dash">dashboard</Link>
                </li>
            </ul>
            <ul>
                <li className="iconMenu" onClick={Toggle}>
                    <span style={{transform: status? "translate(0px, 10px) rotateZ(45deg)":"translate(0px, 0px) rotateZ(0)"}}></span>
                    <span style={{transform: status? "translate(0px, -5px) rotateZ(-45deg": "translate(0px, 0px) rotateZ(0)"}}></span>
                </li>
                {
                !Token?
                <>
                    <li>
                        <Link to="/register" className="links-nav link btn">
                            <i className="fa-solid fa-user-plus"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="links-nav link btn">
                            <i className="fa-solid fa-arrow-right-to-bracket"></i>
                        </Link>
                    </li>
                </> 
                :
                <li>
                    <Link onClick={LogOut} className="links-nav link btn">
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </Link>
                </li>
                }
            </ul>
        </nav>
    )
}