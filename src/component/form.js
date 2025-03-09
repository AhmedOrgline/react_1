import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { User } from "../context";
import { useNavigate } from "react-router-dom";

export default function Form(props){
    const [User_Name , setUserName] = useState("ahmed");
    const [User_Gmail , setUserGmail] = useState("a78@gmail.com");
    const [PassWord , setPassWord] = useState("20200286");
    const [PassWord_Configration , setPassWordConfigration] = useState("20200286");
    const [emailError , setEmailError] = useState(false);
    const [flag , setFlag] = useState(true);
    const [accept , setAccept] = useState(false);
    const nav = useNavigate();

    const UserNow = useContext(User);
    console.log(UserNow)

    useEffect(() => {
        setUserName(props.name)
        setUserGmail(props.email)
    } , [props.name , props.email]);

    let email = props.email;

    async function Submit(e){
        e.preventDefault();
        setAccept(true);
        // ===========>>>SEND TO DATABASE <<<============
        User_Name === '' || User_Gmail === '' || PassWord.length < 8 || PassWord_Configration !== PassWord ? setFlag(false) : setFlag(true); 
        try{
            if(flag){
                let result = await axios.post(`http://127.0.0.1:8000/api/${props.setPoint}` , {
                    name : User_Name,
                    email : User_Gmail,
                    password : PassWord,
                    password_confirmation : PassWord_Configration,
                });
                if(result.status === 200){
                    if(props.botton === "Register" || window.sessionStorage.getItem("user_current") === email){
                        window.sessionStorage.setItem("user_current" , User_Gmail);

                        //const token = result.data.token;
                        //const userDetails = result.data.data.user;
                        //UserNow.setAuth({token , userDetails});
                    }
                    
                    //window.location.pathname = props.position;
                }
            }
        }catch(err){
            setEmailError(err.response.status);
        }
        // ==============================================
        
    }
    return (
        <div style={{padding: "0 25px"}}>
            <form onSubmit={Submit} style={{width: props.widthStyle , boxShadow: props.Shadow}}>
                <div style={{position: "relative"}}>
                    <h1 style={{textAlign:"center", margin: "25px 0"}}>{props.title}</h1>
                </div>
                <div style={{position: "relative"}}>
                    <input type="text" className="formInput" placeholder="User Name" value={User_Name} onChange={(e) => setUserName(e.target.value)}/>
                </div>
                <div style={{position: "relative"}}>
                    <input type="email" className="formInput"  placeholder="gmail" required value={User_Gmail} onChange={(e) => setUserGmail(e.target.value)}/>
                    {emailError === 422 && <small className="not_suitable"><i className="fa-solid fa-triangle-exclamation"></i></small>}
                </div>
                <div style={{position: "relative"}}>
                    <input type="password" className="formInput"  placeholder="password" required value={PassWord} onChange={(e) => setPassWord(e.target.value)}/>
                    {PassWord.length < 8 && accept && <small className="not_suitable"><i className="fa-solid fa-triangle-exclamation"></i></small>}
                </div>
                <div style={{position: "relative"}}>
                    <input type="password" className="formInput"  placeholder="config password" value={PassWord_Configration} onChange={(e) => setPassWordConfigration(e.target.value)}/>
                    {PassWord !== PassWord_Configration && accept && <small className="not_suitable"><i className="fa-solid fa-triangle-exclamation"></i></small>}
                </div>
                <button className="btn" type="submit" style={{width:"100%" ,cursor:"pointer", padding: "8px 10px", marginTop: "5px"}}>{props.botton}</button>
            </form>
        </div>
    )
} 