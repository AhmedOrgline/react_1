export default function Card(para){
    return (
    <p style={{ 
        backgroundColor: "#ddd",
        margin: "3px",
        borderRadius: "5px",
        padding: "5px 5px",
        border: "2px solid #ccc"
    }}>{para.name}</p>)
}