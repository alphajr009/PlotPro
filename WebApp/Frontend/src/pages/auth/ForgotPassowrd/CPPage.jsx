import "../Register/RegisterStyle.css";
import CPForm from "./CPForm";
import Logo from "../../../images/logo.png";
import { Link } from "react-router-dom";

const CPPage = () => {
    return (
        <div className="register-page">
            <Link to="/" style={{ textDecoration: "none" }}>
                <div className="logo">
                    <img alt="logo" className="logo-img" src={Logo} />
                </div>
            </Link>
            <div className="left-container">
                <CPForm />
            </div>
        </div>
    );
};
export default CPPage;
