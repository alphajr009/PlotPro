import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Tag,
  Row,
  Col,
  Statistic,
  Card,
  Popconfirm,
  message,
} from "antd";
import { DeleteOutlined,  SearchOutlined } from "@ant-design/icons";

const API_URL = process.env.REACT_APP_BACKEND_URL || "https://field-master-backen.vercel.app";

const { TextArea } = Input;

const EmailManage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(`${API_URL}/api/contact/submissions`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let data = await response.json();
        // Sort submissions by createdAt in descending order
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setSubmissions(data);
      } catch (error) {
        console.error("Failed to fetch submissions:", error);
      }
    };
    fetchSubmissions();
  }, []);

  const handleReply = (submission) => {
    setSelectedSubmission(submission);
    setIsReplyModalVisible(true);
  };

  const handleSendReply = async () => {
    try {
      const response = await fetch(`${API_URL}/api/contact/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedSubmission._id,
          toEmail: selectedSubmission.email,
          replyMessage,
        }),
      });

      if (response.ok) {
        setSubmissions(
          submissions.map((sub) =>
            sub._id === selectedSubmission._id
              ? { ...sub, status: "replied", replyMessage }
              : sub
          )
        );
        setIsReplyModalVisible(false);
        setReplyMessage("");
        message.success("Reply sent successfully");
      } else {
        throw new Error("Failed to send reply");
      }
    } catch (error) {
      console.error("Failed to send reply:", error);
      message.error("Failed to send reply");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/contact/submissions/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSubmissions(submissions.filter((sub) => sub._id !== id));
        message.success("Submission deleted successfully");
      } else {
        throw new Error("Failed to delete submission");
      }
    } catch (error) {
      console.error("Failed to delete submission:", error);
      message.error("Failed to delete submission");
    }
  };

  const handleSearch = (value) => {
    setSearchEmail(value);
  };

  const filteredSubmissions = searchEmail
    ? submissions.filter((submission) =>
        submission.email.toLowerCase().includes(searchEmail.toLowerCase())
      )
    : submissions;

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (message) => (
        <span
          style={{
            display: "inline-block",
            maxWidth: "300px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {message.length > 50 ? `${message.substring(0, 50)}...` : message}
        </span>
      ),
    },
    {
      title: "Date/Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "replied" ? "green" : "volcano"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleReply(record)}
            style={{
              backgroundColor: "blue",
              borderColor: "blue",
              marginRight: 8,
            }}
          >
            Reply
          </Button>
        </div>
      ),
    },

    {
        title:"",
        key:"action",
        render: (_, record) => (
            <div>
            <Popconfirm
            title="Are you sure to delete this submission?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
          <DeleteOutlined style={{ color: 'red', marginRight:10, marginBottom:10 }} />
          </Popconfirm>
            </div>
        )
    },

  ];

  const totalEmails = submissions.length;
  const repliedEmails = submissions.filter(
    (sub) => sub.status === "replied"
  ).length;
  const toReplyEmails = totalEmails - repliedEmails;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        Manage Emails 
      </h3>

      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <Card style={{ boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)" }}>
            <Statistic
              title="Total"
              value={totalEmails}
              valueStyle={{ color: "#1890ff", fontSize: "36px" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)" }}>
            <Statistic
              title="Replied"
              value={repliedEmails}
              valueStyle={{ color: "#52c41a", fontSize: "36px" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)" }}>
            <Statistic
              title="To Reply"
              value={toReplyEmails}
              valueStyle={{ color: "#f5222d", fontSize: "36px" }}
            />
          </Card>
        </Col>
      </Row>
      <Input.Search
        placeholder="Search by sender's email"
        onSearch={handleSearch}
        style={{ marginBottom: 16, width: 400, float: "right" }}
      />

      <Table
        columns={columns}
        dataSource={filteredSubmissions}
        rowKey="_id"
        onRow={(record) => ({
          onClick: () => setSelectedSubmission(record),
        })}
        style={{ marginTop: 20 }}
      />

      <Modal
        title="Reply to Email"
        visible={isReplyModalVisible}
        onOk={handleSendReply}
        onCancel={() => setIsReplyModalVisible(false)}
      >
        <Form>
          <Form.Item label="To">
            <Input value={selectedSubmission?.email} disabled />
          </Form.Item>
          <Form.Item label="Reply Message">
            <TextArea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="View Conversation"
        visible={isViewModalVisible}
        onOk={() => setIsViewModalVisible(false)}
        onCancel={() => setIsViewModalVisible(false)}
      >
        <Row gutter={16}>
          <Col span={12}>
            <h3>Received Message</h3>
            <p>{selectedSubmission?.message}</p>
          </Col>
          <Col span={12}>
            <h3>Reply Sent</h3>
            <p>{selectedSubmission?.replyMessage}</p>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default EmailManage;
