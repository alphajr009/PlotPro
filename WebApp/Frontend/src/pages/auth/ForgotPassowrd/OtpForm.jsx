import React from "react";

import { Form, Input, Button, message } from "antd";
import { useParams,useNavigate, Link } from "react-router-dom";
import "../Register/RegisterStyle.css";
import AxiosInstance from "../../../AxiosInstance";

const FPForm = () => {
  let params = useParams();
  const { email: email } = params;
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { enteredOTP } = values;

    AxiosInstance
      .post("/api/mail/verify", {
        enteredOTP,
        email,
      })
      .then(() => {
        navigate(`/change-password/${email}`);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          // Displaying the error message using antd message component
          message.error(error.response.data.error);
        } else {
          // Fallback error message if the expected structure is not found
          message.error("An unexpected error occurred. Please try again.");
        }
        console.error("There was an error in otp process !", error);
      });
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
        <label>OTP</label>
        <Form.Item
        hasFeedback
          name="enteredOTP"
          rules={[
            {
              required: true,
              message: "Please enter your OTP!",
            },
          ]}
        >
          <Input.OTP length={6} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-button1">
            Reset Password
          </Button>

          <Button
            type="primary"
            className="register-button2"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Back
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FPForm;
