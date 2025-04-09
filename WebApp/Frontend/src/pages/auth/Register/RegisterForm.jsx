import React from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import { Link } from "react-router-dom";
import "./RegisterStyle.css";
import AxiosInstance from "../../../AxiosInstance";

const RegisterForm = () => {
    const onFinish = (values) => {
        const { firstName, lastName, email, password } = values;

        AxiosInstance.post("/api/users/register", {
                fName: firstName,
                lName: lastName,
                email,
                password,
            })
            .then(() => {
                message.success("User registered successfully!");
                window.location.href = "/login";
            })
            .catch((error) => {
                console.error(
                    "There was an error registering the user!",
                    error
                );
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
                <h3>Sign Up</h3>
                <p>Welcome back! Please enter your details</p>
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
                <Row gutter={{ xs: 8, sm: 16 }}>
                    <Col
                        className="gutter-row"
                        xs={{ span: 24 }}
                        md={{ span: 12 }}
                    >
                        <label>First Name</label>
                        <Form.Item
                            hasFeedback
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your first name!",
                                },
                            ]}
                        >
                            <Input placeholder="First Name" />
                        </Form.Item>
                    </Col>

                    <Col
                        className="gutter-row"
                        xs={{ span: 24 }}
                        md={{ span: 12 }}
                    >
                        <label>Last Name</label>
                        <Form.Item
                            hasFeedback
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your last name!",
                                },
                            ]}
                        >
                            <Input placeholder="Last Name" />
                        </Form.Item>
                    </Col>
                </Row>

                <label>Email</label>
                <Form.Item
                    hasFeedback
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                        {
                            type: "email",
                            message: "Please enter a valid email!",
                        },
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <label>Password</label>
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
                        className="register-button"
                    >
                        Sign Up
                    </Button>
                </Form.Item>

                <div className="already-have-account">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </Form>
        </div>
    );
};

export default RegisterForm;
