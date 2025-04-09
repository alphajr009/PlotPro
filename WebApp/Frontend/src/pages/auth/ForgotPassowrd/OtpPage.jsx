import "../Register/RegisterStyle.css";
import OtpForm from "./OtpForm";
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
                <OtpForm />
            </div>
        </div>
    );
};
export default FPPage;
