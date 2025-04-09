import React from "react";
import AdminRoutes from "./AdminRoutes";
import NavBar from "./NavBar";
import SideMenu from "./SideMenu";

function AdminDashboard() {

    return (
        <>
            <div className="Admin_DashboardContainer">
                <div className="Admin_SideMenuAndPageContent">
                    <div className="admin_sidebar_container">
                        <SideMenu />
                    </div>
                    <div className="Admin_PageContent">
                        <NavBar />
                        <AdminRoutes />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;
