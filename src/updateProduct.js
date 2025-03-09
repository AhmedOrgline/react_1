import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./context";

export default function UpdateProduct(product){
    const [title , setTitle] = useState("ahmed");
    const [description , setDescription] = useState("Hello");
    const [image , setImage] = useState("");
    
    const [accept , setAccept] = useState(false);

    const User_info = useContext(User);
    const token = User_info.auth.token;
    const nav = useNavigate();
    /*================>>> Update Data <<<=============== */
    const id = window.location.pathname.split("/").slice(-1)[0];
    
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/product/showbyid/${id}` , {
            headers:{
                Accept : "application/json",
                Authorization: "Bearer " + token,
            }
        }).then((data) => data.json())
        .then((data) => {
            setTitle(data[0].title)
            setDescription(data[0].description)
        })
    },[])
    async function Submit(e){
        e.preventDefault();
        setAccept(true);
        
        try{
            const formData = new FormData();
            formData.append("title" , title);
            formData.append("description" , description);
            formData.append("iamge" , image);

            let result = await axios.post(`http://127.0.0.1:8000/api/product/update/${id}` ,formData,{
                headers: {
                    Authorization: "Bearer " + token,
                }
            });
                nav("/dash/product");
        }catch(err){
            if(err.response.status === 422){
                console.log(err)
            }
            setAccept(true);
        }
    }
    return (
        <div style={{padding: "0 10px"}}>
            <form onSubmit={Submit} style={{width: "100%"}}>
                <div style={{position: "relative"}}>
                    <h1 style={{textAlign:"center", margin: "25px 0"}}>Update Product</h1>
                </div>
                <div style={{position: "relative"}}>
                    <input type="text" className="formInput" placeholder="title..." value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div style={{position: "relative"}}>
                    <input type="text" className="formInput" placeholder="Description..." value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                
                <div style={{position: "relative" , display:"inline-block"}}>
                    <input type="file" className="formInput disable_focus" required  onChange={(e) => setImage(e.target.files[0])}/>
                </div>
                <button className="btn" type="submit" style={{width:"100%" ,cursor:"pointer", padding: "8px 10px", marginTop: "5px"}}>Create</button>
            </form>
        </div>
    )
}