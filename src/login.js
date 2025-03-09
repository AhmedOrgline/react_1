import { useContext, useState } from "react";
import './style.css'
import './component/all.min.css'
import axios from "axios";
import { User } from "./context";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Login(){
    const [User_Gmail , setUserGmail] = useState('a78@gmail.com');
    const [PassWord , setPassWord] = useState('20200286');
    const [emailError , setEmailError] = useState(false);
    const [accept , setAccept] = useState(false);
    

    const UserProfile = useContext(User);
    //const token = UserProfile.auth.token;
    const cookie = new Cookies();
        
        //const GetToken = cookie.get("Bearer");
    const nav = useNavigate();

    async function Submit(e){
        e.preventDefault();
        setAccept(true);
        try{
            let result = await axios.post("http://127.0.0.1:8000/api/login" , {
                email : User_Gmail,
                password : PassWord,
            });
                let token = result.data.data.token;
                cookie.set("Bearer", token);
                let userDetails = result.data.data.user;
                UserProfile.setAuth({token , userDetails});
                nav("/dash");
        }catch(err){
            if(err.response.status === 401){
                setEmailError(true)
            }
            setAccept(true);
        }
    }
    return (
        <div className="container">
            <form onSubmit={Submit}>
                <div>
                    <h1 style={{textAlign:"center", margin: "25px 0"}}>login</h1>
                </div>
                <div style={{position: "relative"}}>
                    <input type="email"    className="formInput" value={User_Gmail} placeholder="gmail" required onChange={(e)=>setUserGmail(e.target.value)}    />
                    {emailError && <small className="not_suitable"><i className="fa-solid fa-triangle-exclamation"></i></small>} 
                </div>
                <div style={{position: "relative"}}>
                    <input type="password" className="formInput" value={PassWord}   placeholder="password" required onChange={(e)=>setPassWord(e.target.value)} />
                    {PassWord.length < 8 && accept && <small className="not_suitable"><i className="fa-solid fa-triangle-exclamation"></i></small>}
                </div>
                <button className="btn" type="submit" style={{width:"100%" ,cursor:"pointer", padding: "8px 10px", marginTop: "5px"}}>Submit</button>
            </form>
        </div>
    )
}