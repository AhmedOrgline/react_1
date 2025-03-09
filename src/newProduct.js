import axios from "axios";
import { useContext, useState } from "react";
import { User } from "./context";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
    const [title, setTitle] = useState("Frist Product");
    const [description, setDescription] = useState("Image Description");
    const [image, setImage] = useState(null); // ✅ تصحيح القيمة الافتراضية
    const [accept, setAccept] = useState(false);

    const User_info = useContext(User);
    const nav = useNavigate();

    async function Submit(e) {
        e.preventDefault();
        setAccept(true);

        try {
            let formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("image", image);

            let result = await axios.post("http://127.0.0.1:8000/api/product/create", formData , {
                headers: {
                    Authorization: "Bearer " + User_info.auth.token,
                }
            });

            nav("/dash/product");
        } catch (err) {
            console.log(err);
            setAccept(false);
        }
    }

    return (
        <div style={{ padding: "0 25px" }}>
            <form onSubmit={Submit} style={{ width: "100%" }}>
                <div style={{ position: "relative" }}>
                    <h1 style={{ textAlign: "center", margin: "25px 0" }}>Create Product</h1>
                </div>
                <div style={{ position: "relative" }}>
                    <input
                        type="text"
                        className="formInput"
                        placeholder="User Name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div style={{ position: "relative" }}>
                    <input
                        type="text"
                        className="formInput"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div style={{position: "relative", display:"inline-block"}}>
                    <input type="file" className="formInput disable_focus" required  onChange={(e) => setImage(e.target.files[0])}/>
                </div>
                <button className="btn" type="submit" disabled={accept} style={{ width: "100%", cursor: "pointer", padding: "8px 10px", marginTop: "5px" }}>
                    {accept ? "Creating..." : "Create"}
                </button>
            </form>
        </div>
    );
}
