import "../Register/RegisterStyle.css";
import FPForm from "./FPForm";
import Logo from "../../../images/logo.png";
import { Link } from "react-router-dom";

const FPPage = () => {
    return (
        <div className="register-page">
            <Link to="/" style={{ textDecoration: "none" }}>
                <div className="logo">
                    <img alt="logo" className="logo-img" src={Logo} />
                </div>
            </Link>
            <div className="left-container">
                <FPForm />
            </div>
        </div>
    );
};
export default FPPage;
