import "../Register/RegisterStyle.css";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import Logo from "../../../images/logo.png";

const LoginPage = () => {
    return (
        <div className="register-page">
            <Link to="/" style={{ textDecoration: "none" }}>
                <div className="logo">
                    <img alt="logo" className="logo-img" src={Logo} />
                </div>
            </Link>
            <div className="left-container">
                <LoginForm />
            </div>
        </div>
    );
};
export default LoginPage;
