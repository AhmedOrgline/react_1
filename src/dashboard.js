import { NavLink, Outlet } from "react-router-dom"

export default function Dashbord() {
    return (
        <>
            <div style={{ display: "flex", flexWrap: "nowrap", minHeight: "85vh" }}>
                <aside>
                    <NavLink  className="link" to="profile">
                        <i className="fa-solid fa-users"></i>
                        <span>Users</span>
                    </NavLink>
                    <NavLink  className="link" to="profil/create">
                        <i className="fa-solid fa-user-plus"></i>
                        <span>New User</span>
                    </NavLink>
                    <NavLink  className="link" to="product">
                        <i className="fa-brands fa-product-hunt"></i>
                        <span>product</span>
                    </NavLink>
                    <NavLink  className="link" to="produc/create">
                        <i className="fa-solid fa-plus"></i>
                        <span>New Product</span>
                    </NavLink>
                </aside>
                <main style={{ paddingTop: "5px", flexGrow: "1", padding: "0 0px", height: "80vh", overflowX: "auto" }}>
                    <Outlet />
                </main>
            </div>
        </>
    )
}