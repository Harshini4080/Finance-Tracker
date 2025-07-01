import React, { useState, useEffect, useCallback } from "react";
import {
  Form,
  Input,
  message,
  Modal,
  Select,
  Table
} from "antd";
import axios from "axios";
import moment from "moment";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined
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
    { title: "Amount", dataIndex: "amount" },
    { title: "Type", dataIndex: "type" },
    { title: "Category", dataIndex: "category" },
    { title: "Description", dataIndex: "description" },
    {
      title: "Actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <EditOutlined
            className="action-icon"
            style={{ color: "#6366F1", cursor: "pointer" }}
            onClick={() => {
              setEditable(record);
              setShowModal(true);
              form.setFieldsValue(record);
            }}
          />
          <DeleteOutlined
            className="action-icon"
            style={{ color: "#EF4444", cursor: "pointer" }}
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  const getAllTransactions = useCallback(async () => {
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
  }, [frequency, type]);

  useEffect(() => {
    getAllTransactions();
    if (editable) {
      form.setFieldsValue(editable);
    }
  }, [frequency, type, editable, form, getAllTransactions]);

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

      <div className="filters-container">
        <div>
          <h6>Select Date</h6>
          <Select value={frequency} onChange={setFrequency} style={{ width: 180 }}>
            <Select.Option value="1">Last 1 Day</Select.Option>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="">All Transactions</Select.Option>
          </Select>
        </div>

        <div>
          <h6>Select Category</h6>
          <Select value={type} onChange={setType} style={{ width: 180 }}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </div>

        <div>
          <h6>View</h6>
          <div style={{ fontSize: "22px" }}>
            <UnorderedListOutlined
              onClick={() => setViewData("table")}
              style={{ marginRight: 12, color: viewData === "table" ? "#4F46E5" : "#CBD5E1", cursor: "pointer" }}
            />
            <AreaChartOutlined
              onClick={() => setViewData("analytics")}
              style={{ color: viewData === "analytics" ? "#4F46E5" : "#CBD5E1", cursor: "pointer" }}
            />
          </div>
        </div>

        <div>
          <button
            onClick={() => {
              setShowModal(true);
              setEditable(null);
              form.resetFields();
            }}
            className="add-btn"
          >
            + Add New
          </button>
        </div>
      </div>

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
                    <div className="custom-pagination">{originalElement}</div>
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

      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
        centered
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Type" name="type" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category" rules={[{ required: true }]}>
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
            <Input type="date" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>

          <div style={{ textAlign: "right" }}>
            <button type="submit" className="submit-btn">Save</button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
