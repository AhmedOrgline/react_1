import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "./context";

export default function Products() {
  /* =========================================================== */
  /* =============>>> Loaded Data from Data_Base <<<============ */
  /* =========================================================== */
    const [product, setProduct] = useState([]);
    const [runCode, setRunCode] = useState(0);

    const context = useContext(User);
    const token = context.auth.token;

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/product/show", {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
        }).then((data) => setProduct(data.data))
        .catch((err) => console.log(err));
    }, [runCode]);

    async function deleteUser(id) {
        try {
            const res = await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`,{
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );
        if (res.status === 200) setRunCode((pre) => pre + 1);
        } catch {
            console.log("Un Show");
        }
    }

    async function Refresh() {
        try {
            await axios.post("http://127.0.0.1:8000/api/refresh", null, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }).then((response) => context.setAuth((prev) => {
                    return { 
                        ...prev , token: response.data.token
                    };
                })
            );
        } catch (err) {
            console.log(err);
        }
    }

    const show_data = product.map((pro, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{pro.title}</td>
            <td>{pro.description}</td>
            <td className="btn_icon">
                <i style={{ "--color": "#f00" }} className="fa-solid fa-trash-can" onClick={() => deleteUser(pro.id)}></i>
                <Link to={`${pro.id}`}>
                    <i style={{ "--color": "#000" }} className="fa-solid fa-pen-to-square"></i>
                </Link>
            </td>
        </tr>
    ));
  /* =========================================================== */
  /* =========================================================== */
    return (
        <div style={{ padding: "6px 5px" }}>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{show_data}</tbody>
            </table>
        </div>
    );
}
