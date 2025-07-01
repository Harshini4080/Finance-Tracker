import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Select, Table } from "antd";
import axios from "axios";
import moment from "moment";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Layout from "../components/Layout/Layout";
import Spinner from "../components/Spinner";
import Analytics from "../components/Analytics";
import { useTheme } from "../context/ThemeContext";


const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState(30);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const [form] = Form.useForm();

  const { darkMode } = useTheme();

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <EditOutlined
            className="action-icon"
            style={{ color: "#6366F1", cursor: "pointer", transition: "0.2s" }}
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="action-icon"
            style={{ color: "#EF4444", cursor: "pointer", transition: "0.2s" }}
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        message.error("User not found. Please login again.");
        return;
      }
      setLoading(true);
      const res = await axios.get(
        `/api/v1/transactions?userid=${user._id}&frequency=${frequency}&type=${type}`
      );
      setAllTransaction(res.data);
    } catch (error) {
      message.error("Failed to load transactions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTransactions();
    form.setFieldsValue(editable || {});
  }, [frequency, type, editable]);

  const handleSubmit = async (values) => {
    const user = JSON.parse(localStorage.getItem("user"));
    setLoading(true);
    try {
      if (editable) {
        await axios.put(`/api/v1/transactions?transactionId=${editable._id}`, {
          payload: { ...values, userId: user._id },
        });
        message.success("Transaction updated successfully");
      } else {
        await axios.post("/api/v1/transactions", {
          ...values,
          userid: user._id,
        });
        message.success("Transaction added successfully");
      }
      setShowModal(false);
      setEditable(null);
      form.resetFields();
      getAllTransactions();
    } catch (error) {
      message.error("Error saving transaction");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (record) => {
    setLoading(true);
    try {
      await axios.delete(`/api/v1/transactions?transactionId=${record._id}`);
      message.success("Transaction deleted");
      getAllTransactions();
    } catch (error) {
      message.error("Error deleting transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}

      {/* Filter Panel */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          padding: "20px",
          background: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.05)",
          marginBottom: "24px",
          border: "1px solid rgba(255,255,255,0.4)",
        }}
      >
        <div>
          <h6 style={{ color: "#1e293b", fontWeight: 600 }}>Select Date</h6>
          <Select
            value={frequency}
            onChange={setFrequency}
            style={{
              width: 180,
              borderRadius: "12px",
              background: "#fff",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            <Select.Option value="1">Last 1 Day</Select.Option>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="">All Transactions</Select.Option>
          </Select>
        </div>

        <div>
          <h6 style={{ color: "#1e293b", fontWeight: 600 }}>Select Category</h6>
          <Select
            value={type}
            onChange={setType}
            style={{
              width: 180,
              borderRadius: "12px",
              background: "#fff",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            <Select.Option value="all">All Category</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </div>

        <div>
          <h6 style={{ color: "#1e293b", fontWeight: 600 }}>View</h6>
          <div style={{ fontSize: "22px" }}>
            <UnorderedListOutlined
              onClick={() => setViewData("table")}
              style={{
                marginRight: "12px",
                cursor: "pointer",
                color: viewData === "table" ? "#4F46E5" : "#CBD5E1",
              }}
            />
            <AreaChartOutlined
              onClick={() => setViewData("analytics")}
              style={{
                cursor: "pointer",
                color: viewData === "analytics" ? "#4F46E5" : "#CBD5E1",
              }}
            />
          </div>
        </div>

        <div>
          <button
            style={{
              background: "linear-gradient(to right, #6366F1, #3B82F6)",
              color: "#fff",
              border: "none",
              padding: "10px 22px",
              fontWeight: "600",
              fontSize: "14px",
              borderRadius: "16px",
              boxShadow: "0 10px 24px rgba(99, 102, 241, 0.3)",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.04)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            onClick={() => {
              setShowModal(true);
              setEditable(null);
              form.resetFields();
            }}
          >
            + Add New
          </button>
        </div>
      </div>

      {/* Table / Analytics */}
      <div className="content">
        {viewData === "table" ? (
          <Table
            columns={columns}
            dataSource={allTransaction}
            rowKey="_id"
            pagination={{
              pageSize: 5,
              itemRender: (_, type, originalElement) => {
                if (type === "page") {
                  return (
                    <div
                      style={{
                        background: "#4F46E5",
                        color: "#fff",
                        padding: "4px 10px",
                        borderRadius: "8px",
                        fontWeight: 600,
                        margin: "0 6px",
                        cursor: "pointer",
                      }}
                    >
                      {originalElement}
                    </div>
                  );
                }
                return originalElement;
              },
            }}
            bordered
            style={{
              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
              color: darkMode ? "#f1f5f9" : "#111827",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 10px 32px rgba(0, 0, 0, 0.04)",
            }}
            rowClassName={(_, index) =>
              darkMode
                ? index % 2 === 0
                  ? "table-row-dark"
                  : "table-row-darker"
                : index % 2 === 0
                ? "table-row-light"
                : "table-row-lighter"
            }
          />
        ) : (
          <Analytics allTransaction={allTransaction} />
        )}
      </div>

      {/* Modal */}
      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
        centered
        bodyStyle={{
          borderRadius: "10px",
          background: "#F9FAFB",
          padding: "24px",
        }}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
            <Input
              type="number"
              style={{ borderRadius: "8px", padding: "8px" }}
            />
          </Form.Item>
          <Form.Item label="Type" name="type" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="investment">Investment</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date" rules={[{ required: true }]}>
            <Input
              type="date"
              style={{ borderRadius: "8px", padding: "8px" }}
            />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input
              type="text"
              style={{ borderRadius: "8px", padding: "8px" }}
            />
          </Form.Item>
          <div style={{ textAlign: "right" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#10B981",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "8px 20px",
                fontWeight: "600",
              }}
            >
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
