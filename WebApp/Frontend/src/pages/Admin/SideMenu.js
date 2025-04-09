import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, ConfigProvider, Typography } from "antd";
import { 
  DashboardOutlined, 
  UserOutlined, 
  EnvironmentOutlined, 
  FormOutlined, 
  MailOutlined ,
  
} from '@ant-design/icons';
import logo from "../../images/logo.png";

const { Title } = Typography;

function getItem(label, key, icon, children, type) {
    return { key, icon, children, label, type };
}

const items = [
    getItem("Dashboard", "/admin", <DashboardOutlined />),
    getItem("Users", "/admin/users", <UserOutlined />),
    getItem("User Maps", "/admin/usermaps", <EnvironmentOutlined />),
    getItem("Input Control", "/admin/inputcontrol", <FormOutlined />),
    getItem("Mails", "/admin/mails", <MailOutlined />),
];

function SideMenu() {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedKeys, setSelectedKeys] = useState("/admin");

    useEffect(() => {
        const pathName = location.pathname;
        setSelectedKeys(pathName);
    }, [location.pathname]);

    const handleLogoClick = () => {
        navigate("/home");
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#1890ff',
                    borderRadius: 6,
                },
                components: {
                    Menu: {
                        itemHeight: 50,
                        itemHoverColor: '#1890ff',
                        itemSelectedColor: '#1890ff',
                        itemSelectedBg: '#e6f7ff',
                    },
                },
            }}
        >
            <div className="Admin_SideMenu" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center',justifyContent:"center", marginBottom: '30px', cursor: 'pointer' }} onClick={handleLogoClick}>
                    <img src={logo} alt="logo" style={{ width: '100px',height:'50px'}} />
                </div>
                <Menu
                    mode="inline"
                    selectedKeys={[selectedKeys]}
                    onClick={(item) => {
                        navigate(item.key);
                    }}
                    items={items}
                    style={{
                        borderRight: 'none',
                    }}
                />
            </div>
        </ConfigProvider>
    );
}

export default SideMenu;