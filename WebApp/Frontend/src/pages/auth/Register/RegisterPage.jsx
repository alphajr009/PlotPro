import "./RegisterStyle.css";
import RegisterForm from "./RegisterForm";
import Logo from "../../../images/logo.png";
import { Link } from "react-router-dom";

const RegisterPage = () => {
    return (
        <div className="register-page">
            <Link to="/" style={{ textDecoration: "none" }}>
                <div className="logo">
                    <img alt="logo" className="logo-img" src={Logo} />
                </div>
            </Link>
            <div className="left-container">
                <RegisterForm />
            </div>
        </div>
    );
};
export default RegisterPage;
