import React from "react";
import { Progress } from "antd";
import { useTheme } from "../context/ThemeContext"; // Theme context for dark mode

/**
 * Analytics Component
 * Displays summarized insights and analytics for transactions including:
 * - Total count and percentage of income/expense
 * - Turnover stats
 * - Category-wise breakdown
 */
const Analytics = ({ allTransaction }) => {
  const { darkMode } = useTheme(); // Theme flag from context

  // List of all transaction categories
  const categories = [
    "salary", "tip", "investment", "food", "movie", "bills", "medical", "fee", "tax",
  ];

  /** --------- Transaction Filtering --------- **/

  const totalTransaction = allTransaction.length;

  const totalIncomeTransactions = allTransaction.filter(
    (t) => t.type === "income"
  );

  const totalExpenseTransactions = allTransaction.filter(
    (t) => t.type === "expense"
  );

  /** --------- Transaction Count Percentage --------- **/

  const totalIncomePercent =
    (totalIncomeTransactions.length / totalTransaction) * 100;

  const totalExpensePercent =
    (totalExpenseTransactions.length / totalTransaction) * 100;

  /** --------- Turnover Calculations --------- **/

  const totalTurnover = allTransaction.reduce((acc, t) => acc + t.amount, 0);

  const totalIncomeTurnover = totalIncomeTransactions.reduce(
    (acc, t) => acc + t.amount,
    0
  );

  const totalExpenseTurnover = totalExpenseTransactions.reduce(
    (acc, t) => acc + t.amount,
    0
  );

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;

  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  /** --------- Styling for Cards --------- **/

  const cardBaseStyle = {
    borderRadius: "16px",
    boxShadow: darkMode
      ? "0 8px 24px rgba(0,0,0,0.6)"
      : "0 8px 24px rgba(0,0,0,0.06)",
    backgroundColor: darkMode ? "#334155" : "#F8FAFC",
    color: darkMode ? "#f1f5f9" : "#1e293b",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  };

  const cardHoverStyle = {
    transform: "scale(1.02)",
  };

  /** --------- Render Empty State --------- **/
  if (allTransaction.length < 1) {
    return (
      <div className="text-center mt-5">
        <h2 style={{ color: darkMode ? "#f1f5f9" : "#1e293b" }}>
          Add transactions to view the analytics
        </h2>
      </div>
    );
  }

  return (
    <div className="row m-3">

      {/* --------- Total Transactions Count --------- */}
      <div className="col-md-3 mb-4">
        <div
          className="card analytics-card"
          style={cardBaseStyle}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardBaseStyle)}
        >
          <div className="card-header fw-semibold">
            Total Transactions: {totalTransaction}
          </div>
          <div className="card-body">
            <h5 style={{ color: "#6366F1" }}>
              Income: {totalIncomeTransactions.length}
            </h5>
            <h5 style={{ color: "#8B5CF6" }}>
              Expense: {totalExpenseTransactions.length}
            </h5>
            <div className="d-flex justify-content-around mt-3">
              <Progress type="circle" strokeColor="#6366F1" percent={totalIncomePercent.toFixed(0)} />
              <Progress type="circle" strokeColor="#8B5CF6" percent={totalExpensePercent.toFixed(0)} />
            </div>
          </div>
        </div>
      </div>

      {/* --------- Total Turnover Amount --------- */}
      <div className="col-md-3 mb-4">
        <div
          className="card analytics-card"
          style={cardBaseStyle}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardBaseStyle)}
        >
          <div className="card-header fw-semibold">
            Total Turnover: ₹{totalTurnover}
          </div>
          <div className="card-body">
            <h5 style={{ color: "#6366F1" }}>
              Income: ₹{totalIncomeTurnover}
            </h5>
            <h5 style={{ color: "#8B5CF6" }}>
              Expense: ₹{totalExpenseTurnover}
            </h5>
            <div className="d-flex justify-content-around mt-3">
              <Progress type="circle" strokeColor="#6366F1" percent={totalIncomeTurnoverPercent.toFixed(0)} />
              <Progress type="circle" strokeColor="#8B5CF6" percent={totalExpenseTurnoverPercent.toFixed(0)} />
            </div>
          </div>
        </div>
      </div>

      {/* --------- Income by Category --------- */}
      <div className="col-md-3 mb-4">
        <h5 className="mb-3 text-center" style={{ color: "#6366F1" }}>
          Category-wise Income
        </h5>
        {categories.map((category) => {
          const amount = totalIncomeTransactions
            .filter((t) => t.category === category)
            .reduce((acc, t) => acc + t.amount, 0);

          if (amount === 0) return null;

          return (
            <div
              className="card mb-2"
              key={category}
              style={cardBaseStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardBaseStyle)}
            >
              <div className="card-body">
                <h6 className="text-capitalize">{category}</h6>
                <Progress
                  strokeColor="#6366F1"
                  percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* --------- Expense by Category --------- */}
      <div className="col-md-3 mb-4">
        <h5 className="mb-3 text-center" style={{ color: "#8B5CF6" }}>
          Category-wise Expense
        </h5>
        {categories.map((category) => {
          const amount = totalExpenseTransactions
            .filter((t) => t.category === category)
            .reduce((acc, t) => acc + t.amount, 0);

          if (amount === 0) return null;

          return (
            <div
              className="card mb-2"
              key={category}
              style={cardBaseStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardBaseStyle)}
            >
              <div className="card-body">
                <h6 className="text-capitalize">{category}</h6>
                <Progress
                  strokeColor="#8B5CF6"
                  percent={((amount / totalExpenseTurnover) * 100).toFixed(0)}
                />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Analytics;
