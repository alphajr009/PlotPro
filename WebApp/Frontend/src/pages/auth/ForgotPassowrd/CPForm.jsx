import React from "react";
import { Form, Input, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import "../Register/RegisterStyle.css";
import AxiosInstance from "../../../AxiosInstance";

const CPForm = () => {
    let params = useParams();
    const { email: email } = params;
    const navigate = useNavigate();

    const onFinish = (values) => {
        const { password } = values;

        AxiosInstance
            .post("/api/users/change-password", {
                email,
                newPassword: password,
            })
            .then(() => {
                // if token in localstorage navigate to Home
                if (localStorage.getItem("token")) {
                    navigate("/home");
                }
                navigate("/login");
            })
            .catch((error) => {
                console.error("There was an error login !", error);
            });
    };

    const passwordValidation = (_, value) => {
        if (!value) {
            return Promise.reject(new Error("Password is required"));
        }

        // Check if password meets complexity requirements
        const minLength = 8; // Minimum length requirement
        const hasUpperCase = /[A-Z]/.test(value); // At least one uppercase letter
        const hasLowerCase = /[a-z]/.test(value); // At least one lowercase letter
        const hasDigit = /\d/.test(value); // At least one digit
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value); // At least one special character

        if (
            value.length < minLength ||
            !hasUpperCase ||
            !hasLowerCase ||
            !hasDigit ||
            !hasSpecialChar
        ) {
            return Promise.reject(
                new Error(
                    "Password must be 8+ character with uppercase, lowercase, digit, and special character."
                )
            );
        }

        return Promise.resolve();
    };

    return (
        <div className="register-form-container">
            <div className="form-header">
                <h3>Forgot Password</h3>
                <p>No worries. We’ll send you instructions to reset </p>
            </div>
            <br />

            <Form
                name="register"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <label>New Password</label>
                <Form.Item
                    hasFeedback
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                        {
                            validator: passwordValidation,
                        },
                    ]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <label>Confirm Password</label>
                <Form.Item
                    hasFeedback
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        "The two passwords that you entered do not match!"
                                    )
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Confirm Password" />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="register-button1"
                    >
                        Change Password
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CPForm;
