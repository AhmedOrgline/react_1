import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { User } from "./context";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Register(){
    const [User_Name , setUserName] = useState("ahmed");
    const [User_Gmail , setUserGmail] = useState("a78@gmail.com");
    const [PassWord , setPassWord] = useState("20200286");
    const [PassWord_Configration , setPassWordConfigration] = useState("20200286");
    const [emailError , setEmailError] = useState(false);
    const [accept , setAccept] = useState(false);

    const User_info = useContext(User);
    const nav = useNavigate();

    async function Submit(e){
        e.preventDefault();
        setAccept(true);
        try{
            let result = await axios.post("http://127.0.0.1:8000/api/user/create" , {
                name : User_Name,
                email : User_Gmail,
                password : PassWord,
                password_confirmation : PassWord_Configration,
            },{
                headers: {
                    Authorization: "Bearer " + User_info.auth.token,
                }
            });

                nav("/dash/profile");
        }catch(err){
            if(err.response.status === 422){
                setEmailError(true)
            }
            setAccept(true);
        }
    }
    return (
        <div style={{padding: "0 25px"}}>
            <form onSubmit={Submit} style={{width: "100%"}}>
                <div style={{position: "relative"}}>
                    <h1 style={{textAlign:"center", margin: "25px 0"}}>Create User</h1>
                </div>
                <div style={{position: "relative"}}>
                    <input type="text" className="formInput" placeholder="User Name" value={User_Name} onChange={(e) => setUserName(e.target.value)}/>
                </div>
                <div style={{position: "relative"}}>
                    <input type="email" className="formInput"  placeholder="gmail" required value={User_Gmail} onChange={(e) => setUserGmail(e.target.value)}/>
                    {emailError === 422 || emailError && <small className="not_suitable"><i className="fa-solid fa-triangle-exclamation"></i></small>}
                </div>
                <div style={{position: "relative"}}>
                    <input type="password" className="formInput"  placeholder="password" required value={PassWord} onChange={(e) => setPassWord(e.target.value)}/>
                    {PassWord.length < 8 && accept && <small className="not_suitable"><i className="fa-solid fa-triangle-exclamation"></i></small>}
                </div>
                <div style={{position: "relative"}}>
                    <input type="password" className="formInput"  placeholder="config password" value={PassWord_Configration} onChange={(e) => setPassWordConfigration(e.target.value)}/>
                    {PassWord !== PassWord_Configration && accept && <small className="not_suitable"><i className="fa-solid fa-triangle-exclamation"></i></small>}
                </div>
                <button className="btn" type="submit" style={{width:"100%" ,cursor:"pointer", padding: "8px 10px", marginTop: "5px"}}>Create</button>
            </form>
        </div>
    )
}